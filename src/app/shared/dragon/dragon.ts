import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Club dragon logo.
 *
 * TODO(assets): replace the placeholder image below with the inline SVG the club
 * supplies. Strip hard-coded `fill`/`stroke` from the SVG paths and set
 * `fill: currentColor` so the colour follows the `color` set on `:host`
 * (defaults to gold via the `.dragon` rule). One asset, recoloured per context.
 */
@Component({
  selector: 'app-dragon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      class="dragon__img"
      src="assets/dragon-placeholder.webp"
      [attr.width]="size()"
      [attr.height]="size()"
      [alt]="decorative() ? '' : 'Legacy Lau Gar dragon logo'"
      [attr.aria-hidden]="decorative() ? 'true' : null"
    />
  `,
  styles: `
    :host {
      display: inline-flex;
      color: var(--gold);
    }
    .dragon__img {
      height: auto;
      object-fit: contain;
    }
  `,
})
export class Dragon {
  readonly size = input(40);
  /** When true the logo is purely decorative (adjacent text names the club). */
  readonly decorative = input(false);
}
