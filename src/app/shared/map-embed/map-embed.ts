import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SITE_INFO } from '../../core/site-info';

@Component({
  selector: 'app-map-embed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <iframe
      [src]="src"
      title="Map to Elite Sports Center, Nuneaton"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    ></iframe>
  `,
  styles: `
    :host {
      display: block;
    }
    iframe {
      width: 100%;
      height: clamp(280px, 45vw, 460px);
      border: 0;
      border-radius: var(--radius);
    }
  `,
})
export class MapEmbed {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly src: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    SITE_INFO.mapEmbedSrc,
  );
}
