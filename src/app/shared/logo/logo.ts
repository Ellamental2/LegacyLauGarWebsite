import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Club logo, rendered as an inline SVG so it can be recoloured with CSS.
 *
 * The template is `logo.svg`. To change the artwork, edit that file: keep the
 * root `<svg>` (with its Angular attribute bindings) and swap the `<path>`
 * elements for the club's dragon, using `fill="currentColor"`.
 *
 * Colour follows the `color` set on `<app-logo>` — gold by default; override
 * per context, e.g. `<app-logo style="color: var(--text-muted)">`.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './logo.svg',
  styles: `
    :host {
      display: inline-flex;
      color: var(--gold);
      line-height: 0;
    }
    svg {
      width: auto;
      height: auto;
    }
  `,
})
export class Logo {
  /** Rendered width/height in pixels (the mark is square). */
  readonly size = input(40);
  /** True when adjacent text already names the club (hides it from a11y tree). */
  readonly decorative = input(false);
}
