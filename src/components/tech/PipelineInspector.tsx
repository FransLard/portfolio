import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
  Lock,
  Terminal,
  Activity
} from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFlutter,
  SiPython,
  SiLaravel,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiDocker,
  SiLinux,
  SiGit,
  SiVercel
} from '@icons-pack/react-simple-icons';
import type { TechItem, TechLayer } from '../../types/portfolio';
import { projectsData } from '../../data/portfolioData';
import type { FlowDomainId } from './PipelineFlowPresets';

const iconMap: Record<string, React.FC<{ size?: number; color?: string; className?: string }>> = {
  react: SiReact,
  nextdotjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  flutter: SiFlutter,
  python: SiPython,
  laravel: SiLaravel,
  nodejs: SiNodedotjs,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  firebase: SiFirebase,
  prisma: SiPrisma,
  docker: SiDocker,
  linux: SiLinux,
  git: SiGit,
  vercel: SiVercel
};

interface PipelineInspectorProps {
  selectedTech: TechItem | null;
  selectedLayer: TechLayer;
  activeDomain: FlowDomainId;
  onClearTechSelection: () => void;
  onSelectProject: (projectId: string) => void;
}

const layerDetailsMap: Record<
  TechLayer,
  {
    title: string;
    subtitle: string;
    description: string;
    guarantees: string[];
    role: string;
  }
> = {
  client: {
    title: 'Frontend',
    subtitle: 'Client UI',
    description:
      'Saya memeriksa halaman web dari sisi browser: pola XSS tersimpan maupun terpantul, validasi input yang lolos, auth state di localStorage, dan security headers yang kurang. Dipelajari lewat lab dan proyek sendiri, lalu dicek manual memakai Burp dan ZAP.',
    guarantees: [
      'Cek XSS & open redirect',
      'Review auth state klien',
      'Uji storage & headers'
    ],
    role: 'Client-Side Security'
  },
  backend: {
    title: 'Backend & Server',
    subtitle: 'Server & API',
    description:
      'Fokus ke API dan server: memahami pola IDOR, broken access control, JWT/session yang lemah, rate limit login, dan validasi schema. Saya baca source Laravel langsung di proyek booking-gedung, menguji endpoint satu per satu, lalu mencatat rekomendasi perbaikannya.',
    guarantees: [
      'Uji IDOR & auth bypass',
      'Review JWT & session',
      'Rate limit & validasi input'
    ],
    role: 'API & Auth Security'
  },
  database: {
    title: 'Database',
    subtitle: 'MySQL & Query Aman',
    description:
      'Saya membiasakan praktik database yang aman di MySQL: user dengan privilege minimal dan query berparameter via ORM, bukan string concat. Prinsipnya least privilege: akses dibuka seperlunya per role.',
    guarantees: [
      'Audit role & privilege',
      'Least privilege per service',
      'Query parameterized anti-SQLi'
    ],
    role: 'Data & Access Control'
  },
  devops: {
    title: 'Linux',
    subtitle: 'Linux • Docker • Git',
    description:
      'Saya membiasakan pengamanan mesin dan pipeline: SSH key-only, audit permission file, Docker non-root dengan image minimal, dan secret lewat env agar tidak tersimpan di Git.',
    guarantees: [
      'Hardening SSH & permission',
      'Docker non-root & secret hygiene',
      'Git aman tanpa credential'
    ],
    role: 'Hardening & Secure Deploy'
  }
};

export const PipelineInspector: React.FC<PipelineInspectorProps> = ({
  selectedTech,
  selectedLayer,
  activeDomain,
  onClearTechSelection,
  onSelectProject
}) => {
  const layerInfo = layerDetailsMap[selectedLayer];

  if (activeDomain === 'cybersecurity') {
    return (
      <motion.div
        id="pipeline-inspector"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="p-7 sm:p-9 rounded-[32px] bg-[#fffffb] border-2 border-[#0f172a] shadow-[8px_8px_0px_#0f172a] space-y-6 select-none"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#0f172a]/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border-2 border-[#0f172a] flex items-center justify-center shadow-[3px_3px_0px_#0f172a] bg-[#fee2e2] text-[#dc2626]">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
                  Cyber Security
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-[#fee2e2] text-[#dc2626] border border-[#dc2626]">
                  COMING SOON
                </span>
              </div>

              <div className="text-xs font-mono text-[#0e9384] font-bold mt-0.5">
                Riset & Eksplorasi Keamanan Siber
              </div>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-[#fee2e2] border border-[#dc2626] text-xs font-mono font-bold text-[#dc2626] self-start sm:self-auto flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Tahap Persiapan</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b]">
            Fokus Eksplorasi
          </div>
          <p className="text-sm sm:text-base text-[#1e293b] font-medium leading-relaxed bg-[#fff3df]/60 p-4 rounded-2xl border border-[#0f172a]/20">
            Bidang keamanan siber yang sedang dipersiapkan mencakup Web Application Security (OWASP Top 10), Network Traffic Analysis, Capture The Flag (CTF), dan Linux System Security.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0b6e63]">
            Domain yang Dipersiapkan
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-[#fff3df] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-black text-[#0f172a]">
                <Lock className="w-4 h-4 text-[#dc2626]" />
                <span>Web App Security</span>
              </div>
              <p className="text-xs text-[#475569] font-medium">
                Vulnerability testing, pencegahan XSS/SQLi, dan audit otentikasi.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fff3df] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-black text-[#0f172a]">
                <Terminal className="w-4 h-4 text-[#0e9384]" />
                <span>Network Analysis</span>
              </div>
              <p className="text-xs text-[#475569] font-medium">
                Port scanning, inspeksi paket jaringan, dan firewall.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fff3df] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-black text-[#0f172a]">
                <Activity className="w-4 h-4 text-[#16a34a]" />
                <span>Linux Security</span>
              </div>
              <p className="text-xs text-[#475569] font-medium">
                Hardening izin sistem, manajemen SSH, dan isolasi proses.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (selectedTech) {
    const Icon = iconMap[selectedTech.iconKey];
    const relatedProjects = projectsData.filter((p) =>
      selectedTech.projectLinks?.includes(p.id)
    );

    return (
      <motion.div
        id="pipeline-inspector"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="p-7 sm:p-9 rounded-[32px] bg-[#fffffb] border-2 border-[#0f172a] shadow-[8px_8px_0px_#0f172a] space-y-6 select-none"
      >

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#0f172a]/10">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl border-2 border-[#0f172a] flex items-center justify-center shadow-[3px_3px_0px_#0f172a] bg-[#fff3df]"
              style={{ color: selectedTech.color }}
            >
              {Icon ? (
                <Icon size={30} color={selectedTech.color} />
              ) : (
                <Code2 className="w-7 h-7 text-[#0f172a]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
                  {selectedTech.name}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-[#ffc53d] text-[#0f172a] border border-[#0f172a]">
                  {selectedTech.roleTag || selectedTech.category}
                </span>
              </div>

              <div className="text-xs font-mono text-[#0e9384] font-bold mt-0.5">
                Kategori: {layerInfo.title}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClearTechSelection}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-[#fdeed3] hover:bg-[#ffc53d] text-xs font-mono font-bold text-[#0f172a] border border-[#0f172a] transition-colors cursor-pointer"
          >
            &larr; Lihat Detail Kategori
          </button>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#64748b]">
            Penggunaan
          </div>
          <p className="text-sm sm:text-base text-[#1e293b] font-medium leading-relaxed bg-[#fff3df]/60 p-4 rounded-2xl border border-[#0f172a]/20">
            {selectedTech.usageContext}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0b6e63]">
              Digunakan di Proyek
            </span>
            <span className="text-[11px] font-mono text-[#64748b]">
              {relatedProjects.length} Proyek Terkait
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj.id)}
                className="p-4 rounded-2xl bg-[#fff3df] hover:bg-[#ffc53d] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_#0f172a] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#64748b] uppercase pb-1">
                    <span>{proj.category === 'fullstack' ? 'Web System' : 'Mobile App'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0f172a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <h4 className="text-sm font-black text-[#0f172a] tracking-tight group-hover:text-[#0e9384] transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-xs text-[#334155] line-clamp-2 mt-1 font-medium leading-tight">
                    {proj.summary}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#0f172a]/15 text-[11px] font-mono font-bold text-[#0e9384]">
                  {proj.role.split('(')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      id="pipeline-inspector"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="p-7 sm:p-9 rounded-[32px] bg-[#fffffb] border-2 border-[#0f172a] shadow-[8px_8px_0px_#0f172a] space-y-6 select-none"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-[#0f172a]/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-[#0e9384] text-white text-xs font-mono font-black border border-[#0f172a]">
              DETAIL KATEGORI
            </span>
            <span className="text-xs font-mono font-bold text-[#64748b] uppercase">
              {layerInfo.role}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight mt-1.5">
            {layerInfo.title}
          </h3>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-[#fff3df] border border-[#0f172a] text-xs font-mono font-bold text-[#0f172a] self-start sm:self-auto">
          {layerInfo.subtitle}
        </div>
      </div>

      <p className="text-sm sm:text-base text-[#334155] font-medium leading-relaxed">
        {layerInfo.description}
      </p>

      <div className="space-y-2.5 pt-1">
        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#0b6e63]">
          Fokus Utama
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {layerInfo.guarantees.map((guarantee, idx) => (
            <div
              key={idx}
              className="p-3 rounded-2xl bg-[#fff3df] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] flex items-center gap-2.5 text-xs font-mono font-bold text-[#0f172a]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
              <span>{guarantee}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
