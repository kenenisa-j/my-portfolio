import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// I have placed your actual keys here to ensure it works 100%
const firebaseConfig = {
  apiKey: "AIzaSyD7rtFGm2sLvzv36JJycgqI9U8FAYhfWZA",
  authDomain: "portfolio-26307.firebaseapp.com",
  projectId: "portfolio-26307",
  storageBucket: "portfolio-26307.firebasestorage.app",
  messagingSenderId: "1057995350281",
  appId: "1:1057995350281:web:5d01cc55d0e7135378f3d8",
};

// Initialize Firebase (Checks if it's already running to prevent errors)
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(firebase_app);
export const auth = getAuth(firebase_app);
export const storage = getStorage(firebase_app);

export default firebase_app;
