from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1] / 'public' / 'images' / 'events'
thumb_dir = root / 'thumbs'
thumb_dir.mkdir(exist_ok=True)

for image_path in sorted(root.glob('*')):
    if not image_path.is_file() or image_path.suffix.lower() not in {'.jpg', '.jpeg', '.png'}:
        continue

    if image_path.name.startswith('.'):
        continue

    with Image.open(image_path) as img:
        rgb = img.convert('RGB') if img.mode in {'RGBA', 'LA', 'P', 'CMYK'} else img.convert('RGB')
        max_size = max(rgb.size)

        if max_size > 1800:
            scale = 1800 / max_size
            target_size = (max(1, int(rgb.width * scale)), max(1, int(rgb.height * scale)))
        else:
            target_size = rgb.size

        optimized = rgb.resize(target_size, Image.Resampling.LANCZOS)
        optimized.save(image_path, 'JPEG', quality=72, optimize=True, progressive=True)

        thumb_max = 760
        if max(optimized.size) > thumb_max:
            scale = thumb_max / max(optimized.size)
            thumb_size = (max(1, int(optimized.width * scale)), max(1, int(optimized.height * scale)))
        else:
            thumb_size = optimized.size

        thumb = optimized.resize(thumb_size, Image.Resampling.LANCZOS)
        thumb_path = thumb_dir / image_path.name
        thumb.save(thumb_path, 'JPEG', quality=68, optimize=True, progressive=True)

print(f'Optimized {len(list(root.glob("*.jpg")))} event images and generated thumbnails in {thumb_dir}')
