import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SlotMachine } from '../components/features/SlotMachine';
import { allWords } from '../data/retreatWords';

// Mock the retreat words
vi.mock('../data/retreatWords', () => ({
  allWords: {
    activity: [{ id: '1', text: 'Yoga', category: 'activity' }],
    style: [{ id: '2', text: 'Nudist', category: 'style' }],
    focus: [{ id: '3', text: 'Healing', category: 'focus' }],
    location: [{ id: '4', text: 'Retreat', category: 'location' }],
  },
}));

describe('SlotMachine', () => {
  it('renders with initial state', () => {
    render(<SlotMachine />);
    expect(screen.getByText('Spin')).toBeInTheDocument();
  });

  it('spins when button is clicked', () => {
    render(<SlotMachine />);
    const spinButton = screen.getByText('Spin');
    fireEvent.click(spinButton);
    expect(spinButton).toBeDisabled();
  });
}); 