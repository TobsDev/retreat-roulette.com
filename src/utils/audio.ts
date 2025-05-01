import { Howl } from 'howler';
import { useCallback } from 'react';
import { logger } from './logger';

const sounds = {
  LEVER_PULL: new Howl({
    src: ['/sounds/lever-pull.mp3'],
    volume: 0.5,
  }),
  REEL_SPIN: new Howl({
    src: ['/sounds/reel-spin.mp3'],
    volume: 0.3,
  }),
  WIN: new Howl({
    src: ['/sounds/win.mp3'],
    volume: 0.4,
  }),
};

type SoundType = keyof typeof sounds;

export const audioManager = {
  play: (sound: SoundType) => {
    logger.debug('Playing audio', { sound, volume: sounds[sound].volume() });
    sounds[sound].play();
  },
  stop: (sound: SoundType) => {
    logger.debug('Stopping audio', { sound });
    sounds[sound].stop();
  },
};

export const useAudio = () => {
  const playSound = useCallback((sound: SoundType) => {
    logger.debug('Audio hook: playing sound', { sound });
    audioManager.play(sound);
  }, []);

  const stopSound = useCallback((sound: SoundType) => {
    logger.debug('Audio hook: stopping sound', { sound });
    audioManager.stop(sound);
  }, []);

  return { playSound, stopSound };
}; 