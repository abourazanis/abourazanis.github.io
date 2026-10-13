// Theme toggle. The site starts dark (data-theme on <html>); a saved light
// choice is applied before first paint by the inline script in Base.astro.
const root = document.documentElement;
const buttons = document.querySelectorAll<HTMLButtonElement>('.theme-toggle');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

// Hex equivalents of --bg, for the browser's toolbar colour.
const BG = { light: '#f7f9fc', dark: '#0c1522' };
const themeMetas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');

const isDark = () => root.dataset.theme !== 'light';
const sync = () => {
  buttons.forEach((b) => b.setAttribute('aria-pressed', String(isDark())));
  themeMetas.forEach((m) => (m.content = isDark() ? BG.dark : BG.light));
};

sync();

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
