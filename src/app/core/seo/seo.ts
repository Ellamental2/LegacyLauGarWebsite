import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_INFO } from '../site-info';

export interface SeoData {
  title?: string;
  description?: string;
  /** Absolute or root-relative path for the canonical URL. */
  path?: string;
  /** Root-relative OG image path. */
  image?: string;
}

const DEFAULT_DESCRIPTION =
  'Legacy Lau Gar is a Lau Gar Kung Fu club in Nuneaton, established for over 40 years. ' +
  'Beginners welcome — train self-defence, fitness and the art on Monday evenings.';
const DEFAULT_IMAGE = '/images/dragonMain.webp';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  update(data: SeoData): void {
    const fullTitle = data.title
      ? `${SITE_INFO.name} | ${data.title}`
      : `${SITE_INFO.name} — ${SITE_INFO.tagline}`;
    const description = data.description ?? DEFAULT_DESCRIPTION;
    const url = SITE_INFO.domain + (data.path ?? '/');
    const image = SITE_INFO.domain + (data.image ?? DEFAULT_IMAGE);

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: description });

    this.setTag('property', 'og:title', fullTitle);
    this.setTag('property', 'og:description', description);
    this.setTag('property', 'og:url', url);
    this.setTag('property', 'og:image', image);
    this.setTag('property', 'og:type', 'website');
    this.setTag('property', 'og:site_name', SITE_INFO.name);
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', fullTitle);
    this.setTag('name', 'twitter:description', description);
    this.setTag('name', 'twitter:image', image);

    this.setCanonical(url);
  }

  private setTag(attr: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attr]: key, content } as Record<string, string>);
  }

  private setCanonical(href: string): void {
    let link = this.doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
