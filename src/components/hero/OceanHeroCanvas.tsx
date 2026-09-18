import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface OceanHeroHandle {
  triggerSplash: (x: number, y: number, intensity?: number) => void;
  triggerRipple: (x: number, y: number, size?: number) => void;
}

interface SplashDroplet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  gravity: number;
}

interface WaterRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  speed: number;
}

interface Shark {
  active: boolean;
  initialized: boolean;
  x: number;
  y: number;
  dir: 1 | -1;
  speed: number;
  nextSpawn: number;
  lastWake: number;
  diving: number;
}

export const OceanHeroCanvas = forwardRef<OceanHeroHandle, { className?: string }>(
  ({ className = '' }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dropletsRef = useRef<SplashDroplet[]>([]);
    const ripplesRef = useRef<WaterRipple[]>([]);
    const sharkRef = useRef<Shark>({ active: true, initialized: false, x: 0, y: 0, dir: 1, speed: 110, nextSpawn: 0, lastWake: 0, diving: 0 });
    const animRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);
    const startRef = useRef<number>(0);

    const triggerSplash = (clientX: number, clientY: number, intensity: number = 1) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Batasi interaksi hanya di area air (jauh di atas garis pantai 0.68)
      // agar ripple tidak spawn di pasir
      if (y > rect.height * 0.60) return;

      ripplesRef.current.push({
        x,
        y,
        radius: 6,
        maxRadius: Math.min(260, rect.width * 0.45) * Math.max(0.7, intensity),
        alpha: 0.95,
        speed: 3.6 * Math.max(0.6, intensity)
      });

      ripplesRef.current.push({
        x,
        y,
        radius: 2,
        maxRadius: Math.min(180, rect.width * 0.3) * Math.max(0.7, intensity),
        alpha: 0.7,
        speed: 2.2 * Math.max(0.6, intensity)
      });

      const count = Math.floor(32 * Math.min(2.5, intensity));
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        const speed = (3.2 + Math.random() * 6.5) * Math.min(2, intensity);
        dropletsRef.current.push({
          x: x + (Math.random() - 0.5) * 12,
          y: y + (Math.random() - 0.5) * 12,
          vx: Math.cos(angle) * speed * 0.85,
          vy: -Math.abs(Math.sin(angle) * speed * 1.5) - 3.5 * intensity,
          radius: 1.8 + Math.random() * 3.0,
          alpha: 1,
          decay: 0.018 + Math.random() * 0.02,
          gravity: 0.28
        });
      }
    };

    const triggerRipple = (clientX: number, clientY: number, size: number = 75) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      // Batasi interaksi hanya di area air agar gelombang tidak sampai ke pasir
      if (y > rect.height * 0.60) return;

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius: size,
        alpha: 0.55,
        speed: 1.9
      });
    };

    useImperativeHandle(ref, () => ({
      triggerSplash,
      triggerRipple
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let isRunning = true;
      let isVisible = true;
      const sizeRef = { w: 0, h: 0 };
      const isMobile = window.innerWidth < 640;

      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5);

      const handleResize = () => {
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        sizeRef.w = rect.width;
        sizeRef.h = rect.height;
        canvas.width = Math.ceil(rect.width * dpr);
        canvas.height = Math.ceil(rect.height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      handleResize();
      window.addEventListener('resize', handleResize);

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      observer.observe(canvas);

      let lastFrame = 0;

      const frameInterval = isMobile ? 33 : 16;

      const render = (now: number = 0) => {
        if (!isRunning || !canvas) return;
        animRef.current = requestAnimationFrame(render);
        if (!isVisible) return;
        if (now - lastFrame < frameInterval) return;
        lastFrame = now;
        const width = sizeRef.w;
        const height = sizeRef.h;
        if (!width || !height) return;

        if (!startRef.current) startRef.current = now;
        const elapsedSec = (now - startRef.current) / 1000;

        const rockTilt = Math.sin((elapsedSec * Math.PI * 2) / 3.2) * 0.035;

        ctx.clearRect(0, 0, width, height);
        timeRef.current += 0.014;
        const t = timeRef.current;

        const shoreBaseY = height * 0.68;
        const tidalCycle = (Math.sin(t * 0.22) + 1) * 0.5;
        const tideAmplitude = 18;

        const getTideY = (x: number) => {
          return shoreBaseY + tidalCycle * tideAmplitude + Math.sin(x * 0.0045 + t * 0.5) * 8 + Math.cos(x * 0.009 - t * 0.3) * 4;
        };

        const oceanGrad = ctx.createLinearGradient(0, 0, 0, shoreBaseY);
        oceanGrad.addColorStop(0, '#052e4f');
        oceanGrad.addColorStop(0.35, '#0a5b85');
        oceanGrad.addColorStop(0.70, '#1288b0');
        oceanGrad.addColorStop(1, '#35b6b2');
        ctx.fillStyle = oceanGrad;
        // Overdraw 4px di tiap sisi agar tidak ada garis tepi / gap sub-pixel di mobile
        ctx.fillRect(-4, -4, width + 8, height + 8);

        ctx.save();
        ctx.globalAlpha = 0.07;
        ctx.fillStyle = '#dff3ff';
        for (let i = 0; i < 4; i++) {
          const patchX = (width * 0.25 * i + Math.sin(t * 0.15 + i) * 20) % width;
          const patchY = height * 0.32 + (i % 2) * (height * 0.12);
          ctx.beginPath();
          ctx.ellipse(patchX, patchY, 120, 45, Math.PI / 8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        const wave1Y = height * 0.26;
        ctx.save();
        ctx.beginPath();
        for (let x = -8; x <= width + 8; x += 8) {
          const cy = wave1Y + Math.sin(x * 0.005 + t * 0.45) * 12 + Math.cos(x * 0.009 - t * 0.3) * 5;
          if (x <= -8) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.8;
        ctx.stroke();
        ctx.restore();

        const wave2Y = height * 0.45;
        ctx.save();
        ctx.beginPath();
        for (let x = -8; x <= width + 8; x += 8) {
          const cy = wave2Y + Math.sin(x * 0.006 + t * 0.55 + 1.5) * 14 + Math.sin(x * 0.012 - t * 0.25) * 6;
          if (x <= -8) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.lineWidth = 2.2;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(-4, height + 4);
        ctx.lineTo(-4, getTideY(0));
        for (let x = 0; x <= width + 4; x += 8) {
          ctx.lineTo(x, getTideY(x));
        }
        ctx.lineTo(width + 4, height + 4);
        ctx.closePath();
        ctx.fillStyle = '#f4e3bb';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        for (let x = -8; x <= width + 8; x += 8) {
          const cy = getTideY(x);
          if (x <= -8) ctx.moveTo(x, cy + 2);
          else ctx.lineTo(x, cy + 2);
        }
        ctx.strokeStyle = '#d9bd8a';
        ctx.lineWidth = 4.0;
        ctx.stroke();

        ctx.beginPath();
        for (let x = -8; x <= width + 8; x += 8) {
          const cy = getTideY(x);
          if (x <= -8) ctx.moveTo(x, cy);
          else ctx.lineTo(x, cy);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.98)';
        ctx.lineWidth = 3.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();

        for (let x = 0; x < width + 8; x += 16) {
          const cy = getTideY(x);
          const bubbleSpread = (Math.sin(x * 0.06 + t * 0.8) + 1) * 3 + 1;
          ctx.beginPath();
          ctx.arc(x + Math.sin(t * 0.8 + x) * 2, cy + bubbleSpread, 1.6 + Math.sin(x * 0.3) * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
          ctx.fill();
        }
        ctx.restore();

        const sh = sharkRef.current;

        const isNarrow = width < 640;
        if (!sh.initialized) {
          sh.initialized = true;
          sh.dir = 1;
          sh.x = isNarrow ? width * 0.5 : width * 0.22;
          sh.y = isNarrow ? height * 0.22 : height * 0.56;
          sh.speed = 95 + Math.random() * 40;
        }

        if (sh.active) {

          const d = 1;
          sh.dir = 1;
          sh.x += sh.speed * 0.014;

          if (sh.x > width + 110) {
            sh.x = -110;
            sh.y = isNarrow ? height * (0.18 + Math.random() * 0.08) : height * (0.52 + Math.random() * 0.1);
          }

          if (sh.diving > 0) sh.diving -= 0.014;

          const diveK = sh.diving > 0 ? 1 : 0;
          const bobY = sh.y + Math.sin(t * 3) * 2 + diveK * 12;
          const sway = Math.sin(t * 7) * 4;
          const tailX = sh.x - d * 42;

          ctx.save();

          ctx.translate(sh.x, bobY);
          ctx.rotate(rockTilt * d);
          ctx.translate(-sh.x, -bobY);
          ctx.globalAlpha = sh.diving > 0 ? 0.35 : 1;

          ctx.globalAlpha = (sh.diving > 0 ? 0.15 : 0.32);
          ctx.fillStyle = '#0b2a3a';
          ctx.beginPath();
          ctx.ellipse(sh.x, bobY + 9, 44, 10, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = sh.diving > 0 ? 0.35 : 1;

          ctx.fillStyle = '#54707f';
          ctx.strokeStyle = '#33454f';
          ctx.lineWidth = 1.5;
          ctx.lineJoin = 'round';
          ctx.beginPath();
          ctx.moveTo(tailX + d * 8, bobY + 4);
          ctx.lineTo(tailX - d * 6, bobY - 18 + sway);
          ctx.lineTo(tailX - d * 1, bobY + 2);
          ctx.lineTo(tailX - d * 8, bobY + 13);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(sh.x + d * 12, bobY + 3);
          ctx.lineTo(sh.x - d * 2, bobY - 24);
          ctx.lineTo(sh.x - d * 14, bobY + 3);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.globalAlpha = (sh.diving > 0 ? 0.3 : 0.75);
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.ellipse(sh.x, bobY + 4, 17, 3.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Clip semua ripple ke area air (di atas garis pantai) agar tidak meluber ke pasir.
        // Dibangun sekali per frame, lalu semua ripple digambar di dalamnya.
        if (ripplesRef.current.length > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(-4, -4);
          ctx.lineTo(width + 4, -4);
          ctx.lineTo(width + 4, getTideY(width + 4));
          for (let x = width; x >= -4; x -= 16) {
            ctx.lineTo(x, getTideY(x));
          }
          ctx.closePath();
          ctx.clip();

          for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
            const r = ripplesRef.current[i];
            r.radius += r.speed;
            r.alpha -= 0.012;

            if (r.alpha <= 0 || r.radius >= r.maxRadius) {
              ripplesRef.current.splice(i, 1);
              continue;
            }

            // Fade-out halus saat tepi bawah ripple mendekati garis pantai
            // agar tidak terpotong kasar oleh clip dan tidak menyentuh pasir.
            const shoreY = getTideY(r.x);
            const distToShore = shoreY - r.y;
            const verticalReach = r.radius * 0.42;
            const shoreFade = Math.max(
              0,
              Math.min(1, (distToShore - verticalReach) / 36)
            );
            if (shoreFade <= 0) {
              ripplesRef.current.splice(i, 1);
              continue;
            }
            const fadeAlpha = r.alpha * shoreFade;

            ctx.beginPath();
            ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.42, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${fadeAlpha * 0.95})`;
            ctx.lineWidth = 2.4;
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(r.x, r.y, r.radius * 0.68, r.radius * 0.28, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(168, 220, 240, ${fadeAlpha * 0.75})`;
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }
          ctx.restore();
        }

        for (let i = dropletsRef.current.length - 1; i >= 0; i--) {
          const d = dropletsRef.current[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += d.gravity;
          d.alpha -= d.decay;

          if (d.alpha <= 0) {
            dropletsRef.current.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${d.alpha})`;
          ctx.fill();
          ctx.restore();
        }
      };

      animRef.current = requestAnimationFrame(render);

      return () => {
        isRunning = false;
        if (animRef.current) cancelAnimationFrame(animRef.current);
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (Math.random() < 0.16) {
        triggerRipple(e.clientX, e.clientY, 65);
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      triggerSplash(e.clientX, e.clientY, 1.4);
    };

    return (
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        className={`w-full h-full block cursor-pointer select-none ${className}`}
      />
    );
  }
);

OceanHeroCanvas.displayName = 'OceanHeroCanvas';
