import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface TactileButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'sand' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-colors select-none cursor-pointer';
  
  const variantStyles = {
    primary: 'bg-[#0e9384] hover:bg-[#0b6e63] text-white border border-[#3ed6a4] shadow-md shadow-[#0e9384]/25',
    secondary: 'bg-[#0a3f38] hover:bg-[#0e4f45] text-[#f8fafc] border border-[#1e7d6f] hover:border-[#f3d9ae]/70',
    sand: 'bg-[#f3d9ae] hover:bg-[#f7e3bd] text-[#0b2420] border border-[#d9b382] font-semibold',
    ghost: 'bg-transparent hover:bg-[#0a3f38] text-[#cbd5e1] hover:text-[#f8fafc] border border-transparent hover:border-[#1e7d6f]'
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
