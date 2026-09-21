import { useState, useEffect } from 'react';

// Threshold & offset — nilai sama persis, diekstrak agar mudah dirawat.
// Tidak ada perubahan perilaku scroll / tampilan.
const SCROLLED_THRESHOLD_PX = 40;
const NAV_OFFSET_PX = 80;

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > SCROLLED_THRESHOLD_PX);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navOffset = NAV_OFFSET_PX;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return { scrollY, isScrolled, scrollToSection };
}
