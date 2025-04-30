import React from 'react';
import { render, screen } from '@testing-library/react';
import { SlotMachine } from './SlotMachine';

describe('SlotMachine', () => {
  it('renders all four reels', () => {
    render(<SlotMachine />);
    
    // Check if all four reels are rendered
    const reels = screen.getAllByText(/Reel \d/);
    expect(reels).toHaveLength(4);
  });

  it('renders the lever', () => {
    render(<SlotMachine />);
    
    // The lever is currently just a div, we'll need to update this test
    // when we add proper lever functionality and accessibility
    const lever = document.querySelector('[class*="absolute right-0"]');
    expect(lever).toBeInTheDocument();
  });
}); 