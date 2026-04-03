import { useEffect } from 'react';

/**
 * Opdaterer document.title og meta description dynamisk for hver side.
 * Bruges til SEO i en React SPA, så Google ser korrekte titler per side.
 */
export function useSEO(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
  }, [title, description]);
}
