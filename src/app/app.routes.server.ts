import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * All content routes are prerendered to static HTML at build time (see
 * `outputMode: static` in angular.json). GitHub Pages serves the resulting
 * `<route>/index.html` files directly; unknown URLs fall back to `public/404.html`.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'about', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: 'sessions', renderMode: RenderMode.Prerender },
  { path: 'socials', renderMode: RenderMode.Prerender },
  { path: 'thankyou', renderMode: RenderMode.Prerender },
  { path: 'privacy-policy', renderMode: RenderMode.Prerender },
  { path: 'terms-of-service', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];
