import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SavedCombinations } from './SavedCombinations';
import { useAppStore } from '@/store/useAppStore';

// Mock Zustand store
vi.mock('@/store/useAppStore', () => ({
  useAppStore: vi.fn(),
}));

describe('SavedCombinations Component', () => {
  const mockOnClose = vi.fn();
  const mockRemoveSavedCombination = vi.fn();

  const mockSavedCombinations = [
    {
      id: '1',
      words: {
        ACTIVITY: 'nudist',
        THEME: 'timeline-jumping',
        FOCUS: 'awakening',
        SETTING: 'temple',
      },
      timestamp: Date.now(),
    },
    {
      id: '2',
      words: {
        ACTIVITY: 'crypto',
        THEME: 'consciousness-hacking',
        FOCUS: 'ascension',
        SETTING: 'vortex',
      },
      timestamp: Date.now(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    (useAppStore as any).mockImplementation(() => ({
      savedCombinations: mockSavedCombinations,
      removeSavedCombination: mockRemoveSavedCombination,
    }));
  });

  it('renders saved combinations', () => {
    render(<SavedCombinations onClose={mockOnClose} />);
    
    expect(screen.getByText('Saved Combinations')).toBeInTheDocument();
    expect(screen.getByText('nudist-timeline-jumping-awakening-temple')).toBeInTheDocument();
    expect(screen.getByText('crypto-consciousness-hacking-ascension-vortex')).toBeInTheDocument();
  });

  it('calls onClose when hide button is clicked', () => {
    render(<SavedCombinations onClose={mockOnClose} />);
    
    const hideButton = screen.getByText('Hide');
    fireEvent.click(hideButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('removes combination when delete button is clicked', () => {
    render(<SavedCombinations onClose={mockOnClose} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /remove saved combination/i });
    fireEvent.click(deleteButtons[0]);
    
    expect(mockRemoveSavedCombination).toHaveBeenCalledWith('1');
  });

  it('returns null when there are no saved combinations', () => {
    (useAppStore as any).mockImplementation(() => ({
      savedCombinations: [],
      removeSavedCombination: mockRemoveSavedCombination,
    }));

    const { container } = render(<SavedCombinations onClose={mockOnClose} />);
    expect(container.firstChild).toBeNull();
  });
}); 