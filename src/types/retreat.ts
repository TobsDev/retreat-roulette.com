export type RetreatWord = {
  id: string;
  text: string;
  category: RetreatCategory;
};

export type RetreatCategory = 'activity' | 'style' | 'focus' | 'location';

export type RetreatCombination = {
  id: string;
  words: RetreatWord[];
  timestamp: number;
};

export type ReelState = {
  isSpinning: boolean;
  selectedWordIndex: number;
};

export type RetreatRouletteState = {
  reels: ReelState[];
  savedCombinations: RetreatCombination[];
  isSpinning: boolean;
  soundEnabled: boolean;
}; 