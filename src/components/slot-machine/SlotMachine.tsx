import React from 'react';
import { motion } from 'framer-motion';

export function SlotMachine() {
  return (
    <div className="relative w-full max-w-lg aspect-[4/3] bg-black/20 rounded-lg border-2 border-yellow-400/50 p-4">
      {/* Reels Container */}
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* TODO: Replace with actual Reel components */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div 
            key={i}
            className="bg-purple-950 border border-yellow-400/30 rounded flex items-center justify-center"
          >
            <span className="text-lg">Reel {i + 1}</span>
          </div>
        ))}
      </div>

      {/* Lever - TODO: Make interactive */}
      <motion.div 
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-8 h-32 bg-yellow-400 rounded-full cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
    </div>
  );
} 