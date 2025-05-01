import React from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { cn } from '@/utils/cn';
import { logger } from '@/utils/logger';

export interface LeverProps {
  className?: string;
  onPull: () => void;
  disabled?: boolean;
}

export const Lever: React.FC<LeverProps> = ({ className, onPull, disabled = false }) => {
  const y = useMotionValue(0);
  const rotation = useTransform(y, [0, 100], [0, 45]);
  
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (disabled) return;
    
    logger.debug('Lever drag end', { offset: info.offset.y });
    
    if (info.offset.y > 50) {
      onPull();
    }
    
    y.set(0);
  };

  return (
    <motion.div 
      className={cn(
        "absolute right-0 top-1/2 -translate-y-1/2 translate-x-full",
        "w-8 h-32 cursor-grab active:cursor-grabbing",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{ originY: 0 }}
    >
      {/* Lever Base */}
      <div className="absolute top-0 right-4 w-4 h-4 rounded-full bg-yellow-600" />
      
      {/* Lever Handle */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 100 }}
        dragElastic={0.3}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        style={{ y, rotateZ: rotation }}
        className="absolute top-0 right-0 w-8 h-32 bg-yellow-400 rounded-full 
                 shadow-lg origin-top"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
    </motion.div>
  );
}; 