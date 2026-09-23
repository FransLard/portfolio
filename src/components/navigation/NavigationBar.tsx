import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Copy, Check, Menu, X } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { scrollToSectionLenis } from '../../hooks/useLenisSmoothScroll';
import { useClipboard } from '../../hooks/useClipboard';
import { profileData } from '../../data/portfolioData';
import { BrandLogo } from '../common/BrandLogo';

// Konstanta scroll-spy & motion — nilai sama persis, diekstrak tanpa ubah visual/perilaku.
const NAV_SCROLL_SPY_OFFSET_PX = 240;
const NAV_BOTTOM_THRESHOLD_PX = 80;
const NAV_CLICK_SCROLL_DELAY_MS = 60;
const NAV_MANUAL_RESET_MS = 1500;
const NAV_PROGRESS_SPRING = { stiffness: 120, damping: 28, mass: 0.3 };

export const NavigationBar: React.FC = () => {
  const { isScrolled } = useScrollPosition();
  const { copied, copy } = useClipboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  const navItems = [
    { label: 'Profil', id: 'about' },
    { label: 'Studi Kasus', id: 'projects' },
    { label: 'Tech Stack', id: 'stack' },
    { label: 'Aktivitas', id: 'activity' },
    { label: 'Milestone', id: 'journey' },
    { label: 'Kontak', id: 'contact' },
  ];

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  // Efek ala landonorris "Next Race pill": global scroll progress + status pill
  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, NAV_PROGRESS_SPRING);
  const isManualClickRef = useRef<boolean>(false);
  const manualClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePill = (sectionId: string) => {
    const el = tabRefs.current[sectionId];
    if (el) {
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth
      });
    }
  };

  useEffect(() => {
    updatePill(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => updatePill(activeSection);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualClickRef.current) return;

      const scrollPosition = window.scrollY + NAV_SCROLL_SPY_OFFSET_PX;
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - NAV_BOTTOM_THRESHOLD_PX;

      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    isManualClickRef.current = true;
    setActiveSection(id);
    updatePill(id);

    setMobileMenuOpen(false);
    window.setTimeout(() => scrollToSectionLenis(id), NAV_CLICK_SCROLL_DELAY_MS);

    if (manualClickTimerRef.current) clearTimeout(manualClickTimerRef.current);
    manualClickTimerRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, NAV_MANUAL_RESET_MS);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#052e4f] border-b border-[#a8dcf0]/30 py-3 shadow-[0_4px_16px_rgba(5,46,79,0.4)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      {/* progress bar global ala landonorris marquee top */}
      <motion.div
        style={{ scaleX: progressX }}
        className="absolute top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-[#3ed6a4] via-[#a8dcf0] to-[#ffc53d]"
      />
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <BrandLogo size="md" withText />
        </button>

        <nav className="hidden md:flex items-center relative bg-[#052e4f]/85 border border-white/25 p-1.5 rounded-full transition-all">
          {pillStyle.width > 0 && (
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-white/25 border border-white/40 shadow-inner pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`
              }}
            >
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#fff3df] shadow-[0_0_6px_#fff3df]" />
            </div>
          )}

          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[item.id] = el;
                }}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="relative z-10 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer group select-none"
              >
                <span
                  className={`block wave-text-half ${
                    isActive ? 'is-active' : ''
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* padanan "NEXT RACE: BAKU GP" -> status ketersediaan */}
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#3ed6a4]/15 hover:bg-[#3ed6a4]/25 border border-[#3ed6a4]/50 text-xs font-bold text-[#d8ffe9] transition-all cursor-pointer whitespace-nowrap"
            title="Lihat kontak"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-[#3ed6a4] opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-[#3ed6a4]" />
            </span>
            Open for Internship
          </button>
          <button
            type="button"
            onClick={() => copy(profileData.contact.email)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#052e4f]/85 hover:bg-[#0a5b85] border border-white/25 hover:border-[#fff3df] text-xs font-mono text-white transition-all cursor-pointer group active:scale-95"
            title="Salin email"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#fff3df]" />
                <span className="text-[#fff3df] font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#fff3df] group-hover:rotate-6 transition-transform" />
                <span className="text-white font-medium">{profileData.contact.email}</span>
              </>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => copy(profileData.contact.email)}
            className="p-2.5 rounded-xl bg-[#052e4f]/85 border border-white/25 text-white active:scale-95 transition-transform"
            aria-label="Salin email"
          >
            {copied ? <Check className="w-4 h-4 text-[#fff3df]" /> : <Copy className="w-4 h-4 text-[#fff3df]" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#052e4f]/85 border border-white/25 text-white active:scale-95 transition-transform"
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#052e4f] border-b border-[#a8dcf0]/30 px-6 py-4 mt-2"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-colors touch-manipulation ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-white/85 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
