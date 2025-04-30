import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { logger } from '@/utils/logger';
import type { RetreatWord } from '@/data/retreatWords';

export interface ReelProps {
  className?: string;
  words: RetreatWord[];
  isSpinning: boolean;
  currentWord: RetreatWord;
  onSpinComplete?: () => void;
}

export function Reel({ 
  className, 
  words, 
  isSpinning, 
  currentWord,
  onSpinComplete 
}: ReelProps) {
  logger.debug('Reel render', { isSpinning, currentWord });

  return (
    <div 
      className={cn(
        "relative w-full h-full bg-purple-950 border border-yellow-400/30 rounded overflow-hidden",
        className
      )}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-lg font-medium"
        animate={{
          y: isSpinning ? ["0%", "-100%"] : "0%"
        }}
        transition={{
          duration: isSpinning ? 0.5 : 0,
          ease: "easeInOut",
          repeat: isSpinning ? 5 : 0,
        }}
        onAnimationComplete={onSpinComplete}
      >
        <span className="text-center px-2">{currentWord}</span>
      </motion.div>
    </div>
  );
} 