import { NextRequest } from "next/server";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store for rate limiting
// Note: This is per-instance. In a serverless environment (like Vercel), 
// this will reset when the function cold starts.
const store: RateLimitStore = {};

// Clean up expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (store[key].resetTime < now) {
        delete store[key];
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
  limit: number;      // Max requests
  windowMs: number;   // Time window in milliseconds
}

/**
 * Simple in-memory rate limiter for Next.js API routes
 */
export async function rateLimit(
  request: NextRequest, 
  config: RateLimitConfig = { limit: 10, windowMs: 60 * 1000 } // Default: 10 requests per minute
) {
  // Use IP address or User ID as the key
  const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "anonymous";
  const key = `${ip}`;
  
  const now = Date.now();
  const entry = store[key];

  if (!entry || entry.resetTime < now) {
    // New window
    store[key] = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    return { success: true, remaining: config.limit - 1 };
  }

  if (entry.count >= config.limit) {
    // Rate limit exceeded
    return { success: false, remaining: 0 };
  }

  // Increment count
  entry.count++;
  return { success: true, remaining: config.limit - entry.count };
}
