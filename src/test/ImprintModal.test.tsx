import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ImprintModal } from '../components/ImprintModal';
import { logger } from '../utils/logger';

// Mock logger
vi.mock('../utils/logger', () => ({
  logger: {
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

describe('ImprintModal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when closed', () => {
    render(<ImprintModal isOpen={false} onClose={onClose} />);
    expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument();
  });

  it('renders content and logs when open', () => {
    render(<ImprintModal isOpen={true} onClose={onClose} />);
    expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument();
    expect(logger.info).toHaveBeenCalledWith('Modal opened');
  });

  it('logs and calls onClose when clicking the close button', () => {
    render(<ImprintModal isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalledWith('Modal closed via close button');
  });

  it('logs and calls onClose when clicking the backdrop', () => {
    render(<ImprintModal isOpen={true} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalledWith('Modal closed via backdrop click');
  });

  it('logs and calls onClose when pressing Escape', () => {
    render(<ImprintModal isOpen={true} onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
    expect(logger.debug).toHaveBeenCalledWith('Modal closed via Escape key');
  });

  it('prevents event propagation when clicking modal content', () => {
    render(<ImprintModal isOpen={true} onClose={onClose} />);
    const modalContent = screen.getByText('Legal Notice').closest('div');
    fireEvent.click(modalContent!);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('logs when unmounting while open', () => {
    const { unmount } = render(<ImprintModal isOpen={true} onClose={onClose} />);
    unmount();
    expect(logger.info).toHaveBeenCalledWith('Modal closed');
  });
}); 