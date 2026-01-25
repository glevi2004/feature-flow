/**
 * Structured logging utility
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  userId?: string;
}

/**
 * Structured logger for server-side operations
 */
export class Logger {
  private static formatLog(level: LogLevel, message: string, context?: Record<string, unknown>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(context && { context }),
    };
  }

  static debug(message: string, context?: Record<string, unknown>) {
    if (process.env.NODE_ENV === "development") {
      console.debug(JSON.stringify(this.formatLog("debug", message, context)));
    }
  }

  static info(message: string, context?: Record<string, unknown>) {
    console.log(JSON.stringify(this.formatLog("info", message, context)));
  }

  static warn(message: string, context?: Record<string, unknown>) {
    console.warn(JSON.stringify(this.formatLog("warn", message, context)));
  }

  static error(message: string, error?: Error, context?: Record<string, unknown>) {
    const logEntry = this.formatLog("error", message, {
      ...context,
      error: error ? {
        message: error.message,
        stack: error.stack,
        name: error.name,
      } : undefined,
    });
    console.error(JSON.stringify(logEntry));
  }
}
