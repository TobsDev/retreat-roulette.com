import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Heart } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useAppStore } from '@/store/useAppStore';

interface SavedCombinationsProps {
  className?: string;
  onClose?: () => void;
}

export function SavedCombinations({ className, onClose }: SavedCombinationsProps) {
  const { savedCombinations, removeSavedCombination } = useAppStore();

  if (savedCombinations.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className={cn(
        "w-full bg-purple-950/50 border border-yellow-400/30 rounded-lg p-4 mt-4",
        "overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Saved Combinations</h3>
        <button
          onClick={onClose}
          className="text-yellow-400/70 hover:text-yellow-400 transition-colors"
        >
          Hide
        </button>
      </div>
      
      <div className="space-y-2">
        {savedCombinations.map((combo) => (
          <motion.div
            key={combo.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between p-2 bg-purple-950/30 rounded"
          >
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-yellow-400/70" />
              <span>
                {Object.values(combo.words).join('-')}
              </span>
            </div>
            <button
              onClick={() => removeSavedCombination(combo.id)}
              className="text-yellow-400/50 hover:text-yellow-400 transition-colors"
              aria-label="Remove saved combination"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 