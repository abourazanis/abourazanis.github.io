// Highlight the section currently in view in the menu.
const toc = document.querySelector<HTMLElement>('.toc');
const marker = document.querySelector<HTMLElement>('.toc-marker');

if (toc && marker) {
  const root = document.documentElement;
  const links = [...toc.querySelectorAll<HTMLAnchorElement>('a')];
  const byId = new Map(links.filter((a) => a.hash).map((a) => [a.hash.slice(1), a]));
  const sections = [...document.querySelectorAll<HTMLElement>('.block[id]')];
  const lastLink = byId.get(sections.at(-1)?.id ?? '');
  const wide = matchMedia('(min-width: 64rem)');

  // One marker: under the link in the phone bar, beside it on the desktop rail.
  const placeMarker = (link: HTMLElement) => {
    marker.style.setProperty('--x', link.offsetLeft + 'px');
    marker.style.setProperty('--w', String(link.offsetWidth));
    marker.style.setProperty('--y', link.offsetTop + 'px');
    marker.style.setProperty('--h', link.offsetHeight + 'px');
  };
  const setCurrent = (link: HTMLElement | undefined) => {
    if (!link || link.hasAttribute('aria-current')) return;
    links.forEach((a) => a.removeAttribute('aria-current'));
    link.setAttribute('aria-current', 'true');
    placeMarker(link);
    marker.classList.add('on');
  };
  const clearCurrent = () => {
    links.forEach((a) => a.removeAttribute('aria-current'));
    marker.classList.remove('on');
  };

  // Pinned section headings sit just below the pinned phone menu bar.
  const onResize = () => {
    root.style.setProperty('--nav-h', toc.offsetHeight + 'px');
    const current = toc.querySelector<HTMLElement>('a[aria-current]');
    if (current) placeMarker(current);
  };
  onResize();
  addEventListener('resize', onResize, { passive: true });

  // The current section is the last one to cross a reading line: just under the
  // pinned bar on phones (matching the pinned heading), a third down on desktop.
  // The last section is short and may never reach it: highlight it at the bottom.
  const atBottom = () => innerHeight + scrollY >= root.scrollHeight - 2;
  let ticking = false;
  const track = () => {
    ticking = false;
    if (atBottom()) return setCurrent(lastLink);
    const line = wide.matches ? innerHeight * 0.35 : toc.offsetHeight + 8;
    let current: HTMLElement | null = null;
    for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s;
    const link = current && byId.get(current.id);
    if (link) setCurrent(link);
    else if (current) clearCurrent(); // a section that isn't in the menu (GitHub)
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(track); }
  }, { passive: true });
  track();
}
