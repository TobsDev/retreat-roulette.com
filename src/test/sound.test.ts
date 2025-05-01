import { describe, it, expect, vi, beforeEach } from 'vitest';
import { playSound, stopAllSounds } from '../utils/sound';
import { logger } from '../utils/logger';

type AudioContextMock = {
  createGain: () => GainNode;
  createOscillator: () => OscillatorNode;
  destination: AudioDestinationNode;
};

// Mock Howler
vi.mock('howler', () => ({
  Howl: vi.fn().mockImplementation(() => ({
    play: vi.fn(),
    stop: vi.fn(),
    volume: vi.fn().mockReturnValue(0.5),
  })),
}));

// Mock logger
vi.mock('../utils/logger', () => ({
  logger: {
    debug: vi.fn(),
  },
}));

describe('Sound System', () => {
  let mockAudioContext: AudioContextMock;
  let mockGainNode: GainNode;
  let mockOscillator: OscillatorNode;

  beforeEach(() => {
    mockGainNode = {
      connect: vi.fn(),
      disconnect: vi.fn(),
      gain: { value: 0, setValueAtTime: vi.fn() },
    } as unknown as GainNode;

    mockOscillator = {
      connect: vi.fn(),
      disconnect: vi.fn(),
      start: vi.fn(),
      stop: vi.fn(),
      frequency: { value: 0 },
    } as unknown as OscillatorNode;

    mockAudioContext = {
      createGain: () => mockGainNode,
      createOscillator: () => mockOscillator,
      destination: {} as AudioDestinationNode,
    };

    vi.clearAllMocks();
  });

  describe('playSound', () => {
    it('plays sound when enabled', () => {
      playSound('SPIN', true);
      expect(logger.debug).toHaveBeenCalledWith('Playing sound', {
        sound: 'SPIN',
        volume: 0.5,
      });
    });

    it('does not play sound when disabled', () => {
      playSound('SPIN', false);
      expect(logger.debug).toHaveBeenCalledWith('Sound playback skipped - sound disabled', {
        sound: 'SPIN',
      });
    });

    it('handles all sound types', () => {
      ['SPIN', 'STOP', 'CLICK'].forEach(sound => {
        playSound(sound as any, true);
        expect(logger.debug).toHaveBeenCalledWith('Playing sound', {
          sound,
          volume: 0.5,
        });
      });
    });
  });

  describe('stopAllSounds', () => {
    it('stops all sounds', () => {
      stopAllSounds();
      expect(logger.debug).toHaveBeenCalledWith('Stopping all sounds');
    });
  });
}); 