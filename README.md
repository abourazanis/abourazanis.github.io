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
- `worker/` — Cloudflare Worker behind the contact form (separate package)

Design context lives in `.impeccable.md`.

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.

## Contact form

`/contact/` posts to a Cloudflare Worker (`worker/`) that checks [Turnstile](https://developers.cloudflare.com/turnstile/),
validates the fields and emails the message through Cloudflare Email Routing. No email address is stored in the repo.

### Run locally

```sh
cd worker
npm install
cp .dev.vars.example .dev.vars   # Turnstile test keys; email is simulated
npm run dev                      # http://localhost:8787
```

With `npm run dev` running at the root as well, the form at http://localhost:4321/contact/ posts to the local Worker
(see `src/data/contact.ts`). Simulated emails are written under `worker/.wrangler/tmp/`.

### One-time Cloudflare setup

1. **Email Routing** — dashboard → `abourazanis.com` → Email → Email Routing → enable it (adds the MX/SPF records).
   Under **Destination addresses**, add your inbox and confirm the verification email.
2. **Turnstile** — dashboard → Turnstile → Add widget: hostname `abourazanis.com`, mode **Managed**.
   Put the **site key** in `src/data/contact.ts` (it is public). Keep the **secret key** for step 4.
3. **Log in** — `cd worker && npx wrangler login`
4. **Secrets** —
   ```sh
   npx wrangler secret put TURNSTILE_SECRET   # the Turnstile secret key
   npx wrangler secret put TO_ADDRESS         # the verified destination inbox
   ```
5. **Deploy** — `npm run deploy`. This also creates `contact.abourazanis.com` as the Worker's custom domain.

Redeploy with `npm run deploy` after changing anything in `worker/`; the site itself deploys separately through GitHub Pages.
