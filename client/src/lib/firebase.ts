
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

// Use the same Firebase configuration as in services/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyC5G-r0Rrq2V-DWwn5rjVGc4fefHgN0dC8",
  authDomain: "leaconnectdb.firebaseapp.com",
  databaseURL: "https://leaconnectdb-default-rtdb.firebaseio.com",
  projectId: "leaconnectdb",
  storageBucket: "leaconnectdb.firebasestorage.app",
  messagingSenderId: "1004261904619",
  appId: "1:1004261904619:web:efded380fcc912fa53eeae",
  measurementId: "G-6557XR2YPQ"
};

// Check if Firebase is configured
export const isFirebaseConfigured = () => {
  return Object.values(firebaseConfig).every(value => value !== "");
};

// Initialize Firebase only if no app exists, otherwise use existing app
let app;
let analytics = null;
let auth = null;
let db = null;
let storage = null;

if (isFirebaseConfigured()) {
  // Check if Firebase app already exists, if not create it
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  
  // Only initialize analytics in browser environment
  if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }
  
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
}

export { auth, db, storage, analytics };

// API service functions for onboarding integration
export const saveOnboardingData = async (userId: number, data: any) => {
  try {
    const response = await fetch(`/api/user/${userId}/complete-onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to save onboarding data: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: number) => {
  try {
    const response = await fetch(`/api/user/${userId}/profile`);

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

const API_BASE_URL = '/api';

export const getLanguages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/languages`);

    if (!response.ok) {
      throw new Error(`Failed to fetch languages: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

export const getDialects = async (languageId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/languages/${languageId}/dialects`);

    if (!response.ok) {
      throw new Error(`Failed to fetch dialects: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching dialects:', error);
    throw error;
  }
};

export const googleProvider = new GoogleAuthProvider();

// User profile management functions
export const saveUserProfile = async (userId: string, profileData: {
  firstName: string;
  lastName: string;
  email: string;
  onboardingCompleted: boolean;
}) => {
  if (!db) {
    throw new Error('Firebase not configured');
  }

  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profileData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error saving user profile:', error);
    throw error;
  }
};

export const getUserProfileFromFirebase = async (userId: string) => {
  if (!db) {
    throw new Error('Firebase not configured');
  }

  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const saveOnboardingToFirebase = async (userId: string, onboardingData: any) => {
  if (!db) {
    throw new Error('Firebase not configured');
  }

  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      onboardingData: onboardingData,
      onboardingCompleted: true,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error saving onboarding data:', error);
    throw error;
  }
};

export const updateUserPreferences = async (userId: string, preferences: any) => {
  if (!db) {
    throw new Error('Firebase not configured');
  }

  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      onboardingData: preferences,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};
