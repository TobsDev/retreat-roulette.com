import React, { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SlotMachine } from '@/components/features/SlotMachine';
import { audioManager } from '@/utils/audio';
import { logger } from '@/utils/logger';
import type { WordCategory, RetreatWord } from '@/data/retreatWords';

function App() {
  const [currentCombination, setCurrentCombination] = useState<Record<WordCategory, RetreatWord> | undefined>();

  useEffect(() => {
    logger.info('App mounted');
    audioManager.init().catch(error => {
      logger.error('Failed to initialize audio', { error });
    });
  }, []);

  return (
    <AppLayout currentCombination={currentCombination}>
      <SlotMachine onCombinationChange={setCurrentCombination} />
    </AppLayout>
  );
}

export default App; 