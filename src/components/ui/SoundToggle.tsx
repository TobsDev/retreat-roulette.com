import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useAppStore } from '@/store/useAppStore';

interface SoundToggleProps {
  className?: string;
}

export function SoundToggle({ className }: SoundToggleProps) {
  const { isSoundEnabled, toggleSound } = useAppStore();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleSound}
      className={cn(
        "fixed top-4 right-4 text-yellow-400 hover:text-yellow-300",
        "w-8 h-8 flex items-center justify-center",
        className
      )}
      aria-label={isSoundEnabled ? "Disable sound" : "Enable sound"}
    >
      {isSoundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </motion.button>
  );
} 