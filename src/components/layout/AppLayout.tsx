import React, { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Bookmark } from 'lucide-react';
import { cn } from '@/utils/cn';
import { LegalNotice } from '@/components/ui/LegalNotice';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { SavedCombinations } from '@/components/features/SavedCombinations';
import { useAppStore } from '@/store/useAppStore';
import { logger } from '@/utils/logger';
import type { WordCategory, RetreatWord } from '@/data/retreatWords';

interface AppLayoutProps {
  children: ReactNode;
  currentCombination?: Record<WordCategory, RetreatWord>;
}

export function AppLayout({ children, currentCombination }: AppLayoutProps) {
  const [isLegalNoticeOpen, setIsLegalNoticeOpen] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const { saveCombination, savedCombinations } = useAppStore();

  const handleShare = async () => {
    if (!currentCombination) return;

    const text = Object.values(currentCombination).join('-');
    const shareText = `Check out this amazing retreat concept: ${text}! 🧘‍♀️✨ https://retreat-roulette.com/`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Retreat Roulette',
          text: shareText,
          url: 'https://retreat-roulette.com/',
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        // TODO: Show toast notification
        logger.info('Copied to clipboard');
      }
    } catch (error) {
      logger.error('Error sharing', { error });
    }
  };

  const handleSave = () => {
    if (!currentCombination) return;
    saveCombination(currentCombination);
    setShowSaved(true);
    // TODO: Show toast notification
    logger.info('Combination saved');
  };

  return (
    <motion.div 
      className="relative flex flex-col items-center justify-between w-full h-[100dvh] bg-purple-900 text-yellow-400 p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Sound Toggle */}
      <SoundToggle />

      {/* Header */}
      <header className="w-full text-center">
        <h1 className="text-4xl font-bold">RETREAT ROULETTE</h1>
        <p className="text-lg italic">Can you handle the sacred randomness?</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        {children}
        <AnimatePresence>
          {showSaved && (
            <SavedCombinations 
              className="max-w-lg"
              onClose={() => setShowSaved(false)}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn flex items-center gap-2"
            onClick={handleShare}
            disabled={!currentCombination}
          >
            <Share2 size={20} />
            SHARE
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "btn flex items-center gap-2",
              savedCombinations.some(
                combo => 
                  currentCombination && 
                  Object.values(combo.words).join('-') === Object.values(currentCombination).join('-')
              ) && "text-yellow-300"
            )}
            onClick={handleSave}
            disabled={!currentCombination}
          >
            <Bookmark size={20} />
            SAVE
          </motion.button>
        </div>

        <div className="flex justify-between items-center text-sm">
          <button
            onClick={() => setShowSaved(prev => !prev)}
            className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
          >
            {showSaved ? 'Hide Saved' : `Saved (${savedCombinations.length})`}
          </button>
          <button
            onClick={() => setIsLegalNoticeOpen(true)}
            className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
          >
            Legal Notice
          </button>
        </div>
      </footer>

      {/* Legal Notice Modal */}
      <LegalNotice
        isOpen={isLegalNoticeOpen}
        onClose={() => setIsLegalNoticeOpen(false)}
      />
    </motion.div>
  );
} 