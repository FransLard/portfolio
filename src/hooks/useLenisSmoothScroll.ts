import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let globalLenisInstance: Lenis | null = null;

// Konstanta navigasi — nilai sama persis, diekstrak agar mudah dirawat.
const NAV_OFFSET_PX = -76;
const SCROLL_DURATION_SEC = 1.4;

export function stopLenisScroll(): void {
  if (globalLenisInstance) {
    globalLenisInstance.stop();
  }
}

export function startLenisScroll(): void {
  if (globalLenisInstance) {
    globalLenisInstance.start();
  }
}

export function scrollToSectionLenis(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(el, { offset: NAV_OFFSET_PX, duration: SCROLL_DURATION_SEC });
  } else {
    const top = el.getBoundingClientRect().top + window.pageYOffset + NAV_OFFSET_PX;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function useLenisSmoothScroll(): void {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
    });

    globalLenisInstance = lenis;

    let animId: number;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      globalLenisInstance = null;
    };
  }, []);
}
