import { useRef, useCallback } from 'react';

// Efek magnetic ala landonorris: elemen ketarik halus ke arah kursor (desktop only).
// Mengembalikan ref + handler untuk dipasang ke motion.button / div.
// Konstanta diekstrak — nilai sama persis, tanpa ubah feel/visual.
const MAGNETIC_STRENGTH = 0.28;
const RESET_TRANSITION = 'transform 0.35s cubic-bezier(0.22,1,0.36,1)';
const MAGNETIC_HOVER_TRANSITION = 'transform 0.08s ease-out';
const MAGNETIC_RESET_TRANSFORM = 'translate(0px, 0px)';
const MAGNETIC_COARSE_QUERY = '(hover: none)';

export function useMagnetic<T extends HTMLElement>(strength: number = MAGNETIC_STRENGTH) {
  const ref = useRef<T | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el || window.matchMedia(MAGNETIC_COARSE_QUERY).matches) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transition = MAGNETIC_HOVER_TRANSITION;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = RESET_TRANSITION;
    el.style.transform = MAGNETIC_RESET_TRANSFORM;
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
