import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Club dragon logo.
 *
 * The artwork lives at `public/images/logo.svg` (a single-colour vector). It is
 * applied as a CSS mask so the fill follows the `color` set on `<app-logo>`
 * (gold by default) — recolour per context, e.g.
 * `<app-logo style="color: var(--text-muted)">`. One file, any colour, any size.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="logo__mark"
      [style.width.px]="width()"
      [style.height.px]="size()"
      [attr.role]="decorative() ? null : 'img'"
      [attr.aria-hidden]="decorative() ? 'true' : null"
      [attr.aria-label]="decorative() ? null : 'Legacy Lau Gar logo'"
    ></span>
  `,
  styles: `
    :host {
      display: inline-flex;
      color: var(--gold);
    }
    .logo__mark {
      display: block;
      background-color: currentColor;
      -webkit-mask: url('/images/logo.svg') center / contain no-repeat;
      mask: url('/images/logo.svg') center / contain no-repeat;
    }
  `,
})
export class Logo {
  /** Rendered height in pixels. Width follows the artwork's aspect ratio. */
  readonly size = input(40);
  /** True when adjacent text already names the club (hidden from a11y tree). */
  readonly decorative = input(false);

  /** Artwork aspect ratio is 356 : 600 (see public/images/logo.svg viewBox). */
  protected readonly width = computed(() => Math.round((this.size() * 356) / 600));
}
