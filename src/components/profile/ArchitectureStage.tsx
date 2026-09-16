import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2 } from 'lucide-react';

interface ArchitectureStageProps {
  isFlooded: boolean;
}

export const ArchitectureStage: React.FC<ArchitectureStageProps> = ({ isFlooded }) => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: 'web',
      icon: <Code2 className="w-5 h-5 text-[#0e9384]" />,
      title: 'Web App Security',
      subtitle: 'OWASP Top 10 & Secure Code Review',
      desc: 'Saya belajar menguji keamanan aplikasi web lewat lab (PortSwigger Academy, DVWA) dan proyek sendiri: mengenali pola XSS dan SQLi, menelusuri validasi input di source code, dan memakai Burp Suite + OWASP ZAP untuk pengujian manual dasar. Setiap temuan saya petakan ke OWASP Top 10 supaya perbaikannya jelas.',
      tags: ['OWASP Top 10', 'Burp Suite', 'OWASP ZAP', 'Secure Code Review', 'XSS', 'SQLi', 'File Upload']
    },
    {
      id: 'linux',
      icon: <Terminal className="w-5 h-5 text-[#8a5a24]" />,
      title: 'Linux & Secure Deploy',
      subtitle: 'Hardening, Docker & Secret Hygiene',
      desc: 'Saya membiasakan hardening dasar sebelum aplikasi naik produksi: SSH key-only, permission file yang ketat, Docker user non-root dengan image minimal, dan secret via environment variable, bukan hardcoded di repo. Dipraktikkan langsung di proyek sendiri, termasuk Velard Tools yang live.',
      tags: ['Linux Hardening', 'SSH & Permissions', 'Docker Non-Root', 'Gitleaks', 'Security Headers', 'Bash CLI']
    }
  ];

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  return (
    <motion.div
      animate={
        isFlooded
          ? {
            rotate: isMobile ? 3 : 15,
            x: isMobile ? 0 : 28,
            y: isMobile ? 16 : 50,
            scale: 0.98,
            transition: { type: 'spring', stiffness: 150, damping: 16 }
          }
          : {
            rotate: 0,
            x: 0,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 260, damping: 18 }
          }
      }
      className="w-full flex flex-col gap-6"
    >

      <div className="grid grid-cols-2 gap-2.5 p-1.5 rounded-2xl bg-[#fffffb] border border-[#ecd7b0] shadow-sm">
        {pillars.map((pillar, idx) => (
          <motion.button
            key={pillar.id}
            type="button"
            onClick={() => setActivePillar(idx)}
            animate={
              isFlooded
                ? {
                  rotate: idx === 0 ? -18 : idx === 1 ? 20 : -22,
                  y: idx === 0 ? 14 : idx === 1 ? -16 : 20,
                  x: idx === 0 ? -8 : idx === 1 ? 8 : 12
                }
                : { rotate: 0, y: 0, x: 0 }
            }
            className={`flex flex-col items-center justify-center p-3 rounded-xl text-center transition-all cursor-pointer ${activePillar === idx
              ? 'bg-[#0e9384] text-white shadow-md'
              : 'hover:bg-[#fff3df] text-[#475569] hover:text-[#0f172a]'
              }`}
          >
            <span
              className={`text-xs font-mono font-bold block ${activePillar === idx ? 'text-white' : 'text-[#8a5a24]'
                }`}
            >
              0{idx + 1}
            </span>
            <span className="text-xs font-bold leading-tight mt-0.5">
              {pillar.id.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="relative min-h-[305px] sm:min-h-[315px] rounded-[32px] bg-[#fffffb] border border-[#ecd7b0] shadow-xl shadow-[#8a5a24]/6 overflow-hidden">
        <motion.div
          key={activePillar}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="p-7 sm:p-9 h-full flex flex-col justify-between space-y-5"
        >
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-[#fff3df] border border-[#ecd0a0] shadow-sm shrink-0">
                  {pillars[activePillar].icon}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#8a5a24]">
                    0{activePillar + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] mt-0.5">
                    {pillars[activePillar].title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm sm:text-base text-[#475569] leading-relaxed">
              {pillars[activePillar].desc}
            </p>
          </div>

          <div className="pt-4 border-t border-[#ecd7b0]">
            <span className="text-xs font-mono font-bold text-[#8a5a24] block mb-2.5">
              TECH STACK:
            </span>
            <div className="flex flex-wrap gap-2">
              {pillars[activePillar].tags.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 rounded-xl bg-[#fff3df] text-xs font-mono font-semibold text-[#0f172a] border border-[#ecd0a0] shadow-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <motion.div
          animate={
            isFlooded
              ? { rotate: -24, x: -38, y: 70, scale: 0.94 }
              : { rotate: 0, x: 0, y: 0, scale: 1 }
          }
          transition={{ type: 'spring', stiffness: 160, damping: 15 }}
          className="p-4 rounded-2xl bg-[#fffffb] border border-[#ecd7b0] shadow-sm"
        >
          <span className="text-xs font-bold text-[#0f172a] block">
            Secure by Default
          </span>
          <p className="text-[11px] text-[#64748b] mt-1 leading-relaxed">
            Deny-by-default: akses ditutup dulu, dibuka seperlunya per role.
          </p>
        </motion.div>

        <motion.div
          animate={
            isFlooded
              ? { rotate: 32, x: 18, y: 80, scale: 0.93 }
              : { rotate: 0, x: 0, y: 0, scale: 1 }
          }
          transition={{ type: 'spring', stiffness: 160, damping: 15 }}
          className="p-4 rounded-2xl bg-[#fffffb] border border-[#ecd7b0] shadow-sm"
        >
          <span className="text-xs font-bold text-[#0f172a] block">
            Auth & Access Proof
          </span>
          <p className="text-[11px] text-[#64748b] mt-1 leading-relaxed">
            Di proyek sendiri, tiap endpoint saya cek: ownership dan role sebelum data dikembalikan.
          </p>
        </motion.div>

        <motion.div
          animate={
            isFlooded
              ? { rotate: -18, x: 48, y: -20, scale: 0.95 }
              : { rotate: 0, x: 0, y: 0, scale: 1 }
          }
          transition={{ type: 'spring', stiffness: 160, damping: 15 }}
          className="p-4 rounded-2xl bg-[#fffffb] border border-[#ecd7b0] shadow-sm"
        >
          <span className="text-xs font-bold text-[#0f172a] block">
            Hardened Deploy
          </span>
          <p className="text-[11px] text-[#64748b] mt-1 leading-relaxed">
            SSH key-only, Docker non-root, secret via env, dan security headers terpasang.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
