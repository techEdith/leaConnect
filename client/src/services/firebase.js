// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);