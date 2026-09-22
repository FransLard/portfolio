import React, { useRef, useState } from 'react';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { OceanHeroCanvas } from './OceanHeroCanvas';
import type { OceanHeroHandle } from './OceanHeroCanvas';
import { HeroPhysicsStage } from './HeroPhysicsStage';
import type { HeroPhysicsStageHandle } from './HeroPhysicsStage';
import { SwimmingDuck } from './SwimmingDuck';
import type { DuckExpression } from './SwimmingDuck';
import { FlyingSeagull } from './FlyingSeagull';
import { BeachCrab } from './BeachCrab';
import type { BeachCrabHandle } from './BeachCrab';
import { BeachHumans } from './BeachHumans';
import { BeachDecorations } from './BeachDecorations';
import { TactileButton } from '../ui/TactileButton';
import { scrollToSectionLenis } from '../../hooks/useLenisSmoothScroll';
import { profileData } from '../../data/portfolioData';

// Konstanta tabrakan bebek-kepiting — nilai sama persis, diekstrak tanpa ubah gameplay.
const DUCK_CRAB_COLLISION_DX = 60;
const DUCK_CRAB_COLLISION_DY = 48;
const DUCK_IMPACT_RESET_MS = 2000;
const COLLISION_COOLDOWN_MS = 3200;
const DUCK_SPLASH_INTENSITY = 1.3;
const DUCK_SWIM_RIPPLE_SIZE = 45;

export const HeroSection: React.FC = () => {
  const oceanRef = useRef<OceanHeroHandle | null>(null);
  const stageRef = useRef<HeroPhysicsStageHandle | null>(null);
  const crabRef = useRef<BeachCrabHandle | null>(null);
  const [duckExpression, setDuckExpression] = useState<DuckExpression>('normal');

  const collisionCooldownRef = useRef<boolean>(false);

  const handleSplash = (clientX: number, clientY: number, intensity: number) => {
    if (oceanRef.current) {
      oceanRef.current.triggerSplash(clientX, clientY, intensity);
    }
  };

  const handleRipple = (clientX: number, clientY: number, size?: number) => {
    if (oceanRef.current) {
      oceanRef.current.triggerRipple(clientX, clientY, size);
    }
  };

  const checkDuckCrabCollision = (duckRect: DOMRect) => {
    if (collisionCooldownRef.current || !crabRef.current) return;
    const crabRect = crabRef.current.getCrabRect();
    if (!crabRect) return;

    const duckCenterX = duckRect.left + duckRect.width / 2;
    const duckCenterY = duckRect.top + duckRect.height / 2;
    const crabCenterX = crabRect.left + crabRect.width / 2;
    const crabCenterY = crabRect.top + crabRect.height / 2;

    const dx = Math.abs(duckCenterX - crabCenterX);
    const dy = Math.abs(duckCenterY - crabCenterY);

    if (dx < DUCK_CRAB_COLLISION_DX && dy < DUCK_CRAB_COLLISION_DY) {
      collisionCooldownRef.current = true;
      crabRef.current.triggerStun(duckCenterX < crabCenterX ? 'right' : 'left');
      setDuckExpression('impact');

      setTimeout(() => {
        setDuckExpression('normal');
      }, DUCK_IMPACT_RESET_MS);

      setTimeout(() => {
        collisionCooldownRef.current = false;
      }, COLLISION_COOLDOWN_MS);
    }
  };

  const handleDuckDrop = (clientX: number, clientY: number, velocity: number, duckRect?: DOMRect) => {
    if (duckRect) {
      checkDuckCrabCollision(duckRect);
    }

    if (stageRef.current) {
      stageRef.current.handleDuckDrop(clientX, clientY, velocity);
    } else {
      handleSplash(clientX, clientY, velocity);
    }
  };

  const handleDuckSwim = (duckX: number, duckY: number) => {
    if (stageRef.current) {
      stageRef.current.handleDuckSwim(duckX, duckY);
    } else {
      handleRipple(duckX, duckY, DUCK_SWIM_RIPPLE_SIZE);
    }
  };

  const handleScrollToProjects = () => {
    scrollToSectionLenis('projects');
  };

  return (
    <section className="relative w-full max-w-[100vw] h-screen min-h-[700px] flex flex-col justify-between pt-16 pb-10 overflow-hidden overflow-x-clip select-none">
      <div className="absolute -inset-px z-0 pointer-events-auto overflow-hidden">
        <OceanHeroCanvas ref={oceanRef} />
      </div>

      <FlyingSeagull />

      <SwimmingDuck
        expression={duckExpression}
        onDuckDrop={handleDuckDrop}
        onDuckSwim={handleDuckSwim}
        onDuckSplash={(x, y) => handleSplash(x, y, DUCK_SPLASH_INTENSITY)}
        onDuckWaddle={checkDuckCrabCollision}
      />

      <BeachCrab ref={crabRef} />

      <BeachHumans />

      <BeachDecorations />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col items-center justify-center -translate-y-16 sm:-translate-y-24">
        <div className="w-full flex flex-col items-center text-center">
          <HeroPhysicsStage
            ref={stageRef}
            onSplash={handleSplash}
            onRipple={handleRipple}
            onDuckExpressionChange={setDuckExpression}
          />

          <p className="mt-3 sm:mt-4 max-w-xl text-center text-xs sm:text-base text-[#f8fafc] font-medium leading-relaxed drop-shadow-md px-2">
            Aspiring Application Security Engineer. Review source code, uji OWASP Top 10, dan kunci celah sebelum rilis ke produksi.
          </p>

          <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 px-2">
            <TactileButton
              variant="primary"
              onClick={handleScrollToProjects}
              icon={<ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            >
              Lihat Proyek
            </TactileButton>

            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#052e4f] hover:bg-[#0a5b85] text-[#f8fafc] border border-[#2e9cc4] hover:border-[#f3d9ae]/70 font-medium text-xs sm:text-sm transition-all select-none cursor-pointer hover:-translate-y-0.5"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f3d9ae]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
