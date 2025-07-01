// Firebase configuration for future integration
// This file sets up the structure for Firebase integration

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Firebase configuration will be loaded from environment variables
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// Check if Firebase is configured
export const isFirebaseConfigured = () => {
  return Object.values(firebaseConfig).every(value => value !== "");
};

// Initialize Firebase only if config is available
let app: any = null;
let analytics: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;

if (isFirebaseConfigured()) {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { auth, db, storage };

// For now, we'll use the REST API instead of Firebase directly
// This allows the app to work with the current backend setup

// Firebase service functions (to be implemented when Firebase is set up)
export const saveOnboardingData = async (userId: number, data: any) => {
  // For now, use the REST API
  const response = await fetch(`/api/user/${userId}/complete-onboarding`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to save onboarding data');
  }

  return response.json();
};

export const getUserProfile = async (userId: number) => {
  const response = await fetch(`/api/user/${userId}/profile`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
};

const API_BASE_URL = '/api';

export const getLanguages = async () => {
  const response = await fetch(`${API_BASE_URL}/languages`);

  if (!response.ok) {
    throw new Error('Failed to fetch languages');
  }

  return response.json();
};

export const getDialects = async (languageId: number) => {
  const response = await fetch(`${API_BASE_URL}/languages/${languageId}/dialects`);

  if (!response.ok) {
    throw new Error('Failed to fetch dialects');
  }

  return response.json();
};