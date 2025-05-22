"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, getUserData } from "@/firebase";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  userData: any | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const value = {
    user,
    userData,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
