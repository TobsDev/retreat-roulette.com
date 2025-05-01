import React, { useState, useEffect } from 'react';
import { Reel } from '../ui/Reel';
import { allWords } from '../../data/retreatWords';
import { useRetreatStore } from '../../store/useRetreatStore';
import type { RetreatWord } from '../../types/retreat';

const CATEGORIES = ['activity', 'style', 'focus', 'location'] as const;
type WordCategory = typeof CATEGORIES[number];

const getRandomWord = (category: WordCategory): RetreatWord => {
  const words = allWords[category];
  return words[Math.floor(Math.random() * words.length)];
};

interface SlotMachineProps {
  onCombinationChange?: (combination: Record<WordCategory, RetreatWord>) => void;
}

export const SlotMachine: React.FC<SlotMachineProps> = ({ onCombinationChange }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentWords, setCurrentWords] = useState<Record<WordCategory, RetreatWord>>({
    activity: getRandomWord('activity'),
    style: getRandomWord('style'),
    focus: getRandomWord('focus'),
    location: getRandomWord('location'),
  });

  useEffect(() => {
    onCombinationChange?.(currentWords);
  }, [currentWords, onCombinationChange]);

  const handleSpin = () => {
    setIsSpinning(true);
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      {CATEGORIES.map((category) => (
        <Reel
          key={category}
          spinning={isSpinning}
          selectedWord={currentWords[category].text}
          onSpinComplete={() => {
            setCurrentWords(prev => ({
              ...prev,
              [category]: getRandomWord(category)
            }));
            setIsSpinning(false);
          }}
        />
      ))}
      <button onClick={handleSpin} disabled={isSpinning}>
        Spin
      </button>
    </div>
  );
}; 