import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface LegalNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export function LegalNotice({ isOpen, onClose, className }: LegalNoticeProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "relative z-50",
                "w-[95vw] md:w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto",
                "bg-purple-950 border-4 border-yellow-400 rounded-xl p-8",
                "text-yellow-400 shadow-2xl",
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute right-6 top-6 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <X size={28} />
              </button>

              <h2 className="text-3xl font-bold mb-8 text-center">Legal Notice</h2>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-lg">Retreat Roulette</p>
                  <p className="text-lg">A Project by Tobias Rosenberg</p>
                  <p className="text-lg">Email: mail+retreat-delivery@trosenberg.com</p>
                  <p className="text-lg">Bockumweg 21</p>
                  <p className="text-lg">59425</p>
                  <p className="text-lg">Unna - Germany</p>
                </div>
              </section>

              <section className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Disclaimer</h3>
                <div className="space-y-4 text-lg">
                  <p>
                    This website is a creative project designed to generate random retreat concepts.
                    The combinations produced are meant for entertainment purposes only and should
                    not be taken as professional advice or actual retreat offerings.
                  </p>
                  <p>
                    Even spiritual slot machines need legal pages. All generated combinations are
                    products of random selection and do not represent actual services or endorsements.
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-2xl font-semibold mb-4">Copyright</h3>
                <p className="text-lg">
                  © 2025 Retreat Roulette. All rights reserved. The concept, design, and
                  implementation of this website are protected by copyright law.
                </p>
              </section>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 