// Contact form wiring. Both values are public by design: the endpoint is the
// Cloudflare Worker in worker/, and Turnstile site keys are meant for the page.
// In dev the form posts to `wrangler dev` with Cloudflare's always-pass test key.
const dev = import.meta.env.DEV;

export const contact = {
  endpoint: dev ? 'http://localhost:8787' : 'https://contact.abourazanis.com',
  turnstileSiteKey: dev ? '1x00000000000000000000AA' : 'REPLACE_WITH_TURNSTILE_SITE_KEY',
};
