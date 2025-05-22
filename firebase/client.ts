// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Initialize Firebase services
const firebaseAuth = getAuth(firebaseApp);

// Initialize Firestore with better settings
let firestoreDb;

// Check if we're in a browser environment
if (typeof window !== "undefined") {
  try {
    // Try to get the existing Firestore instance first
    try {
      firestoreDb = getFirestore(firebaseApp);
    } catch (e) {
      // If it doesn't exist, initialize with custom settings
      firestoreDb = initializeFirestore(firebaseApp, {
        cacheSizeBytes: CACHE_SIZE_UNLIMITED,
        experimentalForceLongPolling: true, // This can help with some connection issues
      });
    }
  } catch (error) {
    console.error("Error initializing Firestore with custom settings:", error);
    // Fallback to default initialization
    firestoreDb = getFirestore(firebaseApp);
  }
} else {
  // Server-side initialization (simpler)
  firestoreDb = getFirestore(firebaseApp);
}

const firebaseStorage = getStorage(firebaseApp);

// Initialize Analytics (only in browser environment)
let firebaseAnalytics = null;
if (typeof window !== "undefined") {
  try {
    firebaseAnalytics = getAnalytics(firebaseApp);
  } catch (error) {
    console.error("Analytics initialization error:", error);
  }
}

// Export Firebase services
export const app = firebaseApp;
export const auth = firebaseAuth;
export const firestore = firestoreDb;
export const storage = firebaseStorage;
export const analytics = firebaseAnalytics;
