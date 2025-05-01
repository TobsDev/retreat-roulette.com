import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Share2 } from 'lucide-react';
import { useRetreatStore } from '../store/useRetreatStore';
import { buttonVariants } from '../utils/animations';
import { playSound } from '../utils/sound';
import { logger } from '../utils/logger';

export const SavedCombinations: React.FC = () => {
  const { savedCombinations, deleteCombination, soundEnabled } = useRetreatStore();

  useEffect(() => {
    logger.info('SavedCombinations mounted', { 
      totalCombinations: savedCombinations.length 
    });
  }, [savedCombinations.length]);

  if (savedCombinations.length === 0) {
    return null;
  }

  const handleShare = async (words: string) => {
    logger.info('Sharing saved combination', { combination: words });
    const text = `Retreat Roulette\nhttps://retreat-roulette.com/\nCheck out this amazing retreat concept: ${words}! 🧘‍♀️✨`;

    if (navigator.share) {
      try {
        logger.debug('Using Web Share API');
        await navigator.share({ text });
      } catch (error) {
        logger.error('Error sharing saved combination', { error });
      }
    } else {
      logger.debug('Using clipboard fallback');
      await navigator.clipboard.writeText(text);
    }
    playSound('CLICK', soundEnabled);
  };

  const handleDelete = (id: string) => {
    logger.info('Deleting saved combination', { id });
    deleteCombination(id);
    playSound('CLICK', soundEnabled);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Saved Combinations</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {savedCombinations.map((combo) => (
          <motion.div
            key={combo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 flex flex-col gap-2"
          >
            <p className="text-lg font-medium">
              {combo.words.map(w => w.text).join('-')}
            </p>
            <div className="flex justify-between items-center text-sm text-white/60">
              <span>
                {new Date(combo.timestamp).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <motion.button
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleShare(combo.words.map(w => w.text).join('-'))}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Share combination"
                >
                  <Share2 size={18} />
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  initial="idle"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleDelete(combo.id)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-red-400"
                  aria-label="Delete combination"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 