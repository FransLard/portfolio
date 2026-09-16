import React, { useState } from 'react';
import { Globe, Smartphone, ExternalLink, Image as ImageIcon } from 'lucide-react';
import type { Project } from '../../types/portfolio';

interface ProjectPreviewPlaceholderProps {
  project: Project;
  className?: string;
  isMobileFrame?: boolean;
}

export const ProjectPreviewPlaceholder: React.FC<ProjectPreviewPlaceholderProps> = ({
  project,
  className = '',
  isMobileFrame = false
}) => {
  const [imageError, setImageError] = useState(false);
  const isMobile = isMobileFrame || project.category === 'mobile';

  const liveUrl = project.demoUrl || project.githubUrl || `https://${project.id}.app`;
  const displayText = liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const hasLiveDemo = Boolean(project.demoUrl);

  return (
    <div
      className={`relative w-full flex flex-col overflow-hidden rounded-[24px] bg-[#fffffb] border-2 border-[#0f172a] shadow-[6px_6px_0px_#0f172a] group/preview ${className}`}
    >

      <div className="flex items-center justify-between px-4 py-2 bg-[#fdeed3] border-b-2 border-[#0f172a] shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-3 h-3 rounded-full bg-[#f87171] border border-[#0f172a] shrink-0" />
          <span className="w-3 h-3 rounded-full bg-[#ffc53d] border border-[#0f172a] shrink-0" />
          <span className="w-3 h-3 rounded-full bg-[#4ade80] border border-[#0f172a] shrink-0" />
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={liveUrl}
            className="ml-2 px-3 py-0.5 rounded-md bg-[#fffffb] border border-[#0f172a]/50 text-[11px] font-mono font-bold text-[#0f172a] truncate max-w-[160px] sm:max-w-[260px] hover:bg-[#fff3df] hover:underline underline-offset-2 transition-colors"
          >
            {displayText}
          </a>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono font-black px-2.5 py-0.5 rounded-md bg-[#ffc53d] text-[#0f172a] border border-[#0f172a] shrink-0">
          {isMobile ? (
            <>
              <Smartphone className="w-3 h-3" />
              <span>FLUTTER NATIVE</span>
            </>
          ) : hasLiveDemo ? (
            <>
              <Globe className="w-3 h-3" />
              <span>LIVE DEMO</span>
            </>
          ) : (
            <>
              <ExternalLink className="w-3 h-3" />
              <span>GITHUB</span>
            </>
          )}
        </div>
      </div>

      <div className="relative w-full flex-1 min-h-0 bg-[#f8fafc] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:14px_14px] flex items-center justify-center overflow-hidden">
        {!imageError && project.imageUrl ? (
          <a
            href={project.imageUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title="Buka screenshot resolusi penuh"
            className="flex w-full h-full items-center justify-center cursor-zoom-in"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              decoding="async"
              draggable={false}
              onError={() => setImageError(true)}
              style={{ imageRendering: 'auto' }}
              className={`max-w-full max-h-full ${
                project.imageFit === 'contain' || isMobile
                  ? 'w-auto h-auto max-h-full object-contain object-center p-3 sm:p-4'
                  : 'w-full h-full object-cover object-top'
              }`}
            />
          </a>
        ) : (

          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className="p-4 rounded-2xl bg-[#e0f2fe] border-2 border-[#0f172a] text-[#0e9384] shadow-[3px_3px_0px_#0f172a] group-hover/preview:scale-110 transition-transform">
              <ImageIcon className="w-8 h-8" />
            </div>

            <div>
              <div className="text-base font-black text-[#0f172a] tracking-tight">
                {project.title}
              </div>
              <p className="text-xs font-mono font-bold text-[#0e9384] mt-0.5">
                Preview Screenshot Proyek
              </p>
            </div>

            <div className="text-[11px] font-mono text-[#64748b] bg-[#fffffb] px-3 py-1 rounded-lg border border-[#0f172a]/30">
              {project.stack.slice(0, 3).join(' • ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
