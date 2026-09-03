import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { SeoData, SeoService } from './core/seo/seo';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer],
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <app-header />
    <main id="main">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class App {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(() => {
          let r = this.route.firstChild;
          while (r?.firstChild) r = r.firstChild;
          return {
            seo: (r?.snapshot.data['seo'] ?? {}) as SeoData,
            path: this.router.url.split('?')[0],
          };
        }),
        takeUntilDestroyed(),
      )
      .subscribe(({ seo, path }) => this.seo.update({ ...seo, path: seo.path ?? path }));
  }
}
