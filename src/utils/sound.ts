import { Howl } from 'howler';
import { logger } from './logger';

const SOUNDS = {
  SPIN: new Howl({
    src: ['/sounds/spin.mp3'],
    volume: 0.5,
  }),
  STOP: new Howl({
    src: ['/sounds/stop.mp3'],
    volume: 0.5,
  }),
  CLICK: new Howl({
    src: ['/sounds/click.mp3'],
    volume: 0.3,
  }),
};

export const playSound = (sound: keyof typeof SOUNDS, enabled: boolean = true) => {
  if (!enabled) {
    logger.debug('Sound playback skipped - sound disabled', { sound });
    return;
  }
  logger.debug('Playing sound', { sound, volume: SOUNDS[sound].volume() });
  SOUNDS[sound].play();
};

export const stopAllSounds = () => {
  logger.debug('Stopping all sounds');
  Object.values(SOUNDS).forEach(sound => sound.stop());
}; 