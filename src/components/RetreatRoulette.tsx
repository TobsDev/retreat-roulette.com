import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Share2, Save } from 'lucide-react';
import { useRetreatStore } from '../store/useRetreatStore';
import { allWords } from '../data/retreatWords';
import { playSound, stopAllSounds } from '../utils/sound';
import { buttonVariants, reelVariants } from '../utils/animations';
import { RetreatWord } from '../types/retreat';
import { logger } from '../utils/logger';

export const RetreatRoulette: React.FC = () => {
  const { reels, isSpinning, soundEnabled, spin, stopSpinning, saveCombination, toggleSound } = useRetreatStore();
  const [selectedWords, setSelectedWords] = useState<RetreatWord[]>([]);

  useEffect(() => {
    logger.info('RetreatRoulette component mounted');
    return () => {
      logger.info('RetreatRoulette component unmounting');
      stopAllSounds();
    };
  }, []);

  const handleSpin = () => {
    if (isSpinning) {
      logger.debug('Spin attempted while already spinning');
      return;
    }
    
    logger.info('Starting spin', { soundEnabled });
    playSound('SPIN', soundEnabled);
    spin();

    // Simulate random spinning duration for each reel
    const categories = Object.keys(allWords) as (keyof typeof allWords)[];
    const newWords: RetreatWord[] = [];

    categories.forEach((category, index) => {
      const words = allWords[category];
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * words.length);
        newWords[index] = words[randomIndex];
        
        if (index === categories.length - 1) {
          logger.info('Spin completed', { 
            selectedWords: newWords.map(w => w.text),
            soundEnabled 
          });
          setSelectedWords(newWords);
          stopSpinning();
          playSound('STOP', soundEnabled);
        }
      }, 1000 + (index * 500));
    });
  };

  const handleShare = async () => {
    if (!selectedWords.length) {
      logger.warn('Share attempted with no selected words');
      return;
    }

    const text = `Retreat Roulette\nhttps://retreat-roulette.com/\nCheck out this amazing retreat concept: ${selectedWords.map(w => w.text).join('-')}! 🧘‍♀️✨`;

    if (navigator.share) {
      try {
        logger.info('Sharing via Web Share API');
        await navigator.share({ text });
      } catch (error) {
        logger.error('Error sharing via Web Share API', { error });
      }
    } else {
      logger.info('Sharing via clipboard');
      await navigator.clipboard.writeText(text);
    }
    playSound('CLICK', soundEnabled);
  };

  const handleSave = () => {
    if (!selectedWords.length) {
      logger.warn('Save attempted with no selected words');
      return;
    }
    logger.info('Saving combination', { 
      combination: selectedWords.map(w => w.text) 
    });
    saveCombination(selectedWords);
    playSound('CLICK', soundEnabled);
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <div className="flex flex-col items-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl shadow-xl">
        <div className="grid grid-cols-4 gap-4">
          {reels.map((reel, index) => (
            <motion.div
              key={index}
              className="h-24 w-32 bg-white/10 rounded-lg overflow-hidden flex items-center justify-center text-center p-2"
              variants={reelVariants}
              animate={reel.isSpinning ? 'spinning' : 'stopped'}
            >
              <span className="text-lg font-bold">
                {selectedWords[index]?.text || '???'}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4">
          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={handleSpin}
            disabled={isSpinning}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold shadow-lg disabled:opacity-50"
          >
            {isSpinning ? 'Spinning...' : 'Spin!'}
          </motion.button>

          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={toggleSound}
            className="p-3 bg-white/10 rounded-lg"
            aria-label="Toggle sound"
          >
            {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
          </motion.button>
        </div>
      </div>

      {selectedWords.length > 0 && (
        <div className="flex gap-4">
          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg"
          >
            <Share2 size={20} />
            Share
          </motion.button>

          <motion.button
            variants={buttonVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg"
          >
            <Save size={20} />
            Save
          </motion.button>
        </div>
      )}
    </div>
  );
}; 