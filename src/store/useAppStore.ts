import { create } from 'zustand';
import type { WordCategory, RetreatWord } from '@/data/retreatWords';

interface AppState {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  savedCombinations: Record<WordCategory, RetreatWord>[];
  saveCombination: (combination: Record<WordCategory, RetreatWord>) => void;
  removeSavedCombination: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSoundEnabled: true,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  savedCombinations: [],
  saveCombination: (combination) =>
    set((state) => ({
      savedCombinations: [...state.savedCombinations, combination],
    })),
  removeSavedCombination: (id) =>
    set((state) => ({
      savedCombinations: state.savedCombinations.filter((_, index) => index.toString() !== id),
    })),
})); 