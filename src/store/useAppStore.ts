import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WordCategory, RetreatWord } from '@/data/retreatWords';

interface SavedCombination {
  id: string;
  words: Record<WordCategory, RetreatWord>;
  timestamp: number;
}

interface AppState {
  isSoundEnabled: boolean;
  savedCombinations: SavedCombination[];
  toggleSound: () => void;
  saveCombination: (words: Record<WordCategory, RetreatWord>) => void;
  removeSavedCombination: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isSoundEnabled: true,
      savedCombinations: [],
      toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
      saveCombination: (words) =>
        set((state) => ({
          savedCombinations: [
            {
              id: Math.random().toString(36).substring(2),
              words,
              timestamp: Date.now(),
            },
            ...state.savedCombinations,
          ],
        })),
      removeSavedCombination: (id) =>
        set((state) => ({
          savedCombinations: state.savedCombinations.filter((combo) => combo.id !== id),
        })),
    }),
    {
      name: 'retreat-roulette-storage',
    }
  )
); 