import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Lock,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { AnimatedOceanSlideBackground } from './AnimatedOceanSlideBackground';

interface FilteredProjectDockProps {
  projects: Project[];
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  onSelectProject: (project: Project) => void;
}

export const FilteredProjectDock: React.FC<FilteredProjectDockProps> = ({
  projects,
  selectedCategory,
  onSelectCategory,
  onSelectProject
}) => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || 'velard-tools');

  const categories: { id: ProjectCategory; label: string; count: number }[] = [
    { id: 'all', label: 'Semua Proyek', count: projects.length },
    {
      id: 'fullstack',
      label: 'Web Security Audit',
      count: projects.filter((p) => p.category === 'fullstack').length
    }
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const activeProject =
    filteredProjects.find((p) => p.id === activeProjectId) || filteredProjects[0] || projects[0];

  return (
    <div className="absolute inset-0 w-full h-full flex flex-col justify-start overflow-hidden select-none">

      <AnimatedOceanSlideBackground depthLevel={4} />

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-16 sm:pt-20 px-4 sm:px-12 flex flex-col gap-1.5 sm:gap-2 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#0f172a] bg-[#ffc53d] px-2 py-0.5 sm:px-3 sm:py-0.5 rounded-lg border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] inline-block mb-1">
              04
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white sm:text-[#0f172a] tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:drop-shadow-none">
              Eksplorasi Proyek &amp; Hasil Rekayasa
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            {categories.map((cat) => {
              const shortLabel =
                cat.id === 'all' ? 'Semua' : 'Web';

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onSelectCategory(cat.id);
                    const nextFiltered =
                      cat.id === 'all' ? projects : projects.filter((p) => p.category === cat.id);
                    if (nextFiltered[0]) setActiveProjectId(nextFiltered[0].id);
                  }}
                  className={`flex items-center justify-center gap-1.5 px-2 py-2 sm:px-3.5 sm:py-1.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-mono font-black transition-all cursor-pointer border-2 border-[#0f172a] w-full sm:w-auto shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-[#0e9384] text-white shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] -translate-y-0.5'
                      : 'bg-[#fffffb] hover:bg-[#fff3df] text-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a] sm:shadow-[2px_2px_0px_#0f172a]'
                  }`}
                >
                  <span className="sm:hidden">{shortLabel}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      selectedCategory === cat.id
                        ? 'bg-white/30 text-white'
                        : 'bg-[#fff3df] text-[#0f172a] border border-[#0f172a]/40'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar py-0.5 w-full shrink-0">
          {filteredProjects.map((project, idx) => {
            const isSelected = activeProject.id === project.id;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProjectId(project.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-[#0f172a] text-xs font-mono transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#ffc53d] text-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] font-black -translate-y-0.5'
                    : 'bg-[#fffffb]/95 hover:bg-[#fff3df] text-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a] font-bold'
                }`}
              >
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-[#0f172a]/10">
                  0{idx + 1}
                </span>
                <span>{project.title}</span>
                {project.isPrivateRepo ? (
                  <Lock className="w-3 h-3 text-[#b91c1c]" />
                ) : (
                  <ExternalLink className="w-3 h-3 text-[#15803d]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-12 mt-1.5 sm:mt-2 flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-12 gap-2.5 sm:gap-4 items-stretch lg:items-start pb-2">

        <div className="hidden lg:flex lg:col-span-5 flex-col justify-start space-y-2 max-h-[46vh] xl:max-h-[50vh] overflow-y-auto pr-1 py-1 scrollbar-thin scrollbar-thumb-[#0e9384] scrollbar-track-[#fffffb]/50">
          {filteredProjects.map((project, idx) => {
            const isSelected = activeProject.id === project.id;

            return (
              <motion.div
                key={project.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveProjectId(project.id)}
                className={`p-2.5 sm:p-3 rounded-[18px] border-2 border-[#0f172a] cursor-pointer transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-[#ffc53d] shadow-[4px_4px_0px_#0f172a] -translate-y-0.5'
                    : 'bg-[#fffffb]/95 hover:bg-[#fff3df] shadow-[2px_2px_0px_#0f172a]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-black text-[#0f172a] bg-[#fffffb] px-1.5 py-0.5 rounded-md border border-[#0f172a]">
                      0{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[#0e9384]">
                      Web Security Audit
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {project.isPrivateRepo ? (
                      <span className="text-[9px] font-mono font-bold text-[#b91c1c] bg-[#fee2e2] px-1.5 py-0.5 rounded-md border border-[#b91c1c]/40 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Private</span>
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.5 rounded-md border border-[#16a34a]/40 flex items-center gap-1">
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span>Open</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-[#0f172a] leading-tight">
                      {project.title}
                    </h4>
                    <p className="text-[10px] font-mono font-bold text-[#8a5a24] mt-0.5">
                      {project.metrics[0]?.value} • {project.metrics[1]?.value}
                    </p>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border border-[#0f172a] transition-transform ${
                      isSelected ? 'bg-[#0e9384] text-white rotate-90' : 'bg-[#fffffb] text-[#0f172a]'
                    }`}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="w-full lg:col-span-7 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="p-3 sm:p-4 rounded-2xl sm:rounded-[24px] bg-[#fffffb] border-2 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] sm:shadow-[6px_6px_0px_#0f172a] flex flex-col justify-between space-y-2 sm:space-y-2.5 max-h-[52vh] lg:max-h-[62vh] overflow-y-auto"
            >

              <div className="space-y-1.5 sm:space-y-2">
                <ProjectPreviewPlaceholder
                  project={activeProject}
                  isMobileFrame={activeProject.category === 'mobile'}
                  className="h-[180px] min-[400px]:h-[200px] sm:h-auto sm:aspect-[16/9] sm:max-h-[190px] lg:max-h-[210px] w-full"
                />

                <div className="pt-1.5 sm:pt-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base sm:text-xl font-black text-[#0f172a]">
                      {activeProject.title}
                    </h4>
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#0e9384] bg-[#e0f2fe] px-2 py-0.5 rounded-lg border border-[#0e9384]/40 shrink-0">
                      {activeProject.role}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] font-mono font-bold text-[#8a5a24] mt-0.5 line-clamp-1">
                    {activeProject.subtitle}
                  </p>
                </div>

                <p className="text-[11px] sm:text-xs text-[#334155] leading-relaxed font-medium line-clamp-2">
                  {activeProject.summary}
                </p>
              </div>

              <div className="hidden sm:grid grid-cols-3 gap-1.5 sm:gap-2">
                {activeProject.metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="p-1 sm:p-2 rounded-lg sm:rounded-xl bg-[#fff3df] border border-[#0f172a]/50 text-center shadow-[1.5px_1.5px_0px_#0f172a] sm:shadow-[2px_2px_0px_#0f172a]"
                  >
                    <div className="text-[8px] sm:text-[9px] font-mono font-bold uppercase text-[#8a5a24] leading-tight">
                      {m.label}
                    </div>
                    <div className="text-[10px] sm:text-xs font-black text-[#0f172a] mt-0.5 leading-tight">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-1.5 sm:pt-2 border-t border-[#ecd0a0] flex items-center justify-between gap-2 sm:gap-3">
                <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                  {activeProject.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-[#fffffb] text-[10px] font-mono font-bold text-[#0f172a] border border-[#0f172a]/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProject(activeProject)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl bg-[#0e9384] hover:bg-[#0b6e63] text-white text-[11px] sm:text-xs font-mono font-black border-2 border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Buka Studi Kasus</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 hidden sm:block sm:h-4 w-full shrink-0" />
    </div>
  );
};
