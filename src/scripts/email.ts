// Email on the CV, kept out of the HTML: decoded only when someone clicks
// "Show email" / "Copy email", or right before the page is printed.
const show = document.querySelector<HTMLButtonElement>('[data-email]');
const copy = document.querySelector<HTMLButtonElement>('[data-copy-email]');
const code = show?.dataset.email ?? copy?.dataset.copyEmail;

if (code) {
  const address = () => atob(code).split('').reverse().join('');

  // Swap the button for a mailto link; returns the link.
  const reveal = () => {
    const current = document.querySelector<HTMLAnchorElement>('.email-link');
    if (current) return current;
    const a = document.createElement('a');
    a.className = 'email-link';
    a.href = 'mailto:' + address();
    a.textContent = address();
    show?.replaceWith(a);
    return a;
  };

  show?.addEventListener('click', () => reveal().focus());
  addEventListener('beforeprint', reveal);

  if (copy) {
    const label = copy.innerHTML;
    let timer = 0;
    copy.addEventListener('click', async () => {
      const link = reveal();
      try {
        await navigator.clipboard.writeText(address());
        copy.textContent = 'Copied';
      } catch {
        // No clipboard access: select the revealed address instead.
        getSelection()?.selectAllChildren(link);
        copy.textContent = 'Shown above';
      }
      clearTimeout(timer);
      timer = window.setTimeout(() => (copy.innerHTML = label), 2000);
    });
  }
}
