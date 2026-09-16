import React from 'react';
import { useCardTilt } from '../../hooks/useCardTilt';

interface TactileCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  onClick?: () => void;
}

export const TactileCard: React.FC<TactileCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
  onClick
}) => {
  const { tiltProps } = useCardTilt(maxTilt);

  return (
    <div
      {...tiltProps}
      onClick={onClick}
      className={`bg-[#0a3f38] border border-[#1e7d6f] hover:border-[#f3d9ae]/60 rounded-2xl p-6 transition-colors shadow-lg shadow-black/25 ${className}`}
    >
      {children}
    </div>
  );
};
