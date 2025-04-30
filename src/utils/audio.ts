import { Howl } from 'howler';

// TODO: Add actual sound files
const AUDIO_FILES = {
  LEVER_PULL: '/sounds/lever-pull.mp3',
  REEL_SPIN: '/sounds/reel-spin.mp3',
  REEL_STOP: '/sounds/reel-stop.mp3',
  WIN: '/sounds/win.mp3',
};

class AudioManager {
  private sounds: Map<string, Howl> = new Map();
  private initialized = false;

  async init() {
    if (this.initialized) return;

    // TODO: Preload sounds
    Object.entries(AUDIO_FILES).forEach(([key, path]) => {
      this.sounds.set(key, new Howl({
        src: [path],
        preload: true,
      }));
    });

    this.initialized = true;
  }

  play(soundId: keyof typeof AUDIO_FILES) {
    const sound = this.sounds.get(soundId);
    if (sound) {
      sound.play();
    }
  }

  stop(soundId: keyof typeof AUDIO_FILES) {
    const sound = this.sounds.get(soundId);
    if (sound) {
      sound.stop();
    }
  }
}

export const audioManager = new AudioManager(); 