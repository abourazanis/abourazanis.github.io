// Contact form: renders the Turnstile check, posts to the Worker in place and
// shows the result. On failure everything typed is kept.
interface Turnstile {
  render(el: HTMLElement, opts: Record<string, unknown>): string;
  reset(id?: string): void;
}
declare global { interface Window { turnstile?: Turnstile; onTurnstile?: () => void } }

const form = document.querySelector<HTMLFormElement>('.form');
const sent = document.querySelector<HTMLElement>('.sent');

if (form && sent) {
  const status = form.querySelector<HTMLElement>('.status')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const label = button.querySelector<HTMLElement>('.label')!;
  const challenge = form.querySelector<HTMLElement>('.challenge')!;
  const started = form.querySelector<HTMLInputElement>('[name="started"]')!;
  let widget: string | undefined;
  let busy = false;

  started.value = String(Date.now());

  // Turnstile, in "interaction-only" mode: it stays hidden unless it needs a click.
  const isDark = () => {
    const t = document.documentElement.dataset.theme;
    return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  };
  window.onTurnstile = () => {
    widget = window.turnstile!.render(challenge, {
      sitekey: form.dataset.siteKey,
      appearance: 'interaction-only',
      theme: isDark() ? 'dark' : 'light',
    });
  };
  const api = document.createElement('script');
  api.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=onTurnstile';
  api.async = true;
  api.onerror = () => say('The spam check couldn’t load. Please reload the page, or message me on LinkedIn.', true);
  document.head.append(api);

  function say(text: string, error = false) {
    status.textContent = text;
    status.classList.toggle('error', error);
  }

  function setBusy(on: boolean) {
    busy = on;
    button.setAttribute('aria-disabled', String(on));
    label.textContent = on ? 'Sending…' : 'Send message';
  }

  const ERRORS: Record<string, string> = {
    invalid: 'Please check the fields and try again.',
    challenge: 'The spam check didn’t pass. Please try again.',
  };
  const FALLBACK = 'Couldn’t send right now. Please try again, or message me on LinkedIn.';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    if (!data.get('cf-turnstile-response')) {
      say('Still checking you’re not a bot. Try again in a moment.');
      return;
    }

    setBusy(true);
    say('');
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, signal: AbortSignal.timeout(15000) });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) throw new Error(body.error ?? String(res.status));

      sent.querySelector('.sent-to')!.textContent = String(data.get('email'));
      form.remove();
      sent.hidden = false;
      sent.focus();
    } catch (err) {
      say(ERRORS[(err as Error).message] ?? FALLBACK, true);
      window.turnstile?.reset(widget); // tokens are single-use
      setBusy(false);
    }
  });
}

export {};
