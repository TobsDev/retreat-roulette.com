import React from 'react';
import { motion } from 'framer-motion';

interface ReelProps {
  spinning: boolean;
  onSpinComplete: () => void;
  selectedWord: string;
}

export const Reel: React.FC<ReelProps> = ({
  spinning,
  onSpinComplete,
  selectedWord,
}) => {
  return (
    <div className="relative w-full h-full bg-purple-950 border border-yellow-400/30 rounded overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-lg font-medium"
        animate={{
          y: spinning ? ["0%", "-100%"] : "0%"
        }}
        transition={{
          duration: spinning ? 0.5 : 0,
          ease: "easeInOut",
          repeat: spinning ? 5 : 0,
        }}
        onAnimationComplete={onSpinComplete}
      >
        <span className="text-center px-2">{selectedWord}</span>
      </motion.div>
    </div>
  );
}; 