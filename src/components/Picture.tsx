import React from 'react';
import { sizeOf } from '../data/imageSizes';

/**
 * <img> med WebP-fallback.
 *
 * Alle billeder i public/images findes nu både som JPG/PNG og som WebP
 * (genereret af scripts/optimize_images.py). Browseren vælger selv WebP
 * når den kan, og falder tilbage til originalen ellers.
 *
 * width og height er obligatoriske med vilje: uden dem kender browseren
 * ikke billedets højde/bredde-forhold før filen er hentet, og indholdet
 * hopper ved indlæsning (dårlig CLS).
 */
export interface PictureProps {
  src: string;
  alt: string;
  /** Udelades normalt — de rigtige mål slås op i det genererede kort. */
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Sæt til true på billedet over folden — ellers udskydes indlæsningen. */
  priority?: boolean;
  sizes?: string;
}

export const Picture = ({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority = false,
  sizes,
}: PictureProps) => {
  const natural = sizeOf(src);
  const w = width ?? natural.w;
  const h = height ?? natural.h;
  const webp = src.replace(/\.(jpe?g|png)$/i, '.webp');
  const webp800 = src.replace(/\.(jpe?g|png)$/i, '-800.webp');

  // Uden srcset henter browseren fuldstørrelsesbilledet, også når det vises
  // i en tredjedels spaltebredde. Den smalle variant findes kun når
  // originalen er bredere end 800 px.
  const srcSet =
    natural.w > 800 ? `${webp800} 800w, ${webp} ${natural.w}w` : webp;

  return (
    <picture>
      <source srcSet={srcSet} type="image/webp" sizes={sizes} />
      <img
        src={src}
        alt={alt}
        width={w}
        height={h}
        className={className}
        style={style}
        loading={priority ? 'eager' : 'lazy'}
        // fetchPriority fortæller browseren hvilket billede der er sidens
        // LCP-element, så det ikke står i kø bag resten.
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        sizes={sizes}
      />
    </picture>
  );
};
