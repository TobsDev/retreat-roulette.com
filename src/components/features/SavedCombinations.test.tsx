import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SavedCombinations } from './SavedCombinations';

vi.mock('../../store/useAppStore', () => ({
  useAppStore: () => ({
    savedCombinations: [
      {
        ACTIVITY: 'nudist',
        THEME: 'consciousness-hacking',
        FOCUS: 'awakening',
        SETTING: 'temple',
      },
    ],
    removeSavedCombination: vi.fn(),
  }),
}));

describe('SavedCombinations', () => {
  it('renders saved combinations', () => {
    render(<SavedCombinations onClose={() => {}} />);
    expect(screen.getByText('nudist-consciousness-hacking-awakening-temple')).toBeInTheDocument();
  });

  it('allows deletion of combinations', () => {
    const { getByRole } = render(<SavedCombinations onClose={() => {}} />);
    const deleteButton = getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
  });
}); 