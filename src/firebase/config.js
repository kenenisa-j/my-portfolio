// Remove the console.log to avoid exposing the API key
// console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY); // Commented out for security

import { initializeApp, getApps } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// I have placed your actual keys here to ensure it works 100%
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (Checks if it's already running to prevent errors)
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// UPDATED: Forced long-polling to bypass WebSocket handshake timeouts/blocks on local networks
export const db = initializeFirestore(firebase_app, {
  experimentalForceLongPolling: true,
});

export const auth = getAuth(firebase_app);
export const storage = getStorage(firebase_app);

export default firebase_app;
