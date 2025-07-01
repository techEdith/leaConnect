// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Firebase configuration for future integration
// This file sets up the structure for Firebase integration


// Firebase configuration will be loaded from environment variables
const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// For now, we'll use the REST API instead of Firebase directly
// This allows the app to work with the current backend setup
export const isFirebaseConfigured = () => {
  return Object.values(firebaseConfig).every(value => value !== "");
};

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

const API_BASE_URL = 'http://localhost:3001/api';

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
