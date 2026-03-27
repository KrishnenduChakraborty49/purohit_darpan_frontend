import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

/**
 * Request notification permission and get FCM token.
 * Returns token string or null if permission denied.
 */
export async function requestFCMToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });

    if (!token) { console.warn('FCM token not received. Ensure your VAPID key is correct in .env.local'); }
    return token || null;
  } catch (err) {
    console.error('FCM token error:', err);
    return null;
  }
}

/**
 * Listen for foreground messages while app is open.
 */
export function onForegroundMessage(callback) {
  return onMessage(messaging, callback);
}

export default app;


