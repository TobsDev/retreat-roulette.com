import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { logger } from '@/utils/logger';
import { Reel } from '@/components/ui/Reel';
import { Lever } from '@/components/ui/Lever';
import { retreatWords, type WordCategory, type RetreatWord, getWordsForCategory } from '@/data/retreatWords';
import { audioManager } from '@/utils/audio';
import { useAppStore } from '@/store/useAppStore';

export interface SlotMachineProps {
  className?: string;
  onCombinationChange?: (combination: Record<WordCategory, RetreatWord>) => void;
}

export function SlotMachine({ className, onCombinationChange }: SlotMachineProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentWords, setCurrentWords] = useState<Record<WordCategory, RetreatWord>>({
    ACTIVITY: retreatWords.ACTIVITY[0],
    THEME: retreatWords.THEME[0],
    FOCUS: retreatWords.FOCUS[0],
    SETTING: retreatWords.SETTING[0],
  });
  const { isSoundEnabled } = useAppStore();

  useEffect(() => {
    onCombinationChange?.(currentWords);
  }, [currentWords, onCombinationChange]);

  const getRandomWord = (category: WordCategory): RetreatWord => {
    const words = getWordsForCategory(category);
    return words[Math.floor(Math.random() * words.length)];
  };

  const handlePull = useCallback(() => {
    if (isSpinning) return;

    logger.info('Starting spin');
    setIsSpinning(true);
    
    if (isSoundEnabled) {
      audioManager.play('LEVER_PULL');
      audioManager.play('REEL_SPIN');
    }

    // Generate new words
    const newWords: Record<WordCategory, RetreatWord> = {
      ACTIVITY: getRandomWord('ACTIVITY'),
      THEME: getRandomWord('THEME'),
      FOCUS: getRandomWord('FOCUS'),
      SETTING: getRandomWord('SETTING'),
    };

    // Update after spin animation
    setTimeout(() => {
      setCurrentWords(newWords);
      setIsSpinning(false);
      if (isSoundEnabled) {
        audioManager.play('WIN');
      }
      logger.info('Spin complete', { result: newWords });
    }, 2500);
  }, [isSpinning, isSoundEnabled]);

  return (
    <motion.div 
      className={cn(
        "relative w-full max-w-lg aspect-[4/3] bg-black/20 rounded-lg border-2 border-yellow-400/50 p-4",
        className
      )}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      {/* Reels Container */}
      <div className="grid grid-cols-2 gap-4 h-full">
        {(Object.keys(retreatWords) as WordCategory[]).map((category) => (
          <Reel
            key={category}
            words={getWordsForCategory(category)}
            isSpinning={isSpinning}
            currentWord={currentWords[category]}
          />
        ))}
      </div>

      {/* Lever */}
      <Lever onPull={handlePull} disabled={isSpinning} />
    </motion.div>
  );
} 