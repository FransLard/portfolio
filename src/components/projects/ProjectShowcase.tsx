import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { projectsData } from '../../data/portfolioData';
import { FlagshipSlideCard } from './FlagshipProjectParallax';
import { FilteredProjectDock } from './FilteredProjectDock';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';

interface ProjectShowcaseProps {
  onOpenProject?: (project: Project) => void;
}

const SlideProgressBar: React.FC<{
  progress: MotionValue<number>;
  index: number;
  total: number;
}> = ({ progress, index, total }) => {
  const scaleX = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0, 1],
    { clamp: true }
  );
  return (
    <motion.div
      className="h-full bg-[#1288b0]"
      style={{ scaleX, transformOrigin: 'left' }}
    />
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onOpenProject }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [localActiveProject, setLocalActiveProject] = useState<Project | null>(null);

  const handleSelect = onOpenProject || setLocalActiveProject;
  const activeProject = onOpenProject ? null : localActiveProject;

  const flagshipProjects = projectsData.filter((p) => p.featured);
  const totalSlides = flagshipProjects.length + 1;
  const sectionHeight = totalSlides <= 4 ? '560vh' : `${140 * totalSlides + 20}vh`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 20,
    mass: 0.3,
    restDelta: 0.0005
  });

  const ySlide2 = useTransform(smoothProgress, [0.14, 0.26], ['100%', '0%'], { clamp: true });
  const ySlide3 = useTransform(smoothProgress, [0.31, 0.43], ['100%', '0%'], { clamp: true });
  const ySlide4 = useTransform(smoothProgress, [0.48, 0.60], ['100%', '0%'], { clamp: true });
  const ySlide5 = useTransform(smoothProgress, [0.65, 0.77], ['100%', '0%'], { clamp: true });
  const yDock = useTransform(smoothProgress, [0.82, 0.94], ['100%', '0%'], { clamp: true });
  const flagshipMotions = [null, ySlide2, ySlide3, ySlide4, ySlide5];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[#fff3df] select-none"
      style={{ height: sectionHeight }}
    >

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        <div className="absolute top-[76px] sm:top-24 right-4 sm:right-12 z-50 flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-[#fffffb] border-2 border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] sm:shadow-[4px_4px_0px_#0f172a]">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <div
              key={idx}
              className="h-2 sm:h-2.5 rounded-full bg-[#fdeed3] border border-[#0f172a] overflow-hidden w-5 sm:w-10"
            >
              <SlideProgressBar progress={smoothProgress} index={idx} total={totalSlides} />
            </div>
          ))}
        </div>

        {flagshipProjects.map((project, idx) => (
          <FlagshipSlideCard
            key={project.id}
            project={project}
            index={idx}
            total={flagshipProjects.length}
            yMotion={idx === 0 ? '0%' : flagshipMotions[idx] ?? yDock}
            depthLevel={((idx % 3) + 1) as 1 | 2 | 3}
            onSelectProject={handleSelect}
          />
        ))}

        <motion.div
          style={{ y: yDock, zIndex: 40 + flagshipProjects.length * 10 }}
          className="absolute inset-0 w-full h-full bg-[#052e4f] shadow-[0_-8px_24px_rgba(15,23,42,0.35)]"
        >
          <FilteredProjectDock
            projects={projectsData}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProject={handleSelect}
          />
        </motion.div>
      </div>

      {!onOpenProject && activeProject && (
        <ProjectCaseStudyModal
          project={activeProject}
          isOpen={!!activeProject}
          onClose={() => setLocalActiveProject(null)}
        />
      )}
    </section>
  );
};
