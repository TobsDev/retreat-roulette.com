import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RetreatRoulette } from '../components/RetreatRoulette';
import { useRetreatStore } from '../store/useRetreatStore';
import { logger } from '../utils/logger';
import * as soundModule from '../utils/sound';
import type { RetreatStore } from '../store/useRetreatStore';

vi.mock('../store/useRetreatStore');
vi.mock('../utils/logger');
vi.mock('../utils/sound', () => ({
  playSound: vi.fn(),
  stopAllSounds: vi.fn(),
}));
vi.mock('../data/retreatWords', () => ({
  allWords: {
    activity: [{ id: '1', text: 'Yoga', category: 'activity' }],
    style: [{ id: '2', text: 'Nudist', category: 'style' }],
    focus: [{ id: '3', text: 'Healing', category: 'focus' }],
    location: [{ id: '4', text: 'Retreat', category: 'location' }],
  },
}));

describe('RetreatRoulette', () => {
  const mockStore: Required<RetreatStore> = {
    reels: [
      { isSpinning: false, selectedWordIndex: 0 },
      { isSpinning: false, selectedWordIndex: 0 },
      { isSpinning: false, selectedWordIndex: 0 },
      { isSpinning: false, selectedWordIndex: 0 },
    ],
    isSpinning: false,
    soundEnabled: true,
    savedCombinations: [],
    spin: vi.fn(),
    stopSpinning: vi.fn(),
    saveCombination: vi.fn(),
    deleteCombination: vi.fn(),
    toggleSound: vi.fn().mockImplementation(() => {
      soundModule.playSound('CLICK', true);
    }),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRetreatStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockStore);
    Object.defineProperty(global.navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
      writable: true,
    });
    Object.defineProperty(global.navigator, 'share', {
      value: vi.fn().mockImplementation(async () => {
        soundModule.playSound('CLICK', true);
      }),
      configurable: true,
      writable: true,
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('logs mount and unmount', () => {
    const { unmount } = render(<RetreatRoulette />);
    expect(logger.info).toHaveBeenCalledWith('RetreatRoulette component mounted');
    unmount();
    expect(logger.info).toHaveBeenCalledWith('RetreatRoulette component unmounting');
    expect(soundModule.stopAllSounds).toHaveBeenCalled();
  });

  it('renders correctly', () => {
    render(<RetreatRoulette />);
    expect(screen.getByRole('button', { name: 'Spin!' })).toBeInTheDocument();
  });

  it('handles spinning state', () => {
    const spinningStore = {
      ...mockStore,
      isSpinning: true,
      reels: mockStore.reels.map((reel, index) => ({
        ...reel,
        isSpinning: index === 0,
      })),
    };
    (useRetreatStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(spinningStore);
    render(<RetreatRoulette />);
    expect(screen.getByRole('button', { name: 'Spinning...' })).toBeDisabled();
  });

  it('handles spin button click', () => {
    render(<RetreatRoulette />);
    const spinButton = screen.getByRole('button', { name: 'Spin!' });
    fireEvent.click(spinButton);
    expect(mockStore.spin).toHaveBeenCalled();
    expect(soundModule.playSound).toHaveBeenCalledWith('SPIN', true);
  });

  it('handles sound toggle', () => {
    render(<RetreatRoulette />);
    const soundButton = screen.getByRole('button', { name: 'Toggle sound' });
    fireEvent.click(soundButton);
    expect(mockStore.toggleSound).toHaveBeenCalled();
    expect(soundModule.playSound).toHaveBeenCalledWith('CLICK', true);
  });

  it('shows share and save buttons after spin completes', async () => {
    render(<RetreatRoulette />);
    const spinButton = screen.getByRole('button', { name: 'Spin!' });
    fireEvent.click(spinButton);

    // Fast-forward through all timeouts
    act(() => {
      vi.runAllTimers();
    });

    // Now the share and save buttons should be visible
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('handles share button click', async () => {
    // Mock navigator.share to be undefined to test clipboard fallback
    Object.defineProperty(global.navigator, 'share', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    render(<RetreatRoulette />);
    const spinButton = screen.getByRole('button', { name: 'Spin!' });
    fireEvent.click(spinButton);

    // Fast-forward through all timeouts
    act(() => {
      vi.runAllTimers();
    });

    const shareButton = screen.getByRole('button', { name: 'Share' });
    await act(async () => {
      await fireEvent.click(shareButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('Retreat Roulette')
    );
    expect(soundModule.playSound).toHaveBeenCalledWith('CLICK', true);
  });

  it('handles save button click', () => {
    render(<RetreatRoulette />);
    const spinButton = screen.getByRole('button', { name: 'Spin!' });
    fireEvent.click(spinButton);

    // Fast-forward through all timeouts
    act(() => {
      vi.runAllTimers();
    });

    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);
    expect(mockStore.saveCombination).toHaveBeenCalled();
    expect(soundModule.playSound).toHaveBeenCalledWith('CLICK', true);
  });
}); 