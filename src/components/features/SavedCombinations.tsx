import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface SavedCombinationsProps {
  onClose: () => void;
}

export const SavedCombinations: React.FC<SavedCombinationsProps> = ({ onClose }) => {
  const { savedCombinations, removeSavedCombination } = useAppStore();

  if (savedCombinations.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-purple-800 rounded-lg p-6 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Saved Combinations</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="space-y-2">
          {savedCombinations.map((combo, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-purple-700 rounded"
            >
              <span>{Object.values(combo).join('-')}</span>
              <button
                className="text-red-400 hover:text-red-300"
                onClick={() => removeSavedCombination(index.toString())}
                aria-label="delete"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}; 