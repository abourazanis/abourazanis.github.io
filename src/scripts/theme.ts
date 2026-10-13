// Theme toggle: flips relative to whatever is currently showing. The saved
// choice is applied before first paint by the inline script in Base.astro.
const root = document.documentElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('.theme-toggle');
const systemDark = matchMedia('(prefers-color-scheme: dark)');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : systemDark.matches);
const sync = () => buttons.forEach((b) => b.setAttribute('aria-pressed', String(isDark())));

sync();
systemDark.addEventListener('change', sync);

buttons.forEach((button) =>
  button.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    const apply = () => {
      root.dataset.theme = next;
      sync();
    };
    if (document.startViewTransition && !reduced.matches) document.startViewTransition(apply);
    else apply();
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage can be unavailable (private mode); the choice just won't persist.
    }
  }),
);
