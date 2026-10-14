// Contact form endpoint: checks Turnstile, validates the fields and emails the
// message to the site owner through Cloudflare Email Routing.
import { EmailMessage } from 'cloudflare:email';

interface Env {
  MAIL: SendEmail;
  ALLOWED_ORIGINS: string;
  FROM_ADDRESS: string;
  TO_ADDRESS: string; // secret
  TURNSTILE_SECRET: string; // secret
}

const LIMITS = { name: 100, email: 254, message: 5000 };
const MIN_FILL_MS = 3000; // faster than this is a bot
const EMAIL_RE = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/;

export default {
  async fetch(request, env): Promise<Response> {
    const origin = request.headers.get('Origin') ?? '';
    const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
    const cors: Record<string, string> = allowed.includes(origin)
      ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' }
      : {};
    const reply = (status: number, body: { ok: boolean; error?: string }) =>
      Response.json(body, { status, headers: cors });

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: { ...cors, 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Max-Age': '86400' },
      });
    }
    if (request.method !== 'POST') return reply(405, { ok: false, error: 'method' });
    if (!cors['Access-Control-Allow-Origin']) return reply(403, { ok: false, error: 'origin' });

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return reply(400, { ok: false, error: 'invalid' });
    }
    const field = (k: string) => String(form.get(k) ?? '').trim();

    // Bot traps: a hidden field people never fill, and a minimum time on the page.
    // Bots get a normal-looking success so they don't adapt.
    const started = Number(field('started'));
    if (field('website') || !started || Date.now() - started < MIN_FILL_MS) return reply(200, { ok: true });

    const name = field('name').replace(/[\r\n]+/g, ' ');
    const email = field('email');
    const message = field('message');
    if (
      !name || name.length > LIMITS.name ||
      !EMAIL_RE.test(email) || email.length > LIMITS.email ||
      message.length < 2 || message.length > LIMITS.message
    ) {
      return reply(422, { ok: false, error: 'invalid' });
    }

    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET,
        response: field('cf-turnstile-response'),
        remoteip: request.headers.get('CF-Connecting-IP') ?? '',
      }),
    }).then((r) => r.json<{ success: boolean }>()).catch(() => ({ success: false }));
    if (!verify.success) return reply(403, { ok: false, error: 'challenge' });

    const raw = mime({
      from: `"abourazanis.com" <${env.FROM_ADDRESS}>`,
      to: env.TO_ADDRESS,
      replyTo: `${quote(name)} <${email}>`,
      subject: `Contact form: ${name}`,
      text: `${message}\n\n— ${name} <${email}>\nSent from the contact form on abourazanis.com`,
    });

    try {
      await env.MAIL.send(new EmailMessage(env.FROM_ADDRESS, env.TO_ADDRESS, raw));
    } catch (e) {
      console.error('send failed', e);
      return reply(502, { ok: false, error: 'send' });
    }
    return reply(200, { ok: true });
  },
} satisfies ExportedHandler<Env>;

// ---------- Minimal MIME (plain text, UTF-8) ----------

function b64(text: string) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

// RFC 2047 encoded-word, for non-ASCII names and subjects.
const word = (text: string) => (/^[\x20-\x7e]*$/.test(text) ? text : `=?UTF-8?B?${b64(text)}?=`);
const quote = (name: string) => (/^[\x20-\x7e]*$/.test(name) ? `"${name.replace(/["\\]/g, '')}"` : word(name));

function mime(m: { from: string; to: string; replyTo: string; subject: string; text: string }) {
  const body = b64(m.text).replace(/.{76}/g, '$&\r\n');
  return [
    `From: ${m.from}`,
    `To: ${m.to}`,
    `Reply-To: ${m.replyTo}`,
    `Subject: ${word(m.subject)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@abourazanis.com>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: base64',
    '',
    body,
  ].join('\r\n');
}
