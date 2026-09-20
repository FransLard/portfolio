import { useState, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import type { DuckExpression } from './SwimmingDuck';

export interface HeroPhysicsStageHandle {
  handleDuckDrop: (clientX: number, clientY: number, velocity: number) => void;
  handleDuckSwim: (duckX: number, duckY: number) => void;
  duckExpression: DuckExpression;
}

interface LetterData {
  id: string;
  char: string;
  wordIdx: number;
  letterIdx: number;
  posX: number;
  posY: number;
  wobble: number;
}

const INITIAL_LETTERS: Omit<LetterData, 'posX' | 'posY' | 'wobble'>[] = [
  { id: 'f1', char: 'F', wordIdx: 0, letterIdx: 0 },
  { id: 'r1', char: 'R', wordIdx: 0, letterIdx: 1 },
  { id: 'a1', char: 'A', wordIdx: 0, letterIdx: 2 },
  { id: 'n1', char: 'N', wordIdx: 0, letterIdx: 3 },
  { id: 's1', char: 'S', wordIdx: 0, letterIdx: 4 },
  { id: 'l1', char: 'L', wordIdx: 1, letterIdx: 0 },
  { id: 'a2', char: 'A', wordIdx: 1, letterIdx: 1 },
  { id: 'm1', char: 'M', wordIdx: 1, letterIdx: 2 },
  { id: 'p1', char: 'P', wordIdx: 1, letterIdx: 3 },
  { id: 'a3', char: 'A', wordIdx: 1, letterIdx: 4 },
  { id: 'r2', char: 'R', wordIdx: 1, letterIdx: 5 },
  { id: 'd1', char: 'D', wordIdx: 1, letterIdx: 6 },
];

interface HeroPhysicsStageProps {
  onSplash: (clientX: number, clientY: number, intensity: number) => void;
  onRipple: (clientX: number, clientY: number, size?: number) => void;
  onDuckExpressionChange?: (expression: DuckExpression) => void;
}

export const HeroPhysicsStage = forwardRef<HeroPhysicsStageHandle, HeroPhysicsStageProps>(
  ({ onSplash, onRipple, onDuckExpressionChange }, ref) => {
    const [letters, setLetters] = useState<LetterData[]>(() =>
      INITIAL_LETTERS.map((item) => ({
        ...item,
        posX: 0,
        posY: 0,
        wobble: 0
      }))
    );
    const [activeGrabbedId, setActiveGrabbedId] = useState<string | null>(null);
    const [duckExpression, setDuckExpression] = useState<DuckExpression>('normal');
    const duckImpactTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastRippleTimeRef = useRef<number>(0);
    const returnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Timer balik-kandang yang anti-starvation: kalau sudah ada timer yang
    // terjadwal, jangan di-clear + dijadwal ulang terus (itu yang bikin di
    // mobile huruf nempel terus saat bebek lewat lama). Biarkan timer yang
    // sudah jalan yang me-reset, sama seperti perilaku di PC.
    const scheduleLettersReturn = useCallback((delay: number = 1200) => {
      if (returnTimeoutRef.current) return;
      returnTimeoutRef.current = setTimeout(() => {
        returnTimeoutRef.current = null;
        setLetters((prev) => prev.map((l) => ({ ...l, posX: 0, posY: 0, wobble: 0 })));
      }, delay);
    }, []);

    const updateDuckExpression = useCallback((expr: DuckExpression) => {
      setDuckExpression(expr);
      if (onDuckExpressionChange) {
        onDuckExpressionChange(expr);
      }
    }, [onDuckExpressionChange]);

    const resolveCollisions = useCallback(
      (sourceId: string, centerX: number, centerY: number, intensity: number = 1): boolean => {
        const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
        const minThreshold = isMobile ? 65 : 130;
        const maxDisplacement = isMobile ? 18 : 50;

        // Hitung tabrakan secara sinkron (baca DOM dulu) agar hasilnya bisa
        // dipakai langsung — jangan mengandalkan side-effect di dalam updater
        // setLetters yang sifatnya async/batched.
        const hits: { id: string; pushX: number; pushY: number; wobble: number; cx: number; cy: number }[] = [];
        for (const other of INITIAL_LETTERS) {
          if (other.id === sourceId) continue;
          const otherEl = document.getElementById(`letter-${other.id}`);
          if (!otherEl) continue;
          const otherRect = otherEl.getBoundingClientRect();
          const otherCenterX = otherRect.left + otherRect.width / 2;
          const otherCenterY = otherRect.top + otherRect.height / 2;

          let dx = otherCenterX - centerX;
          let dy = otherCenterY - centerY;
          let dist = Math.sqrt(dx ** 2 + dy ** 2);

          if (dist < 1) {
            dx = (Math.random() - 0.5) * 50 || 30;
            dy = (Math.random() - 0.5) * 50 || 30;
            dist = Math.sqrt(dx ** 2 + dy ** 2);
          }

          if (dist < minThreshold) {
            const overlap = (minThreshold - dist) / minThreshold;
            const force = overlap * (isMobile ? 35 : 70) * Math.max(0.8, intensity);
            hits.push({
              id: other.id,
              pushX: (dx / dist) * force,
              pushY: (dy / dist) * (force * 0.85),
              wobble: (dx > 0 ? 10 : -10) * overlap * Math.max(0.8, intensity),
              cx: otherCenterX,
              cy: otherCenterY
            });
          }
        }

        if (hits.length === 0) return false;

        for (const h of hits) {
          onRipple(h.cx, h.cy, 55);
        }

        const hitIds = new Set(hits.map((h) => h.id));
        const hitById = new Map(hits.map((h) => [h.id, h]));
        setLetters((prev) =>
          prev.map((other) => {
            const h = hitById.get(other.id);
            if (!h || !hitIds.has(other.id)) return other;
            return {
              ...other,
              posX: Math.max(-maxDisplacement, Math.min(maxDisplacement, other.posX + h.pushX)),
              posY: Math.max(-maxDisplacement, Math.min(maxDisplacement, other.posY + h.pushY)),
              wobble: h.wobble
            };
          })
        );

        scheduleLettersReturn(1200);
        return true;
      },
      [onRipple, scheduleLettersReturn]
    );

    const handleLetterDragStart = (id: string) => {
      setActiveGrabbedId(id);
    };

    const handleLetterDragEnd = (
      id: string,
      _e: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      setActiveGrabbedId(null);
      const speed = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);
      const intensity = Math.min(2.8, Math.max(0.9, speed / 200));

      onSplash(info.point.x, info.point.y, intensity);

      const droppedEl = document.getElementById(`letter-${id}`);
      if (!droppedEl) return;
      const droppedRect = droppedEl.getBoundingClientRect();
      const droppedCenterX = droppedRect.left + droppedRect.width / 2;
      const droppedCenterY = droppedRect.top + droppedRect.height / 2;

      setLetters((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              posX: item.posX + info.offset.x,
              posY: item.posY + info.offset.y,
              wobble: 0
            };
          }
          return item;
        })
      );

      resolveCollisions(id, droppedCenterX, droppedCenterY, intensity);

      setTimeout(() => {
        setLetters((prev) => prev.map((l) => ({ ...l, wobble: 0 })));
      }, 600);
    };

    const handleDuckDrop = (clientX: number, clientY: number, velocity: number) => {
      onSplash(clientX, clientY, velocity);

      const didHit = resolveCollisions('duck', clientX, clientY, velocity * 1.3);

      if (didHit) {
        updateDuckExpression('impact');
        if (duckImpactTimeoutRef.current) clearTimeout(duckImpactTimeoutRef.current);
        duckImpactTimeoutRef.current = setTimeout(() => {
          updateDuckExpression('normal');
        }, 1100);
      } else {
        updateDuckExpression('normal');
      }

      setTimeout(() => {
        setLetters((prev) => prev.map((l) => ({ ...l, wobble: 0 })));
      }, 600);
    };

    const handleDuckSwim = (duckX: number, duckY: number) => {

      const now = performance.now();
      // Gelombang bebek yang lembut & perlahan: spawn jarang (600ms) dan
      // cincin kecil. Berlaku sama di PC maupun mobile.
      const shouldRipple = now - lastRippleTimeRef.current > 600;
      if (shouldRipple) {
        lastRippleTimeRef.current = now;
        onRipple(duckX, duckY, 38);
      }

      // Deteksi tabrakan secara sinkron agar flag hit valid di mobile maupun PC.
      const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;
      const hitThreshold = isMobile ? 55 : 105;
      const maxDisplacement = isMobile ? 18 : 45;
      const hitIds = new Set<string>();

      for (const letter of INITIAL_LETTERS) {
        const el = document.getElementById(`letter-${letter.id}`);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;
        const dx = letterCenterX - duckX;
        const dy = letterCenterY - duckY;
        const dist = Math.sqrt(dx ** 2 + dy ** 2);
        if (dist < hitThreshold && dist > 0) {
          hitIds.add(letter.id);
          // Ripple tabrakan huruf juga dilembutkan & ikut throttle yang sama
          // agar tidak brutal saat bebek nempel lama.
          if (shouldRipple) onRipple(letterCenterX, letterCenterY, 38);
        }
      }

      if (hitIds.size === 0) return;

      setLetters((prev) =>
        prev.map((letter) => {
          if (!hitIds.has(letter.id)) return letter;
          const el = document.getElementById(`letter-${letter.id}`);
          let pushY: number;
          let pushX: number;
          let wobble: number;
          if (el) {
            const rect = el.getBoundingClientRect();
            const dy = rect.left + rect.width / 2 - duckX >= 0 ? 1 : -1;
            // Arah vertikal mengikuti posisi relatif huruf vs bebek
            const vert = rect.top + rect.height / 2 - duckY;
            pushY = vert >= 0 ? (isMobile ? 10 : 22) : (isMobile ? -10 : -22);
            pushX = dy >= 0 ? (isMobile ? 8 : 14) : (isMobile ? -4 : -6);
            wobble = vert >= 0 ? 8 : -8;
          } else {
            pushY = isMobile ? 10 : 22;
            pushX = isMobile ? 8 : 14;
            wobble = 8;
          }
          return {
            ...letter,
            posX: Math.max(-maxDisplacement, Math.min(maxDisplacement, letter.posX + pushX)),
            posY: Math.max(-maxDisplacement, Math.min(maxDisplacement, letter.posY + pushY)),
            wobble
          };
        })
      );

      updateDuckExpression('impact');
      if (duckImpactTimeoutRef.current) clearTimeout(duckImpactTimeoutRef.current);
      duckImpactTimeoutRef.current = setTimeout(() => {
        updateDuckExpression('normal');
      }, 900);

      // Sama seperti PC: jadwalkan balik, tapi jangan perpanjang terus saat
      // bebek masih nempel (anti-starvation khusus mobile).
      scheduleLettersReturn(1200);
    };

    useImperativeHandle(ref, () => ({
      handleDuckDrop,
      handleDuckSwim,
      duckExpression
    }));

    const word1 = letters.filter((l) => l.wordIdx === 0);
    const word2 = letters.filter((l) => l.wordIdx === 1);

    const renderLetter = (letter: LetterData) => {
      const isGrabbed = activeGrabbedId === letter.id;
      const phaseDelay = (letter.wordIdx * 7 + letter.letterIdx) * 0.18;

      return (
        <motion.div
          key={letter.id}
          id={`letter-${letter.id}`}
          drag
          dragMomentum={false}
          dragElastic={0}
          onDragStart={() => handleLetterDragStart(letter.id)}
          onDragEnd={(e, info) => handleLetterDragEnd(letter.id, e, info)}
          style={{ touchAction: 'none' }}
          animate={{
            x: letter.posX,
            y: isGrabbed ? letter.posY - 28 : letter.posY,
            rotate: isGrabbed ? (letter.letterIdx % 2 === 0 ? 6 : -6) : letter.wobble,
            scale: isGrabbed ? 1.22 : 1,
            zIndex: isGrabbed ? 60 : 20
          }}
          transition={{
            type: 'spring',
            stiffness: 170,
            damping: 17,
            mass: 0.8
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 1.25 }}
          className="relative inline-block cursor-grab active:cursor-grabbing select-none p-1 sm:p-2.5 mx-0.5 sm:mx-1.5 md:mx-2.5 pointer-events-auto"
        >
          <motion.div
            animate={
              isGrabbed
                ? { y: 0, rotate: 0 }
                : {
                  y: [0, -7, 0, 6, 0],
                  rotate: [0, -1.2, 0, 1.2, 0]
                }
            }
            transition={{
              repeat: Infinity,
              duration: 3.8,
              delay: phaseDelay,
              ease: 'easeInOut'
            }}
            className="relative"
          >
            <span
              className="absolute top-1 sm:top-2 left-0.5 text-[40px] min-[390px]:text-[48px] sm:text-7xl md:text-8xl font-black text-[#041c33] tracking-tight select-none pointer-events-none"
              aria-hidden="true"
            >
              {letter.char}
            </span>
            <span
              className="absolute top-0.5 sm:top-1.5 left-0.5 text-[40px] min-[390px]:text-[48px] sm:text-7xl md:text-8xl font-black text-[#0a5b85] tracking-tight select-none pointer-events-none"
              aria-hidden="true"
            >
              {letter.char}
            </span>
            <span
              className="absolute top-0.5 left-0 text-[40px] min-[390px]:text-[48px] sm:text-7xl md:text-8xl font-black text-[#1288b0] tracking-tight select-none pointer-events-none"
              aria-hidden="true"
            >
              {letter.char}
            </span>

            <span className="relative z-10 block text-[40px] min-[390px]:text-[48px] sm:text-7xl md:text-8xl font-black text-white tracking-tight">
              {letter.char}
            </span>
          </motion.div>
        </motion.div>
      );
    };

    return (
      <div className="relative z-20 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-y-0.5 sm:gap-y-0 gap-x-4 sm:gap-x-8 md:gap-x-10 py-1 sm:py-6 max-w-full px-1">
          <div className="flex items-center justify-center">
            {word1.map(renderLetter)}
          </div>
          <div className="flex items-center justify-center">
            {word2.map(renderLetter)}
          </div>
        </div>
      </div>
    );
  }
);

HeroPhysicsStage.displayName = 'HeroPhysicsStage';
