// Export client functionality
export * from "./client";

// Export auth utilities
export * from "./auth-utils";

// Note: Admin functionality should be imported directly from "./admin"
// and only used in server components or API routes

// Collection names for consistency
export const COLLECTIONS = {
  USERS: "users",
  INTERVIEWS: "interviews",
  FEEDBACK: "feedback",
  TRANSCRIPTS: "transcripts",
};
