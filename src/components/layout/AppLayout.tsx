import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import { ImprintModal } from '../ImprintModal';
import { logger } from '../../utils/logger';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [showImprint, setShowImprint] = useState(false);

  useEffect(() => {
    logger.info('AppLayout mounted');
    return () => {
      logger.info('AppLayout unmounting');
    };
  }, []);

  const handleImprintToggle = (show: boolean) => {
    logger.debug('Toggling imprint modal', { show });
    setShowImprint(show);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Retreat Roulette
          </h1>
          <p className="text-lg text-white/80">
            Generate your next spiritual adventure!
          </p>
        </header>

        <main>
          {children}
        </main>

        <footer className="mt-12 text-center">
          <button
            onClick={() => handleImprintToggle(true)}
            className="text-white/70 hover:text-white transition-colors flex items-center gap-2 mx-auto"
          >
            <Info size={16} />
            Legal Notice
          </button>
        </footer>
      </div>

      <ImprintModal
        isOpen={showImprint}
        onClose={() => handleImprintToggle(false)}
      />
    </div>
  );
}; 