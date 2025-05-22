import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  User,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, firestore, COLLECTIONS } from "./index";

/**
 * Signs up a new user with email and password
 * @param name - User's name
 * @param email - User's email
 * @param password - User's password
 * @returns A Promise that resolves with the user credentials
 */
export const signUpWithEmail = async (
  name: string,
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    // Create the user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update the user's profile with their name
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Create a user document in Firestore with proper permissions
      await setDoc(
        doc(firestore, COLLECTIONS.USERS, userCredential.user.uid),
        {
          name,
          email,
          userId: userCredential.user.uid, // Add userId field for security rules
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      ); // Use merge to avoid overwriting existing data
    }

    return userCredential;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

/**
 * Signs in a user with email and password
 * @param email - User's email
 * @param password - User's password
 * @returns A Promise that resolves with the user credentials
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

/**
 * Signs out the current user
 * @returns A Promise that resolves when the user is signed out
 */
export const signOutUser = async (): Promise<void> => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

/**
 * Sends a password reset email to the specified email address
 * @param email - The email address to send the password reset to
 * @returns A Promise that resolves when the email has been sent
 */
export const resetUserPassword = async (email: string): Promise<void> => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

/**
 * Gets the current user's data from Firestore
 * @param uid - The user's UID
 * @returns A Promise that resolves with the user data
 */
export const getUserData = async (uid: string) => {
  try {
    // Check if user is authenticated
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("User not authenticated");
    }

    // Only allow users to access their own data
    if (currentUser.uid !== uid) {
      throw new Error("Unauthorized access to user data");
    }

    const userDoc = await getDoc(doc(firestore, COLLECTIONS.USERS, uid));
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    }

    // If user document doesn't exist, create it
    if (!userDoc.exists() && currentUser) {
      const userData = {
        name: currentUser.displayName || "",
        email: currentUser.email || "",
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(firestore, COLLECTIONS.USERS, uid), userData, {
        merge: true,
      });
      return { id: uid, ...userData };
    }

    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

/**
 * Gets the Firebase ID token for the current user
 * @param forceRefresh - Whether to force a token refresh
 * @returns A Promise that resolves with the ID token
 */
export const getIdToken = async (
  forceRefresh = false
): Promise<string | null> => {
  try {
    const user = auth.currentUser;
    if (!user) return null;
    return await user.getIdToken(forceRefresh);
  } catch (error) {
    console.error("Error getting ID token:", error);
    throw error;
  }
};
