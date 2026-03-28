import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Safe export for messaging to prevent startup crash
let messaging = null;

// Only initialize messaging if supported (prevents blank screen)
const initMessaging = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    try {
      messaging = getMessaging(app);
      return messaging;
    } catch (e) {
      console.error("Firebase Messaging Error:", e);
      return null;
    }
  }
  return null;
};

// Map standard Firebase functions to your app's custom names
const onForegroundMessage = (callback) => {
  if (messaging) return onMessage(messaging, callback);
  return null;
};

const requestFCMToken = async () => {
  const m = await initMessaging();
  if (m) return getToken(m, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
  return null;
};

export { app, auth, db, messaging, onForegroundMessage, requestFCMToken };
