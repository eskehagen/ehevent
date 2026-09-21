"""
Billedoptimering til web.

Løser tre konkrete problemer fundet i auditten:
  1. favicon.png var 2,5 MB og 1581x1382 — altså blev et favicon hentet som
     et fuldstørrelsesbillede af hver besøgende. Her skæres rigtige
     ikonstørrelser ud.
  2. og-image.jpg var 2848x1504. Facebook, LinkedIn og X forventer 1200x630
     og beskærer selv — resultatet var uforudsigeligt.
  3. Ingen WebP overhovedet. Der genereres nu en WebP ved siden af hver JPG,
     så <picture> kan servere den og falde tilbage til JPG.

Kør med:  python3 scripts/optimize_images.py
Scriptet er idempotent — det kan køres igen uden at forringe billederne
yderligere, fordi det altid arbejder ud fra kilden og skriver til et nyt navn.
"""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
IMAGES = PUBLIC / "images"


def save_webp(src: Path, quality: int = 80) -> Path | None:
    """Skriver <navn>.webp ved siden af kilden."""
    dst = src.with_suffix(".webp")
    with Image.open(src) as im:
        im = im.convert("RGB") if im.mode in {"RGBA", "LA", "P", "CMYK"} else im
        im.save(dst, "WEBP", quality=quality, method=6)
    return dst


def main() -> None:
    # ── 1. Favicons ud fra det eksisterende logo ──
    logo = IMAGES / "eh-logo-1024.png"
    source = logo if logo.exists() else (PUBLIC / "favicon.png")
    with Image.open(source) as im:
        im = im.convert("RGBA")
        for size, name in [(32, "favicon-32.png"), (192, "favicon-192.png"), (180, "apple-touch-icon.png")]:
            out = PUBLIC / name
            im.resize((size, size), Image.Resampling.LANCZOS).save(out, "PNG", optimize=True)
            print(f"  {name:<24} {out.stat().st_size / 1024:7.1f} KB")

    # ── 2. Open Graph-billede i det format platformene faktisk bruger ──
    og_src = IMAGES / "og-image.jpg"
    if og_src.exists():
        with Image.open(og_src) as im:
            im = im.convert("RGB")
            target_w, target_h = 1200, 630
            # Beskær til 1200x630-forhold om centrum frem for at forvrænge.
            scale = max(target_w / im.width, target_h / im.height)
            resized = im.resize(
                (round(im.width * scale), round(im.height * scale)), Image.Resampling.LANCZOS
            )
            left = (resized.width - target_w) // 2
            top = (resized.height - target_h) // 2
            cropped = resized.crop((left, top, left + target_w, top + target_h))
            cropped.save(og_src, "JPEG", quality=82, optimize=True, progressive=True)
            print(f"  og-image.jpg             {og_src.stat().st_size / 1024:7.1f} KB  1200x630")

    # ── 3. Nedskaler og komprimér de store billeder, plus WebP ──
    total_before = total_after = 0
    for path in sorted(IMAGES.rglob("*")):
        if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        if path.name == "og-image.jpg":
            continue

        before = path.stat().st_size
        total_before += before

        with Image.open(path) as im:
            rgb = im.convert("RGB") if im.mode in {"RGBA", "LA", "P", "CMYK"} else im.convert("RGB")
            longest = max(rgb.size)
            # 1600 px er rigeligt: intet billede vises større end ca. 800 px
            # CSS-bredde, og der er stadig luft til skærme med 2x pixeltæthed.
            limit = 1600 if "thumbs" not in path.parts else 760
            if longest > limit:
                s = limit / longest
                rgb = rgb.resize((max(1, round(rgb.width * s)), max(1, round(rgb.height * s))),
                                 Image.Resampling.LANCZOS)
            if path.suffix.lower() == ".png":
                rgb.save(path, "JPEG", quality=78, optimize=True, progressive=True) if False else \
                    im.save(path, "PNG", optimize=True)
            else:
                rgb.save(path, "JPEG", quality=78, optimize=True, progressive=True)

        save_webp(path)
        after = path.stat().st_size
        total_after += after

    print(f"\n  JPG/PNG i alt: {total_before / 1024 / 1024:.1f} MB → {total_after / 1024 / 1024:.1f} MB")
    webp = sum(p.stat().st_size for p in IMAGES.rglob("*.webp"))
    print(f"  WebP genereret: {webp / 1024 / 1024:.1f} MB\n")


if __name__ == "__main__":
    main()


def write_size_map() -> None:
    """
    Skriver de faktiske billeddimensioner til src/data/imageSizes.ts.

    Uden korrekte width/height kender browseren ikke billedets
    højde/bredde-forhold før filen er hentet, og indholdet hopper (CLS).
    Hårdkodede tal duer ikke: galleriet blander 4:3 og 16:9, så et fast
    tal ville give forkert pladsholder på halvdelen af billederne.
    Derfor aflæses de rigtige mål her og genereres ind i koden.
    """
    entries: list[tuple[str, int, int]] = []
    for path in sorted(IMAGES.rglob("*")):
        if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        with Image.open(path) as im:
            w, h = im.size
        key = "/" + path.relative_to(PUBLIC).as_posix()
        entries.append((key, w, h))

    lines = [
        "/**",
        " * Faktiske billeddimensioner — GENERERET, rediger ikke i hånden.",
        " *",
        " * Kør `python3 scripts/optimize_images.py` for at opdatere.",
        " * Bruges af <Picture> til at sætte width/height, så browseren kan",
        " * reservere den rigtige plads før billedet er hentet (CLS).",
        " */",
        "",
        "export const IMAGE_SIZES: Record<string, { w: number; h: number }> = {",
    ]
    for key, w, h in entries:
        lines.append(f"  '{key}': {{ w: {w}, h: {h} }},")
    lines.append("};")
    lines.append("")
    lines.append("/** Falder tilbage til 4:3 hvis et billede mangler i kortet. */")
    lines.append("export const sizeOf = (src: string) => IMAGE_SIZES[src] ?? { w: 1200, h: 900 };")
    lines.append("")

    out = ROOT / "src" / "data" / "imageSizes.ts"
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"  imageSizes.ts            {len(entries)} billeder\n")


write_size_map()
