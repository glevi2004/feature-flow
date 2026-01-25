import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

// Initialize Firebase Admin SDK
let adminDb: any;
let adminAuth: any;
let adminStorage: any;

if (!getApps().length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  
  if (privateKey && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  } else {
    // During build time or if env vars are missing, we don't want to throw
    // but we should log a warning if we're not in a build environment
    if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PHASE !== 'phase-production-build') {
      console.warn("Firebase Admin environment variables are missing.");
    }
  }
}

if (getApps().length) {
  adminDb = getFirestore();
  adminAuth = getAuth();
  adminStorage = getStorage();
}

export { adminDb, adminAuth, adminStorage };
