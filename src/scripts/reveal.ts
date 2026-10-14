// Reveal sections once as they scroll into view. Others can wait for the same
// moment with whenRevealed(), e.g. to start an animation inside a section.
const waiting = new Map<Element, () => void>();

const observer =
  'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          waiting.get(e.target)?.();
          waiting.delete(e.target);
          observer?.unobserve(e.target);
        }
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 })
    : null;

document.querySelectorAll('.block').forEach((b) => {
  if (!observer) return;
  b.classList.add('reveal');
  observer.observe(b);
});

export function whenRevealed(el: Element, fn: () => void) {
  if (!observer || el.classList.contains('in')) fn();
  else waiting.set(el, fn);
}
