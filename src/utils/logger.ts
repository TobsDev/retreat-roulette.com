type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogOptions {
  level?: LogLevel;
  context?: string;
  data?: Record<string, unknown>;
  [key: string]: unknown; // Allow any additional properties
}

class Logger {
  private static instance: Logger;
  private isDevelopment: boolean;

  private constructor() {
    this.isDevelopment = import.meta.env.DEV;
  }

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(message: string, options: LogOptions = {}): string {
    const timestamp = new Date().toISOString();
    const context = options.context ? `[${options.context}]` : '';
    return `${timestamp} ${context} ${message}`;
  }

  private log(level: LogLevel, message: string, options: LogOptions = {}) {
    if (!this.isDevelopment && level === 'debug') return;

    const formattedMessage = this.formatMessage(message, options);
    const logData = options.data ? { ...options.data } : undefined;

    switch (level) {
      case 'debug':
        console.debug(formattedMessage, logData);
        break;
      case 'info':
        console.info(formattedMessage, logData);
        break;
      case 'warn':
        console.warn(formattedMessage, logData);
        break;
      case 'error':
        console.error(formattedMessage, logData);
        break;
    }
  }

  debug(message: string, options?: LogOptions) {
    this.log('debug', message, options);
  }

  info(message: string, options?: LogOptions) {
    this.log('info', message, options);
  }

  warn(message: string, options?: LogOptions) {
    this.log('warn', message, options);
  }

  error(message: string, options?: LogOptions) {
    this.log('error', message, options);
  }
}

export const logger = Logger.getInstance(); 