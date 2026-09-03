import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type LogoVariant = 'gold' | 'metallic' | 'silver';

/**
 * Club dragon logo.
 *
 * The artwork lives at `public/images/logo.svg` (a single-colour vector). It is
 * applied as a CSS mask, so the fill comes entirely from CSS — a flat colour or
 * a gradient for a brushed-metal effect. One file, any finish, any size.
 */
@Component({
  selector: 'app-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="logo__mark"
      [class]="'logo__mark--' + variant()"
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
    }
    .logo__mark {
      display: block;
      -webkit-mask: url('/images/logo.svg') center / contain no-repeat;
      mask: url('/images/logo.svg') center / contain no-repeat;
    }
    .logo__mark--gold {
      background: var(--gold);
    }
    /* Yellow -> white -> deep gold: a metallic sheen across the mark. */
    .logo__mark--metallic {
      background: linear-gradient(
        135deg,
        #9a7407 0%,
        #ffd700 22%,
        #fff6d5 48%,
        #ffdf3d 60%,
        #b8860b 82%,
        #7c5a06 100%
      );
    }
    /* Brushed silver. */
    .logo__mark--silver {
      background: linear-gradient(
        135deg,
        #6f6f6f 0%,
        #c9c9c9 22%,
        #ffffff 48%,
        #d4d4d4 60%,
        #9a9a9a 82%,
        #6a6a6a 100%
      );
    }
  `,
})
export class Logo {
  /** Rendered height in pixels. Width follows the artwork's aspect ratio. */
  readonly size = input(40);
  /** True when adjacent text already names the club (hidden from a11y tree). */
  readonly decorative = input(false);
  /** Fill finish: flat gold (default), metallic gold, or brushed silver. */
  readonly variant = input<LogoVariant>('gold');

  /** Artwork aspect ratio is 356 : 600 (see public/images/logo.svg viewBox). */
  protected readonly width = computed(() => Math.round((this.size() * 356) / 600));
}
