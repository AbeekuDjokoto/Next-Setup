import { CONFIG } from '@/config/config';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: CONFIG.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: CONFIG.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: CONFIG.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: CONFIG.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: CONFIG.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: CONFIG.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: CONFIG.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const storage = getStorage(app);
