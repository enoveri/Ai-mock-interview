// This file contains server-side only utilities for Firebase Admin
// It should only be imported in server components or API routes

import { auth, db } from "@/firebase/admin";
import { COLLECTIONS } from "@/firebase";

/**
 * Verifies a Firebase ID token
 * @param idToken - The ID token to verify
 * @returns The decoded token
 */
export async function verifyIdToken(idToken: string) {
  try {
    return await auth.verifyIdToken(idToken);
  } catch (error) {
    console.error("Error verifying ID token:", error);
    throw new Error("Invalid token");
  }
}

/**
 * Creates a user in Firebase Auth and Firestore
 * @param name - User's name
 * @param email - User's email
 * @param password - User's password
 * @returns The created user record
 */
export async function createUser(name: string, email: string, password: string) {
  try {
    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Create user document in Firestore
    await db.collection(COLLECTIONS.USERS).doc(userRecord.uid).set({
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return userRecord;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

/**
 * Gets a user by their email
 * @param email - User's email
 * @returns The user record
 */
export async function getUserByEmail(email: string) {
  try {
    return await auth.getUserByEmail(email);
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;
  }
}

/**
 * Gets a user by their UID
 * @param uid - User's UID
 * @returns The user record
 */
export async function getUserById(uid: string) {
  try {
    return await auth.getUser(uid);
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
}

/**
 * Creates a session cookie
 * @param idToken - The ID token to use
 * @param expiresIn - Cookie expiration in milliseconds
 * @returns The session cookie
 */
export async function createSessionCookie(idToken: string, expiresIn: number) {
  try {
    return await auth.createSessionCookie(idToken, { expiresIn });
  } catch (error) {
    console.error("Error creating session cookie:", error);
    throw error;
  }
}

/**
 * Verifies a session cookie
 * @param sessionCookie - The session cookie to verify
 * @returns The decoded claims
 */
export async function verifySessionCookie(sessionCookie: string) {
  try {
    return await auth.verifySessionCookie(sessionCookie, true);
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    throw error;
  }
}
