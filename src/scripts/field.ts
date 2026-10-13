// Dot-grid field: a faint grid that warms to teal around the cursor.
// Colours come from the probe elements so they follow the theme tokens.
const canvas = document.querySelector<HTMLCanvasElement>('.field');
const ctx = canvas?.getContext('2d');
const [lineEl, accentEl] = document.querySelectorAll<HTMLElement>('.field-probe i');

if (canvas && ctx && lineEl && accentEl) {
  const GAP = 20, R = 130, BASE = 0.85;
  let w = 0, h = 0, dpr = 1;
  let colors = { line: '', accent: '' };
  const target = { x: -9999, y: -9999 }, pos = { x: -9999, y: -9999 };
  let strength = 0, wanted = 0, raf = 0;

  const readColors = () => {
    colors = { line: getComputedStyle(lineEl).color, accent: getComputedStyle(accentEl).color };
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const ox = (w % GAP) / 2, oy = (h % GAP) / 2;
    for (let y = oy; y < h; y += GAP) {
      for (let x = ox; x < w; x += GAP) {
        const d = Math.hypot(x - pos.x, y - pos.y);
        let t = d < R ? 1 - d / R : 0;
        t = t * t * (3 - 2 * t) * strength; // smoothstep, scaled by presence
        ctx.globalAlpha = 1;
        ctx.fillStyle = colors.line;
        ctx.beginPath(); ctx.arc(x, y, BASE, 0, 6.283); ctx.fill();
        if (t > 0.01) {
          ctx.globalAlpha = t * 0.45;
          ctx.fillStyle = colors.accent;
          ctx.beginPath(); ctx.arc(x, y, BASE + t * 0.35, 0, 6.283); ctx.fill();
        }
      }
    }
    ctx.globalAlpha = 1;
  };
  const resize = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  };
  const loop = () => {
    pos.x += (target.x - pos.x) * 0.14;
    pos.y += (target.y - pos.y) * 0.14;
    strength += (wanted - strength) * 0.08;
    draw();
    const settled = Math.abs(target.x - pos.x) < 0.3 && Math.abs(target.y - pos.y) < 0.3 && Math.abs(wanted - strength) < 0.005;
    raf = settled ? 0 : requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

  readColors(); resize();
  addEventListener('resize', resize);
  // Re-read colours when the theme changes.
  const recolor = () => requestAnimationFrame(() => { readColors(); draw(); });
  new MutationObserver(recolor).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', recolor);

  // Only follows a mouse, and only with motion allowed; otherwise the grid stays static.
  const interactive = matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (interactive) {
    addEventListener('pointermove', (e) => {
      if (pos.x < -999) { pos.x = e.clientX; pos.y = e.clientY; }
      target.x = e.clientX; target.y = e.clientY; wanted = 1; kick();
    }, { passive: true });
    document.addEventListener('pointerleave', () => { wanted = 0; kick(); });
  }
}
