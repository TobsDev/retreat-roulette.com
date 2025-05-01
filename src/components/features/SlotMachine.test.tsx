import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SlotMachine } from './SlotMachine';

vi.mock('../../utils/audio', () => ({
  audioManager: {
    play: vi.fn(),
    stop: vi.fn(),
  },
}));

describe('SlotMachine', () => {
  it('renders with initial state', () => {
    render(<SlotMachine />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('spins when button is clicked', () => {
    render(<SlotMachine />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });
}); 