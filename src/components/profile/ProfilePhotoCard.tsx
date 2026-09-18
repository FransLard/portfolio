import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { profileData } from '../../data/portfolioData';
import { useCardTilt } from '../../hooks/useCardTilt';

interface ProfilePhotoCardProps {
  isFlooded: boolean;
}

const strapTexture =
  'repeating-linear-gradient(180deg, #0e9384 0 5px, #fffffb 5px 7px, #ecd7b0 7px 12px, #0b6e63 12px 13px)';

const woodTexture =
  'repeating-linear-gradient(93deg, rgba(63,42,20,0.28) 0 2px, transparent 2px 7px)';

const barcodeTexture =
  'repeating-linear-gradient(90deg, #0f172a 0 2px, transparent 2px 4px, #0f172a 4px 5px, transparent 5px 8px, #0f172a 8px 11px, transparent 11px 13px)';

const pearlStyle = {
  background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #fbcfe8 55%, #94a3b8 100%)'
} as const;

export const ProfilePhotoCard: React.FC<ProfilePhotoCardProps> = ({ isFlooded }) => {
  const { tiltProps } = useCardTilt(6);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  return (
    <motion.div
      animate={
        isFlooded
          ? {
              rotate: isMobile ? -5 : -24,
              x: isMobile ? 0 : -32,
              y: isMobile ? 20 : 70,
              scale: isMobile ? 0.98 : 0.94,
              transition: { type: 'spring', stiffness: 160, damping: 16 }
            }
          : {
              rotate: 0,
              x: 0,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 260, damping: 18 }
            }
      }
      className="relative w-full flex flex-col items-center lg:items-start gap-6"
    >

      <motion.div
        animate={isFlooded ? { rotate: 0 } : { rotate: [-2.2, 2.2, -2.2] }}
        transition={isFlooded ? { duration: 0.3 } : { repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
        style={{ transformOrigin: '50% 0%' }}
        className="w-full max-w-sm flex flex-col items-center"
      >

        <div className="relative z-0 h-36 w-56 shrink-0" aria-hidden="true">

          <div
            className="absolute left-1/2 top-0 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#5b3a1e]/50 shadow-md"
            style={{ background: 'linear-gradient(180deg, #d9b382 0%, #b08968 55%, #8a5a24 100%)' }}
          >
            <div
              className="absolute inset-0 rounded-full opacity-70"
              style={{ backgroundImage: woodTexture }}
            />
            <div
              className="relative h-4 w-4 rounded-full border border-[#3f2a14] shadow"
              style={{ background: 'radial-gradient(circle at 35% 30%, #e9cf8f 0%, #8a5a24 70%)' }}
            />
          </div>

          <div className="absolute left-1/2 top-9 h-[120px] w-10 origin-top -translate-x-[26px] rotate-[13deg] rounded-b-lg bg-[#0b6e63] p-[3px] shadow-md">
            <div
              className="relative h-full w-full rounded-b-md"
              style={{ backgroundImage: strapTexture }}
            >
              <span className="absolute bottom-1 left-[4px] top-1 border-l-2 border-dashed border-white/70" />
              <span className="absolute bottom-1 right-[4px] top-1 border-l-2 border-dashed border-white/70" />
            </div>
          </div>

          <div className="absolute left-1/2 top-9 h-[120px] w-10 origin-top -translate-x-[14px] rotate-[-13deg] rounded-b-lg bg-[#0b6e63] p-[3px] shadow-md">
            <div
              className="relative h-full w-full rounded-b-md"
              style={{ backgroundImage: strapTexture }}
            >
              <span className="absolute bottom-1 left-[4px] top-1 border-l-2 border-dashed border-white/70" />
              <span className="absolute bottom-1 right-[4px] top-1 border-l-2 border-dashed border-white/70" />
            </div>
          </div>
        </div>

        <div
          {...tiltProps}
          className="relative z-10 -mt-12 w-full rounded-[32px] p-3.5 bg-[#fffffb] border border-[#ecd7b0] shadow-2xl shadow-[#8a5a24]/8 group cursor-pointer"
        >

          <span className="absolute left-[5px] top-[5px] z-10 h-2.5 w-2.5 rounded-full border border-[#0f172a]/20 shadow-sm" style={pearlStyle} />
          <span className="absolute right-[5px] top-[5px] z-10 h-2.5 w-2.5 rounded-full border border-[#0f172a]/20 shadow-sm" style={pearlStyle} />
          <span className="absolute bottom-[5px] left-[5px] z-10 h-2.5 w-2.5 rounded-full border border-[#0f172a]/20 shadow-sm" style={pearlStyle} />
          <span className="absolute bottom-[5px] right-[5px] z-10 h-2.5 w-2.5 rounded-full border border-[#0f172a]/20 shadow-sm" style={pearlStyle} />

          <div className="absolute -top-2.5 left-1/2 z-10 flex h-5 w-24 -translate-x-1/2 items-center justify-center rounded-full border border-[#5b3a1e]/50 bg-gradient-to-b from-[#e9cf8f] to-[#8a5a24] shadow-md">
            <div className="h-2.5 w-[72px] rounded-full bg-[#0f172a]/85 shadow-inner" />
          </div>

          <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden bg-[#fdeed3] border-2 border-[#0f172a]/70 flex items-center justify-center">
            <img
              src={profileData.avatarUrl || '/avatar.svg'}
              alt={profileData.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/avatar.svg';
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-transparent to-transparent opacity-65 pointer-events-none" />

            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#fffffb] border border-[#ecd7b0] shadow-sm">
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-sm font-bold text-[#0f172a]">
                    {profileData.name}
                  </div>
                  <div className="text-xs text-[#8a5a24] font-mono mt-0.5">
                    {profileData.education}
                  </div>
                </div>
                <div className="ml-auto shrink-0 text-right">
                  <div
                    className="h-7 w-16 rounded-sm border border-[#0f172a]/20 bg-white"
                    style={{ backgroundImage: barcodeTexture }}
                  />
                  <div className="mt-0.5 text-[9px] font-mono font-bold text-[#8a5a24]">
                    ID FL-2026
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 px-2 flex items-center justify-between text-[11px] font-mono text-[#8a5a24]">
            <span>FOTO PROFIL</span>
            <span
              className="h-3 w-3 rounded-full border border-[#0f172a]/30 shadow-sm"
              style={{ background: 'conic-gradient(#f87171, #ffc53d, #4ade80, #38bdf8, #f87171)' }}
            />
            <span>ID</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={isFlooded ? { rotate: 12, x: 24, y: 30 } : { rotate: 0, x: 0, y: 0 }}
        className="w-full max-w-sm p-4 rounded-2xl bg-[#fffffb] border border-[#ecd7b0] flex items-center justify-between text-xs font-mono text-[#0f172a] shadow-sm"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#8a5a24]" />
          <span>Indonesia</span>
        </div>
        <span className="text-[#0e9384] font-bold">AppSec / Security Lab</span>
      </motion.div>
    </motion.div>
  );
};
