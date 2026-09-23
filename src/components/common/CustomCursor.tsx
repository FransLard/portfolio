import { useEffect, useRef } from 'react';

// Custom cursor dot + ring ala landonorris. Desktop + fine pointer saja.
// Non-intrusif: mix-blend-difference, disembunyikan saat hover input/textarea.
// Konstanta diekstrak — nilai sama persis, tanpa ubah perilaku/visual.
const CURSOR_OFFSCREEN_POS = -100;
const CURSOR_RING_LERP = 0.16;
const CURSOR_COARSE_QUERY = '(hover: none), (pointer: coarse)';
const CURSOR_INTERACTIVE_SELECTOR = 'a,button,[role="button"],.helm,.h-card';
const CURSOR_ACTIVE_CLASS = 'cursor-ring--active';
const CURSOR_ROOT_CLASS = 'has-custom-cursor';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia(CURSOR_COARSE_QUERY).matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = CURSOR_OFFSCREEN_POS;
    let my = CURSOR_OFFSCREEN_POS;
    let rx = CURSOR_OFFSCREEN_POS;
    let ry = CURSOR_OFFSCREEN_POS;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest?.(CURSOR_INTERACTIVE_SELECTOR);
      if (interactive !== hovering) {
        hovering = interactive;
        ring.classList.toggle(CURSOR_ACTIVE_CLASS, hovering);
      }
    };

    const loop = () => {
      rx += (mx - rx) * CURSOR_RING_LERP;
      ry += (my - ry) * CURSOR_RING_LERP;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    document.documentElement.classList.add(CURSOR_ROOT_CLASS);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove(CURSOR_ROOT_CLASS);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
};
