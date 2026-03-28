import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, isSupported, onMessage, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dummy",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dummy",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "dummy",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "dummy",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "dummy"
};

let app, auth, db;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (e) {
  console.warn("Firebase Init Suppressed:", e.message);
}

let messaging = null;

const onForegroundMessage = (callback) => {
  if (messaging && typeof onMessage === "function") {
    try {
      return onMessage(messaging, callback);
    } catch (e) { return null; }
  }
  return null;
};

const requestFCMToken = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    try {
      const m = getMessaging(app);
      return await getToken(m, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY });
    } catch (e) { return null; }
  }
  return null;
};

export { app, auth, db, messaging, onForegroundMessage, requestFCMToken };
