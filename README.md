# abourazanis.com

Personal site of Anastasis Bourazanis, built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

Requires Node 22.12+.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # type-check + static build into dist/
npm run preview  # serve the build
```

## Structure

- `src/pages/` — routes (`index.astro` is the homepage)
- `src/components/` — sidebar, sections, GitHub activity, footer
- `src/data/` — identity, menu and projects (edit content here)
- `src/scripts/` — small client scripts: theme, dot grid, menu tracking, reveals, GitHub calendar
- `src/styles/` — `base.css` (tokens, shared pieces, motion) and `home.css`
- `public/` — copied as-is (`CNAME`, favicon)

Design context lives in `.impeccable.md`.

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.
