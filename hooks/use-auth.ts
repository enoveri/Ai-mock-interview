"use client";

import { useState, useEffect } from "react";
import {
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
  auth,
  getUserData,
} from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

interface UseAuthReturn {
  user: User | null;
  userData: any | null;
  loading: boolean;
  error: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        setLoading(true);
        try {
          if (user) {
            setUser(user);
            // Fetch additional user data from Firestore
            const data = await getUserData(user.uid);
            setUserData(data);
          } else {
            setUser(null);
            setUserData(null);
          }
          setError(null);
        } catch (error) {
          console.error("Auth state change error:", error);
          setError("Failed to load user data");
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error("Auth state change error:", error);
        setError("Authentication error");
        setLoading(false);
      }
    );

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signUpWithEmail(name, email, password);
    } catch (error: any) {
      console.error("Sign up error:", error);
      setError(error.message || "Failed to sign up");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmail(email, password);

      // Get the ID token
      const idToken = await userCredential.user.getIdToken();

      // Create a session cookie
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.message || "Failed to sign in");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      setError(null);

      // Delete the session cookie
      await fetch("/api/auth/session", {
        method: "DELETE",
      });

      // Sign out from Firebase
      await signOutUser();
    } catch (error: any) {
      console.error("Sign out error:", error);
      setError(error.message || "Failed to sign out");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    userData,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  };
}
