/**
 * Error handling utilities for production
 */

export interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
  userId?: string;
  timestamp: Date;
  url?: string;
  userAgent?: string;
}

/**
 * Log error to console in development, send to monitoring service in production
 */
export function logError(error: Error, errorInfo?: Record<string, unknown>) {
  const errorData: ErrorInfo = {
    message: error.message,
    stack: error.stack,
    ...(errorInfo as Record<string, string>),
    timestamp: new Date(),
    url: typeof window !== "undefined" ? window.location.href : undefined,
    userAgent:
      typeof window !== "undefined" ? window.navigator.userAgent : undefined,
  };

  // In development, log to console
  if (process.env.NODE_ENV === "development") {
    console.error("Error:", errorData);
    return;
  }

  // In production, send to error monitoring service
  // TODO: Integrate with Sentry or similar service
  // Example:
  // if (typeof window !== 'undefined' && window.Sentry) {
  //   window.Sentry.captureException(error, { extra: errorInfo });
  // }

  // For now, log to console (replace with actual monitoring)
  console.error("Production Error:", errorData);
}

/**
 * Create a user-friendly error message
 */
export function getUserFriendlyError(error: Error | unknown): string {
  if (error instanceof Error) {
    // Handle known error types
    if (error.message.includes("permission-denied")) {
      return "You don't have permission to perform this action.";
    }
    if (error.message.includes("not-found")) {
      return "The requested resource was not found.";
    }
    if (error.message.includes("network")) {
      return "Network error. Please check your connection and try again.";
    }
    if (error.message.includes("auth")) {
      return "Authentication error. Please sign in again.";
    }
    return error.message || "An unexpected error occurred.";
  }
  return "An unexpected error occurred.";
}
