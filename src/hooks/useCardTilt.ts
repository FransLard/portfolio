import { useState, useCallback, useRef } from 'react';

// Konstanta tilt — nilai sama persis, diekstrak tanpa ubah visual.
const TILT_PERSPECTIVE_PX = 1000;
const TILT_TRANSITION_HOVER = 'transform 0.1s ease-out';
const TILT_TRANSITION_IDLE = 'transform 0.5s ease-out';

export function useCardTilt(maxRotation: number = 7) {
  const [rotation, setRotation] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxRotation;
    const rotateY = ((x - centerX) / centerX) * maxRotation;

    setRotation({ x: rotateX, y: rotateY });
  }, [maxRotation]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  }, []);

  return {
    cardRef,
    rotation,
    isHovered,
    tiltProps: {
      ref: cardRef,
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      style: {
        transform: `perspective(${TILT_PERSPECTIVE_PX}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: isHovered ? TILT_TRANSITION_HOVER : TILT_TRANSITION_IDLE
      }
    }
  };
}
