import * as React from 'react';
import { SITE } from '@/seo/site';

/** Synchronise titre et meta en dev — le HTML statique (build) contient déjà JSON-LD et balises complètes. */
export function Seo() {
  React.useEffect(() => {
    document.title = SITE.title;
    setMeta('description', SITE.description);
    setMeta('og:title', SITE.title, 'property');
    setMeta('og:description', SITE.description, 'property');
    setMeta('twitter:title', SITE.title);
    setMeta('twitter:description', SITE.description);
  }, []);

  return null;
}

function setMeta(
  key: string,
  content: string,
  attr: 'name' | 'property' = 'name',
): void {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}
