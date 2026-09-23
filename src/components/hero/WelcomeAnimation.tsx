import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from '../common/BrandLogo';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

// Konstanta timing welcome — nilai sama persis, diekstrak tanpa ubah visual/durasi.
const WELCOME_PROGRESS_DURATION_MS = 2600;
const WELCOME_TO_SUBMERGED_MS = 1100;
const WELCOME_TO_DIVE_MS = 2200;
const WELCOME_TO_DONE_MS = 2850;
const WELCOME_FADE_DURATION_SEC = 0.65;

export const WelcomeAnimation = ({ onComplete }: WelcomeAnimationProps) => {
  const [phase, setPhase] = useState<'sweep' | 'submerged' | 'dive' | 'done'>('sweep');
  // Efek ala landonorris "Load Norris": counter % + tap to skip
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const DURATION = WELCOME_PROGRESS_DURATION_MS;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(100, ((now - start) / DURATION) * 100);
      setProgress(Math.floor(p));
      if (p < 100) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('submerged');
    }, WELCOME_TO_SUBMERGED_MS);

    const t2 = setTimeout(() => {
      setPhase('dive');
    }, WELCOME_TO_DIVE_MS);

    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, WELCOME_TO_DONE_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'dive' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: WELCOME_FADE_DURATION_SEC, ease: 'easeInOut' }}
        onClick={onComplete}
        className="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none bg-[#031d33] cursor-pointer"
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: phase === 'sweep' ? '0%' : '0%' }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-[#052e4f] via-[#0a5b85] to-[#1288b0]"
        >
          <div className="absolute -top-24 inset-x-0 h-24">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 60 C320 120, 640 0, 960 60 C1200 100, 1360 40, 1440 60 L1440 120 L0 120 Z"
                fill="#1288b0"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: phase === 'sweep' ? '0%' : '0%' }}
          transition={{ duration: 1.15, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-[#0a5b85] via-[#1288b0] to-[#35b6b2]"
        >
          <div className="absolute -top-28 inset-x-0 h-28">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 40 C360 0, 720 100, 1080 30 C1260 0, 1380 60, 1440 40 L1440 120 L0 120 Z"
                fill="#35b6b2"
              />
              <path
                d="M0 40 C360 0, 720 100, 1080 30 C1260 0, 1380 60, 1440 40"
                stroke="#FFFFFF"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: phase === 'sweep' ? '0%' : '0%' }}
          transition={{ duration: 1.25, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-b from-[#031d33] via-[#052e4f] to-[#0a5b85]"
        >
          <div className="absolute -top-32 inset-x-0 h-32">
            <svg
              viewBox="0 0 1440 140"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 50 C280 110, 560 10, 840 70 C1120 120, 1320 20, 1440 50 L1440 140 L0 140 Z"
                fill="#052e4f"
              />
              <path
                d="M0 50 C280 110, 560 10, 840 70 C1120 120, 1320 20, 1440 50"
                stroke="#FFFFFF"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />

          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                y: '100vh',
                x: `${(i * 5.8) % 100}vw`,
                opacity: 0.3,
                scale: 0.6 + (i % 5) * 0.25
              }}
              animate={{
                y: '-20vh',
                opacity: [0.2, 0.85, 0]
              }}
              transition={{
                duration: 1.8 + (i % 4) * 0.4,
                delay: 0.4 + (i * 0.08),
                ease: 'easeOut',
                repeat: Infinity
              }}
              className="absolute w-5 h-5 rounded-full bg-white/40 border border-white/80"
            />
          ))}
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{
              opacity: phase === 'submerged' ? 1 : phase === 'dive' ? 0 : 0,
              scale: phase === 'submerged' ? 1 : phase === 'dive' ? 1.15 : 0.85,
              y: phase === 'submerged' ? 0 : phase === 'dive' ? -30 : 20
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="mb-6"
            >
              <BrandLogo size="xl" />
            </motion.div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-widest uppercase drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
              FRANS LAMPARD
            </h1>
            <p className="mt-3 text-sm sm:text-base font-semibold tracking-widest text-[#fff3df] uppercase drop-shadow-md">
              Securing the Shoreline
            </p>

            <div className="mt-6 w-48 h-1 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#a8dcf0] to-white rounded-full"
              />
            </div>
            <div className="mt-3 flex items-center gap-3 font-mono text-xs text-white/80">
              <span className="tabular-nums text-base font-bold text-white">{progress}%</span>
              <span className="uppercase tracking-widest">tap anywhere to dive in ↓</span>
            </div>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 text-xs text-white/90 font-medium transition-colors cursor-pointer"
        >
          Lewati
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
