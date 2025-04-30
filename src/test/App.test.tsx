import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('Retreat Roulette App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders main components', () => {
    expect(screen.getByText('RETREAT ROULETTE')).toBeInTheDocument();
    expect(screen.getByText(/Can you handle the sacred randomness/i)).toBeInTheDocument();
    expect(screen.getByText('SHARE')).toBeInTheDocument();
    expect(screen.getByText('SAVE')).toBeInTheDocument();
  });

  it('allows spinning the slot machine', async () => {
    const lever = screen.getByRole('button', { name: /pull lever/i });
    expect(lever).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(lever);
      // Wait for spin animation
      await new Promise(resolve => setTimeout(resolve, 2500));
    });

    // After spin, we should have a combination
    const shareButton = screen.getByText('SHARE');
    expect(shareButton).not.toBeDisabled();
  });

  it('can save combinations', async () => {
    const saveButton = screen.getByText('SAVE');
    expect(saveButton).toBeDisabled(); // Initially disabled

    // Spin first
    const lever = screen.getByRole('button', { name: /pull lever/i });
    await act(async () => {
      fireEvent.click(lever);
      await new Promise(resolve => setTimeout(resolve, 2500));
    });

    // Now we can save
    expect(saveButton).not.toBeDisabled();
    fireEvent.click(saveButton);

    // Should show saved combinations
    expect(screen.getByText('Saved Combinations')).toBeInTheDocument();
  });

  it('shows legal notice', () => {
    const legalButton = screen.getByText('Legal Notice');
    fireEvent.click(legalButton);
    
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText('Disclaimer')).toBeInTheDocument();
  });
}); 