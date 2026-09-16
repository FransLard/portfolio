import React from 'react';
import { motion, MotionConfig } from 'framer-motion';

const VolleyballPlayer: React.FC = () => {
  return (
    <div className="absolute left-[10%] sm:left-[18%] md:left-[calc(50%-240px)] bottom-10 sm:bottom-16 md:bottom-[80px] z-20 pointer-events-auto select-none scale-[0.6] sm:scale-[0.8] md:scale-100 origin-bottom">
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="relative group cursor-pointer"
      >
        <div className="absolute -bottom-1 left-1 w-12 h-3 bg-[#f7e3bd]/90 rounded-full blur-[2px]" />
        <svg width="64" height="96" viewBox="0 0 64 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">

          <line x1="23" y1="62" x2="20" y2="90" stroke="#e8b07f" strokeWidth="6" strokeLinecap="round" />
          <line x1="33" y1="62" x2="38" y2="90" stroke="#e8b07f" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="19" cy="91" rx="7" ry="3" fill="#0f172a" />
          <ellipse cx="39" cy="91" rx="7" ry="3" fill="#0f172a" />

          <rect x="18" y="52" width="20" height="13" rx="4" fill="#0f172a" />

          <rect x="19" y="30" width="18" height="24" rx="7" fill="#0e9384" stroke="#0b6e63" strokeWidth="1.5" />

          <line x1="20" y1="35" x2="14" y2="46" stroke="#e8b07f" strokeWidth="6" strokeLinecap="round" />

          <g>
            <circle cx="12" cy="52" r="11" fill="#FFFFFF" stroke="#0e9384" strokeWidth="1.5" />
            <path d="M12 41 C13 47, 13 57, 12 63" stroke="#0e9384" strokeWidth="1.5" />
            <path d="M1 52 C7 51, 17 51, 23 52" stroke="#F59E0B" strokeWidth="1.5" />
          </g>

          <line x1="37" y1="35" x2="41" y2="58" stroke="#e8b07f" strokeWidth="6" strokeLinecap="round" />

          <circle cx="28" cy="18" r="11" fill="#f2c9a0" stroke="#d99a68" strokeWidth="1.5" />

          <path d="M17 16 Q18 6 28 6 Q38 6 39 16 Q34 11 28 11 Q22 11 17 16 Z" fill="#0f172a" />

          <circle cx="24" cy="18" r="1.4" fill="#0f172a" />
          <circle cx="32" cy="18" r="1.4" fill="#0f172a" />
          <path d="M25 23 Q28 25.5 31 23" stroke="#0f172a" strokeWidth="1.3" strokeLinecap="round" />
        </svg>

        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-white/95 text-[#0b6e63] text-[11px] font-bold shadow-lg border border-[#0e9384] whitespace-nowrap opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity pointer-events-none">
          Siap servis!
        </span>
      </motion.div>
    </div>
  );
};

const StrollingSurfer: React.FC = () => {
  return (
    <motion.div
      animate={{ x: [0, 26, 0, -20, 0] }}
      transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
      className="absolute right-[8%] sm:right-[12%] bottom-24 sm:bottom-32 md:bottom-[168px] z-20 pointer-events-auto select-none scale-[0.6] sm:scale-[0.8] md:scale-100 origin-bottom"
    >
      <motion.div
        animate={{ y: [0, -2.5, 0] }}
        transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
        className="relative group cursor-pointer"
      >
        <div className="absolute -bottom-1 left-0 w-14 h-3 bg-[#f7e3bd]/90 rounded-full blur-[2px]" />
        <svg width="64" height="98" viewBox="0 0 64 98" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">

          <ellipse cx="10" cy="55" rx="7" ry="30" fill="#F97316" stroke="#EA580C" strokeWidth="1.5" transform="rotate(8 10 55)" />
          <line x1="10" y1="30" x2="10" y2="80" stroke="#fff3df" strokeWidth="2.5" transform="rotate(8 10 55)" />

          <line x1="32" y1="64" x2="29" y2="92" stroke="#e8b07f" strokeWidth="6" strokeLinecap="round" />
          <line x1="42" y1="64" x2="47" y2="92" stroke="#e8b07f" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="28" cy="93" rx="7" ry="3" fill="#0f172a" />
          <ellipse cx="48" cy="93" rx="7" ry="3" fill="#0f172a" />

          <rect x="27" y="54" width="20" height="13" rx="4" fill="#2563eb" />

          <rect x="28" y="32" width="18" height="24" rx="7" fill="#f8fafc" stroke="#0e9384" strokeWidth="1.5" />

          <motion.g
            animate={{ rotate: [-14, 18, -14] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            style={{ transformOrigin: '46px 36px' }}
          >
            <line x1="45" y1="36" x2="56" y2="24" stroke="#e8b07f" strokeWidth="6" strokeLinecap="round" />
          </motion.g>

          <line x1="28" y1="36" x2="14" y2="50" stroke="#e8b07f" strokeWidth="6" strokeLinecap="round" />

          <circle cx="37" cy="20" r="11" fill="#f2c9a0" stroke="#d99a68" strokeWidth="1.5" />
          <path d="M26 18 Q27 8 37 8 Q47 8 48 18 Q43 12 37 12 Q31 12 26 18 Z" fill="#5C3A21" />
          <circle cx="33" cy="20" r="1.4" fill="#0f172a" />
          <circle cx="41" cy="20" r="1.4" fill="#0f172a" />
          <path d="M34 25 Q37 27.5 40 25" stroke="#0f172a" strokeWidth="1.3" strokeLinecap="round" />
        </svg>

        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-white/95 text-[#c2410c] text-[11px] font-bold shadow-lg border border-[#f97316] whitespace-nowrap opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity pointer-events-none">
          hi, saya frans!
        </span>
      </motion.div>
    </motion.div>
  );
};

export const BeachHumans: React.FC = () => {
  return (
    <MotionConfig reducedMotion="user">
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden" aria-hidden>
        <VolleyballPlayer />
        <StrollingSurfer />
      </div>
    </MotionConfig>
  );
};
