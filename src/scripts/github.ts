// GitHub contribution calendar and stats for the last 12 months, loaded live.
import { whenRevealed } from './reveal';

interface Day { date: string; count: number; level: number }
interface Contributions { total?: { lastYear?: number }; contributions: Day[] }

const section = document.querySelector<HTMLElement>('.gh');
const grid = section?.querySelector<HTMLElement>('.gh-grid');
const tip = document.querySelector<HTMLElement>('.gh-tip');

if (section && grid && tip) {
  const user = section.dataset.user!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const num = new Intl.NumberFormat('en-GB');

  // Skeleton while loading
  grid.innerHTML = '<i></i>'.repeat(53 * 7);

  const fail = () => {
    section.removeAttribute('aria-busy');
    section.querySelector('.gh-scroll')!.outerHTML =
      `<p class="gh-err">Activity couldn’t load right now. See it on <a class="link" href="https://github.com/${user}">GitHub</a>.</p>`;
    section.querySelector('.gh-stats')?.remove();
  };

  const render = ({ contributions, total: totals }: Contributions) => {
    // Third-party data goes into markup below: keep only well-formed days.
    const days = (contributions ?? [])
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d.date))
      .map((d) => ({ date: d.date, count: Math.max(0, Math.trunc(Number(d.count)) || 0), level: Math.min(4, Math.max(0, Math.trunc(Number(d.level)) || 0)) }));
    if (!days.length) return fail();
    const total = Number(totals?.lastYear) || days.reduce((s, d) => s + d.count, 0);
    const active = days.filter((d) => d.count > 0).length;
    let longest = 0, run = 0;
    for (const d of days) { run = d.count > 0 ? run + 1 : 0; longest = Math.max(longest, run); }

    const stats: [HTMLElement, number, (n: number) => string][] = [
      [section.querySelector('[data-stat="total"]')!, total, (n) => num.format(n)],
      [section.querySelector('[data-stat="active"]')!, active, (n) => num.format(n)],
      [section.querySelector('[data-stat="streak"]')!, longest, (n) => n + (n === 1 ? ' day' : ' days')],
    ];
    stats.forEach(([el, v, f]) => { el.textContent = f(v); });

    // Weeks start on Sunday, like GitHub: pad the first column.
    const lead = new Date(days[0].date + 'T00:00:00').getDay();
    const cells: string[] = [];
    for (let i = 0; i < lead; i++) cells.push('<i class="pad"></i>');
    days.forEach((d, i) => {
      const w = Math.floor((i + lead) / 7);
      cells.push(`<i data-l="${d.level}" data-d="${d.date}" data-c="${d.count}" style="--w:${w}"></i>`);
    });
    grid.style.setProperty('--weeks', String(Math.ceil(cells.length / 7)));
    grid.innerHTML = cells.join('');
    grid.setAttribute('aria-label',
      `GitHub contribution calendar: ${num.format(total)} contributions between ${fmt.format(new Date(days[0].date))} and ${fmt.format(new Date(days[days.length - 1].date))}`);
    section.removeAttribute('aria-busy');

    // Show the most recent weeks first on narrow screens.
    const scroller = section.querySelector<HTMLElement>('.gh-scroll')!;
    scroller.scrollLeft = scroller.scrollWidth;

    // When the section is on screen: fill the calendar in and count the numbers up.
    whenRevealed(section, () => {
      if (reduced.matches) return;
      grid.classList.add('play');
      const start = performance.now(), dur = 1100;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const e = 1 - Math.pow(1 - t, 4); // ease-out-quart
        stats.forEach(([el, v, f]) => { el.textContent = f(Math.round(v * e)); });
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    grid.addEventListener('pointerover', (e) => {
      const c = (e.target as Element).closest<HTMLElement>('i[data-d]');
      if (!c) return;
      const n = Number(c.dataset.c);
      tip.textContent = `${n === 0 ? 'No' : num.format(n)} contribution${n === 1 ? '' : 's'} on ${fmt.format(new Date(c.dataset.d!))}`;
      const r = c.getBoundingClientRect();
      tip.style.left = r.left + r.width / 2 + 'px';
      tip.style.top = r.top + 'px';
      tip.classList.add('show');
    });
    grid.addEventListener('pointerleave', () => tip.classList.remove('show'));
  };

  fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`, { signal: AbortSignal.timeout(10000) })
    .then((res) => { if (!res.ok) throw new Error(String(res.status)); return res.json() as Promise<Contributions>; })
    .then(render)
    .catch(fail);
}
