import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface TactileButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'sand' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

// Konstanta style & motion button — nilai sama persis, diekstrak tanpa ubah visual.
const TACTILE_BASE_STYLES = 'inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-colors select-none cursor-pointer';

const TACTILE_VARIANT_STYLES: Record<NonNullable<TactileButtonProps['variant']>, string> = {
  primary: 'bg-[#1288b0] hover:bg-[#0a5b85] text-white border border-[#7fd4ef] shadow-md shadow-[#0a5b85]/30',
  secondary: 'bg-[#0a3f38] hover:bg-[#0e4f45] text-[#f8fafc] border border-[#1e7d6f] hover:border-[#f3d9ae]/70',
  sand: 'bg-[#f3d9ae] hover:bg-[#f7e3bd] text-[#0b2420] border border-[#d9b382] font-semibold',
  ghost: 'bg-transparent hover:bg-[#0a3f38] text-[#cbd5e1] hover:text-[#f8fafc] border border-transparent hover:border-[#1e7d6f]'
};

const TACTILE_HOVER_Y = -2;
const TACTILE_TAP_SCALE = 0.96;
const TACTILE_SPRING = { type: 'spring' as const, stiffness: 400, damping: 20 };

export const TactileButton: React.FC<TactileButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = TACTILE_BASE_STYLES;

  const variantStyles = TACTILE_VARIANT_STYLES;

  return (
    <motion.button
      whileHover={{ y: TACTILE_HOVER_Y }}
      whileTap={{ scale: TACTILE_TAP_SCALE }}
      transition={TACTILE_SPRING}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
