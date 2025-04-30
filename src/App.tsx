import React, { useEffect } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { SlotMachine } from './components/slot-machine/SlotMachine';
import { audioManager } from './utils/audio';

function App() {
  useEffect(() => {
    // Initialize audio on mount
    audioManager.init();
  }, []);

  return (
    <AppLayout>
      <SlotMachine />
    </AppLayout>
  );
}

export default App; 