import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  withText = false
}) => {
  const sizeMap = {
    sm: { img: 'w-11 h-11', text: 'text-xs' },
    md: { img: 'w-14 h-14', text: 'text-sm' },
    lg: { img: 'w-20 h-20', text: 'text-base' },
    xl: { img: 'w-32 h-32', text: 'text-lg' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center transition-transform group-hover:scale-105 select-none">
        <img
          src="/FL.png"
          alt="Frans Lampard Logo"
          className={`${currentSize.img} object-cover rounded-xl drop-shadow-md`}
          loading="eager"
        />
      </div>

      {withText && (
        <div className="flex flex-col text-left">
          <span className={`font-bold text-white tracking-wide leading-tight drop-shadow-sm ${currentSize.text}`}>
            Frans Lampard
          </span>
          <span className="text-[11px] text-[#fff3df] font-mono font-medium flex items-center gap-1 drop-shadow-xs">
            &gt;_ AppSec Engineer
          </span>
        </div>
      )}
    </div>
  );
};
