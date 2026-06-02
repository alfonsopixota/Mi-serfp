/**
 * Middleware utilities for SerFP backend
 */

import { Request, Response, NextFunction } from "express";

// ============================================================================
// ENVIRONMENT VALIDATION
// ============================================================================

export interface EnvConfig {
  PORT: number;
  GEMINI_API_KEY: string | undefined;
  NODE_ENV: "development" | "production";
}

/**
 * Validates and retrieves environment configuration
 * @returns Validated environment configuration
 * @throws Error if required environment variables are missing or invalid
 */
export function validateEnv(): EnvConfig {
  const portStr = process.env.PORT || "3000";
  const port = parseInt(portStr, 10);

  if (isNaN(port) || port < 1 || port > 65535) {
    throw new Error(
      `Invalid PORT environment variable: ${portStr}. Must be a number between 1 and 65535.`
    );
  }

  return {
    PORT: port,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    NODE_ENV: (process.env.NODE_ENV as "development" | "production") || "development",
  };
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Global error handler middleware
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("❌ Unhandled error:", err);

  // Determine error message
  const message =
    err instanceof Error ? err.message : "An unexpected error occurred.";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
