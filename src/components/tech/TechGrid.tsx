import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import type { Project, TechItem, TechLayer } from '../../types/portfolio';
import { techStackData, projectsData } from '../../data/portfolioData';
import { PipelineFlowPresets, type FlowDomainId } from './PipelineFlowPresets';
import { PipelineNodeLayer } from './PipelineNodeLayer';
import { PipelineInspector } from './PipelineInspector';
import { TechBeachDecorations } from './TechBeachDecorations';

interface TechGridProps {
  onOpenProject?: (project: Project) => void;
}

export const TechGrid: React.FC<TechGridProps> = ({ onOpenProject }) => {
  const [activeDomain, setActiveDomain] = useState<FlowDomainId>('all');
  const [selectedLayer, setSelectedLayer] = useState<TechLayer>('client');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const clientTech = techStackData.filter((t) => t.layer === 'client');
  const backendTech = techStackData.filter((t) => t.layer === 'backend');
  const databaseTech = techStackData.filter((t) => t.layer === 'database');
  const devopsTech = techStackData.filter((t) => t.layer === 'devops');

  const handleSelectDomain = (domain: FlowDomainId) => {
    setActiveDomain(domain);
    setSelectedTech(null);

    if (domain === 'web') {
      setSelectedLayer('client');
    } else if (domain === 'backend') {
      setSelectedLayer('backend');
    } else if (domain === 'devops') {
      setSelectedLayer('devops');
    }
  };

  const handleSelectTech = (tech: TechItem) => {
    setSelectedTech(tech);
    setSelectedLayer(tech.layer);
  };

  const handleSelectLayer = (layer: TechLayer) => {
    setSelectedLayer(layer);
    setSelectedTech(null);
  };

  const handleSelectProject = (projectId: string) => {
    const targetProject = projectsData.find((p) => p.id === projectId);
    if (targetProject && onOpenProject) {
      onOpenProject(targetProject);
    }
  };

  return (
    <section id="stack" className="relative z-20 -mt-1 w-full bg-[#fff3df] select-none">

      <TechBeachDecorations />

      <div className="relative z-10 pt-28 pb-24 max-w-7xl mx-auto px-6 sm:px-12">

        <div className="space-y-4 pb-8 border-b-2 border-[#0f172a]/15">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#ffc53d] text-[#0f172a] text-xs font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] w-fit">
            <span>03</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.08]">
                Tech Stack & Tools
              </h2>
              <p className="text-sm sm:text-base font-medium text-[#475569] mt-2 max-w-2xl leading-relaxed">
                Tools yang saya pakai untuk belajar audit, review kode, dan mengamankan deploy, dari Burp/ZAP sampai hardening Linux.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#fffffb] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] shrink-0 self-start lg:self-auto">
              <Layers className="w-4 h-4 text-[#0e9384]" />
              <span className="text-xs font-mono font-bold text-[#0f172a]">
                {techStackData.length} Tools & Frameworks
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <PipelineFlowPresets
            activeDomain={activeDomain}
            onSelectDomain={handleSelectDomain}
          />
        </div>

        <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs font-mono font-bold text-[#64748b] uppercase tracking-wider pb-1 sm:pb-0">
            <span>Daftar Kategori &amp; Layer</span>
            <span className="text-[10px] sm:text-xs text-[#64748b]">
              <span className="sm:hidden">Tap kartu atau icon untuk detail</span>
              <span className="hidden sm:inline">Klik kartu atau icon untuk melihat detail</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

            <PipelineNodeLayer
              layerId="client"
              stepNumber="01"
              title="Frontend"
              subtitle="Client UI"
              roleDescription="Memeriksa sisi klien: pola XSS, open redirect, dan auth state di browser."
              techItems={clientTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'client'}
            />

            <PipelineNodeLayer
              layerId="backend"
              stepNumber="02"
              title="Backend"
              subtitle="Server & API"
              roleDescription="Memeriksa sisi server: pola IDOR, session, rate limit, dan validasi input."
              techItems={backendTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'backend'}
            />

            <PipelineNodeLayer
              layerId="database"
              stepNumber="03"
              title="Database"
              subtitle="Data & Storage"
              roleDescription="Membiasakan penyimpanan aman: privilege minimal dan query parameterized."
              techItems={databaseTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'database'}
            />

            <PipelineNodeLayer
              layerId="devops"
              stepNumber="04"
              title="Linux"
              subtitle="Docker • Git • Environment"
              roleDescription="Membiasakan hardening Linux, Docker non-root, dan secret yang tidak bocor di Git."
              techItems={devopsTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'devops'}
            />
          </div>
        </div>

        <div className="mt-10">
          <PipelineInspector
            selectedTech={selectedTech}
            selectedLayer={selectedLayer}
            activeDomain={activeDomain}
            onClearTechSelection={() => setSelectedTech(null)}
            onSelectProject={handleSelectProject}
          />
        </div>
      </div>
    </section>
  );
};
