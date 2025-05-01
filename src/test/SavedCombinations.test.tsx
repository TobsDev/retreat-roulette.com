import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SavedCombinations } from '../components/SavedCombinations';
import { useRetreatStore } from '../store/useRetreatStore';
import { logger } from '../utils/logger';
import * as soundModule from '../utils/sound';

vi.mock('../store/useRetreatStore');
vi.mock('../utils/logger');
vi.mock('../utils/sound', () => ({
  playSound: vi.fn(),
}));

describe('SavedCombinations', () => {
  const mockStore = {
    savedCombinations: [
      {
        id: '1',
        words: [
          { id: '1', text: 'Yoga', category: 'activity' },
          { id: '2', text: 'Nudist', category: 'style' },
          { id: '3', text: 'Healing', category: 'focus' },
          { id: '4', text: 'Retreat', category: 'location' },
        ],
        timestamp: 1619827200000, // May 1, 2021
      },
    ],
    soundEnabled: true,
    deleteCombination: vi.fn().mockImplementation(() => {
      soundModule.playSound('CLICK', true);
    }),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRetreatStore as any).mockReturnValue(mockStore);
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
  });

  it('logs mount with total combinations', () => {
    render(<SavedCombinations />);
    expect(logger.info).toHaveBeenCalledWith('SavedCombinations mounted', {
      totalCombinations: 1,
    });
  });

  it('renders saved combinations', () => {
    render(<SavedCombinations />);
    expect(screen.getByText('Yoga-Nudist-Healing-Retreat')).toBeInTheDocument();
  });

  it('logs and handles combination deletion', () => {
    render(<SavedCombinations />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockStore.deleteCombination).toHaveBeenCalledWith('1');
    expect(soundModule.playSound).toHaveBeenCalledWith('CLICK', true);
  });

  it('logs and handles combination sharing via Web Share API', async () => {
    render(<SavedCombinations />);
    const shareButton = screen.getByRole('button', { name: /share/i });
    await fireEvent.click(shareButton);
    expect(navigator.share).toHaveBeenCalledWith({
      text: expect.stringContaining('Yoga-Nudist-Healing-Retreat'),
    });
    expect(soundModule.playSound).toHaveBeenCalledWith('CLICK', true);
  });

  it('logs and handles combination sharing via clipboard', async () => {
    // Mock navigator.share to be undefined to test clipboard fallback
    Object.defineProperty(global.navigator, 'share', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    render(<SavedCombinations />);
    const shareButton = screen.getByRole('button', { name: /share/i });
    await act(async () => {
      await fireEvent.click(shareButton);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('Yoga-Nudist-Healing-Retreat')
    );
    expect(soundModule.playSound).toHaveBeenCalledWith('CLICK', true);
  });

  it('logs share errors', async () => {
    // Mock navigator.share to reject
    Object.defineProperty(global.navigator, 'share', {
      value: vi.fn().mockRejectedValue(new Error('Share failed')),
      configurable: true,
      writable: true,
    });

    render(<SavedCombinations />);
    const shareButton = screen.getByRole('button', { name: /share/i });
    await act(async () => {
      await fireEvent.click(shareButton);
    });

    expect(logger.error).toHaveBeenCalledWith('Error sharing saved combination', {
      error: expect.any(Error),
    });
  });

  it('renders nothing when no combinations are saved', () => {
    (useRetreatStore as any).mockReturnValue({
      ...mockStore,
      savedCombinations: [],
    });
    render(<SavedCombinations />);
    expect(screen.queryByText('Yoga-Nudist-Healing-Retreat')).not.toBeInTheDocument();
  });

  it('formats date correctly', () => {
    render(<SavedCombinations />);
    expect(screen.getByText('5/1/2021')).toBeInTheDocument();
  });
}); 