import React from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { RetreatRoulette } from './components/RetreatRoulette';
import { SavedCombinations } from './components/SavedCombinations';

export const App: React.FC = () => {
  return (
    <AppLayout>
      <RetreatRoulette />
      <SavedCombinations />
    </AppLayout>
  );
}; 