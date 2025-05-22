"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useAuth as useAuthHook } from "@/hooks/use-auth";

// Create the auth context
const AuthContext = createContext<ReturnType<typeof useAuthHook> | undefined>(
  undefined
);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthHook();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
