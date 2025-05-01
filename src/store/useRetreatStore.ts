import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { RetreatWord } from '../types/retreat';
import { allWords } from '../data/retreatWords';
import { logger } from '../utils/logger';

export interface SavedCombination {
  id: string;
  words: RetreatWord[];
  timestamp: number;
}

export interface RetreatStore {
  reels: Array<{
    isSpinning: boolean;
    selectedWordIndex: number;
  }>;
  isSpinning: boolean;
  soundEnabled: boolean;
  savedCombinations: SavedCombination[];
  spin: () => void;
  stopSpinning: () => void;
  saveCombination: (words: RetreatWord[]) => void;
  deleteCombination: (id: string) => void;
  toggleSound: () => void;
}

const INITIAL_STATE: RetreatRouletteState = {
  reels: Object.keys(allWords).map(() => ({
    isSpinning: false,
    selectedWordIndex: 0,
  })),
  savedCombinations: [],
  isSpinning: false,
  soundEnabled: true,
};

export const useRetreatStore = create<RetreatStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      spin: () => {
        logger.info('Starting spin');
        set({ 
          isSpinning: true, 
          reels: INITIAL_STATE.reels.map(reel => ({ ...reel, isSpinning: true })) 
        });
      },
      stopSpinning: () => {
        logger.info('Stopping spin');
        set({ 
          isSpinning: false, 
          reels: INITIAL_STATE.reels.map(reel => ({ ...reel, isSpinning: false })) 
        });
      },
      saveCombination: (words) =>
        set((state) => {
          const combination = {
            id: uuidv4(),
            words,
            timestamp: Date.now(),
          };
          logger.info('Saving new combination', { 
            combination: words.map(w => w.text),
            totalSaved: state.savedCombinations.length + 1
          });
          return {
            savedCombinations: [combination, ...state.savedCombinations],
          };
        }),
      deleteCombination: (id) =>
        set((state) => {
          const combination = state.savedCombinations.find(c => c.id === id);
          logger.info('Deleting combination', { 
            id,
            combination: combination?.words.map(w => w.text),
            remaining: state.savedCombinations.length - 1
          });
          return {
            savedCombinations: state.savedCombinations.filter((combo) => combo.id !== id),
          };
        }),
      toggleSound: () => set((state) => {
        const newState = !state.soundEnabled;
        logger.info('Toggling sound', { enabled: newState });
        return { soundEnabled: newState };
      }),
    }),
    {
      name: 'retreat-roulette-storage',
      onRehydrateStorage: () => (state) => {
        logger.info('Store rehydrated', { 
          savedCombinations: state?.savedCombinations.length,
          soundEnabled: state?.soundEnabled
        });
      },
    }
  )
); 