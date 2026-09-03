# Legacy Lau Gar

Website for Legacy Lau Gar — a Lau Gar Kung Fu club in Nuneaton. Built with
**Angular v22** (standalone components, zoneless, signals) and prerendered to
static HTML, deployed to **GitHub Pages** at
[legacylaugar.com](https://legacylaugar.com).

## Develop

```bash
npm install
npm start        # dev server at http://localhost:4200
npm test         # unit tests (Vitest)
npm run build    # static prerender -> dist/legacy-lau-gar/browser
```

Requires Node `>=24.15.0` (Angular 22 minimum).

## Project layout

| Path | Purpose |
|---|---|
| `src/styles/` + `src/styles.scss` | Design tokens (black + gold) and global styles |
| `src/app/core/site-info.ts` | Single source for address, phone, socials, map embed |
| `src/app/core/schedule/` | 10-week rotating session scheduler + events (edit `schedule.data.ts`) |
| `src/app/core/seo/` | Per-route `<title>` / meta / Open Graph / canonical |
| `src/app/layout/` | Header (nav) and footer |
| `src/app/shared/` | Dragon logo, icons, map embed, sessions table, reveal directive |
| `src/app/pages/` | One folder per route |
| `public/` | Static assets, `CNAME`, `robots.txt`, `sitemap.xml`, `404.html`, legacy redirects |
| `.github/workflows/deploy.yml` | Build + publish to GitHub Pages on push to `master` |

## Editing content

- **Session schedule / events:** `src/app/core/schedule/schedule.data.ts`
- **Contact details, socials, map:** `src/app/core/site-info.ts`
- **Page copy:** the `*.html` template beside each page component in `src/app/pages/`

## Deployment

Push to `master`. The workflow runs `npm ci && npm run build` and publishes
`dist/legacy-lau-gar/browser` (which includes `CNAME`) to GitHub Pages.

> One-time setup: repo **Settings → Pages → Source = GitHub Actions**.
