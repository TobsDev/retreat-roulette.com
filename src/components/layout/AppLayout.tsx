import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <motion.div 
      className="relative flex flex-col items-center justify-between w-full h-[100dvh] bg-purple-900 text-yellow-400 p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <header className="w-full text-center">
        <h1 className="text-4xl font-bold">RETREAT ROULETTE</h1>
        <p className="text-lg italic">Can you handle the sacred randomness?</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex items-center justify-center">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full flex justify-between items-center">
        <button className="px-4 py-2 bg-yellow-400 text-purple-900 rounded-full">
          SHARE
        </button>
        <button className="px-4 py-2 bg-yellow-400 text-purple-900 rounded-full">
          SAVE
        </button>
      </footer>
    </motion.div>
  );
} 