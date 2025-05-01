import { Variants } from 'framer-motion';
import { logger } from './logger';

const logAnimationState = (component: string, state: string) => {
  logger.debug('Animation state change', { component, state });
};

export const reelVariants: Variants = {
  spinning: {
    y: [0, -100],
    transition: {
      y: {
        repeat: Infinity,
        duration: 0.5,
        ease: 'linear',
      },
      onComplete: () => logAnimationState('reel', 'spinning-complete'),
    },
  },
  stopped: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
      onComplete: () => logAnimationState('reel', 'stopped'),
    },
  },
};

export const buttonVariants: Variants = {
  idle: {
    scale: 1,
    transition: {
      onComplete: () => logAnimationState('button', 'idle'),
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      onComplete: () => logAnimationState('button', 'hover'),
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      onComplete: () => logAnimationState('button', 'tap'),
    },
  },
};

export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    transition: {
      onComplete: () => logAnimationState('modal', 'hidden'),
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
      onComplete: () => logAnimationState('modal', 'visible'),
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
      onComplete: () => logAnimationState('modal', 'exit'),
    },
  },
}; 