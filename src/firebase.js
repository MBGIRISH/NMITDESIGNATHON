import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:123456789:web:abcdef123456"
};

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  return process.env.REACT_APP_FIREBASE_API_KEY && 
         process.env.REACT_APP_FIREBASE_PROJECT_ID &&
         !process.env.REACT_APP_FIREBASE_API_KEY.includes('YOUR_');
};

// Initialize Firebase
let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Add better error handling for authentication
  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase is not properly configured. Please update your .env file with actual Firebase credentials.');
  } else {
    console.log('✅ Firebase initialized successfully with project:', firebaseConfig.projectId);
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Provide more specific error guidance
  if (error.code === 'auth/configuration-not-found') {
    console.error('❌ Authentication not configured. Please enable Email/Password authentication in Firebase Console.');
  }
}

export { auth, db, isFirebaseConfigured };

export const dustbinsRef = (binId = '') => {
  return `dustbins/${binId || ''}`;
};

export const usersRef = (userId = '') => {
  return `users/${userId || ''}`;
};
