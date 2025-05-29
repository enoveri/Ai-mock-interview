/**
 * Environment Configuration Validator for PrepWise
 * This module validates that all required environment variables are properly configured
 */

interface EnvConfig {
  NEXT_PUBLIC_VAPI_WEB_TOKEN: string;
  NEXT_PUBLIC_VAPI_WORKFLOW_ID: string;
  NEXT_PUBLIC_BASE_URL: string;
}

interface ValidationResult {
  isValid: boolean;
  missingVars: string[];
  errors: string[];
}

export function validateEnvironment(): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    missingVars: [],
    errors: [],
  };
  const requiredVars: (keyof EnvConfig)[] = [
    "NEXT_PUBLIC_VAPI_WEB_TOKEN",
    "NEXT_PUBLIC_VAPI_WORKFLOW_ID",
    "NEXT_PUBLIC_BASE_URL",
  ];

  // Check if we're in browser environment
  if (typeof window === "undefined") {
    return result; // Skip validation on server side
  }

  requiredVars.forEach((varName) => {
    const value = process.env[varName];

    if (!value) {
      result.missingVars.push(varName);
      result.isValid = false;
    } else if (value.includes("your_") || value.includes("_here")) {
      result.errors.push(`${varName} contains placeholder value`);
      result.isValid = false;
    }
  }); // Validate specific formats
  const webToken = process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN;
  if (webToken && webToken.length < 10) {
    result.errors.push("NEXT_PUBLIC_VAPI_WEB_TOKEN appears to be too short");
    result.isValid = false;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (baseUrl && !baseUrl.startsWith("http")) {
    result.errors.push('NEXT_PUBLIC_BASE_URL should start with "http"');
    result.isValid = false;
  }

  return result;
}

export function getEnvironmentStatus(): "development" | "production" | "test" {
  return (
    (process.env.NODE_ENV as "development" | "production" | "test") ||
    "development"
  );
}

export function isDevelopment(): boolean {
  return getEnvironmentStatus() === "development";
}

export function isProduction(): boolean {
  return getEnvironmentStatus() === "production";
}
