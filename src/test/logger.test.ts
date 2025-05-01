import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../utils/logger';

describe('Logger', () => {
  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    vi.spyOn(console, 'info').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('logs debug messages correctly', () => {
    logger.debug('Test debug message', { context: 'test' });
    expect(console.debug).toHaveBeenCalled();
  });

  it('logs info messages correctly', () => {
    logger.info('Test info message', { context: 'test' });
    expect(console.info).toHaveBeenCalled();
  });

  it('logs warning messages correctly', () => {
    logger.warn('Test warning message', { context: 'test' });
    expect(console.warn).toHaveBeenCalled();
  });

  it('logs error messages correctly', () => {
    logger.error('Test error message', { context: 'test' });
    expect(console.error).toHaveBeenCalled();
  });

  it('includes timestamp in log messages', () => {
    logger.info('Test message');
    const call = vi.mocked(console.info).mock.calls[0][0] as string;
    expect(call).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
  });

  it('includes context when provided', () => {
    const context = 'TestContext';
    logger.info('Test message', { context });
    const call = vi.mocked(console.info).mock.calls[0][0] as string;
    expect(call).toContain(`[${context}]`);
  });
}); 