import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { SlotMachine } from './SlotMachine';
import { audioManager } from '@/utils/audio';

// Mock audio manager
vi.mock('@/utils/audio', () => ({
  audioManager: {
    play: vi.fn(),
    init: vi.fn().mockResolvedValue(undefined),
  },
}));

describe('SlotMachine Component', () => {
  const mockOnCombinationChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    render(<SlotMachine onCombinationChange={mockOnCombinationChange} />);
  });

  it('renders all reels', () => {
    const reels = screen.getAllByRole('generic').filter(el => 
      el.className.includes('bg-purple-950')
    );
    expect(reels).toHaveLength(4); // ACTIVITY, THEME, FOCUS, SETTING
  });

  it('renders lever', () => {
    const lever = screen.getByRole('button', { name: /pull lever/i });
    expect(lever).toBeInTheDocument();
  });

  it('plays sound effects when spinning with sound enabled', async () => {
    const lever = screen.getByRole('button', { name: /pull lever/i });
    
    await act(async () => {
      fireEvent.click(lever);
      // Wait for spin animation
      await new Promise(resolve => setTimeout(resolve, 2500));
    });

    expect(audioManager.play).toHaveBeenCalledWith('LEVER_PULL');
    expect(audioManager.play).toHaveBeenCalledWith('REEL_SPIN');
    expect(audioManager.play).toHaveBeenCalledWith('WIN');
  });

  it('calls onCombinationChange with new combination after spin', async () => {
    const lever = screen.getByRole('button', { name: /pull lever/i });
    
    await act(async () => {
      fireEvent.click(lever);
      await new Promise(resolve => setTimeout(resolve, 2500));
    });

    expect(mockOnCombinationChange).toHaveBeenCalled();
    const combination = mockOnCombinationChange.mock.calls[0][0];
    expect(Object.keys(combination)).toEqual(['ACTIVITY', 'THEME', 'FOCUS', 'SETTING']);
  });

  it('disables lever while spinning', async () => {
    const lever = screen.getByRole('button', { name: /pull lever/i });
    
    fireEvent.click(lever);
    expect(lever).toBeDisabled();

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 2500));
    });

    expect(lever).not.toBeDisabled();
  });
}); 