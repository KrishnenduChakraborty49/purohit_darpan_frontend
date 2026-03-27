// Firebase Service Worker for background push notifications
// Place this file at: frontend/public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey:            self.FIREBASE_API_KEY || '',
  authDomain:        self.FIREBASE_AUTH_DOMAIN || '',
  projectId:         self.FIREBASE_PROJECT_ID || '',
  storageBucket:     self.FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: self.FIREBASE_MESSAGING_SENDER_ID || '',
  appId:             self.FIREBASE_APP_ID || '',
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification || {};
  const data = payload.data || {};

  self.registration.showNotification(title || 'Purohit Darpan', {
    body: body || '',
    icon: icon || '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    data: { url: data.url || '/' },
    tag: data.tag || 'pd-notification',
    requireInteraction: false,
    actions: [
      { action: 'open', title: '🪔 Open Puja' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  });
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const urlToOpen = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      const existingClient = windowClients.find(
        (client) => client.url.includes(self.location.origin)
      );
      if (existingClient) {
        existingClient.focus();
        existingClient.navigate(urlToOpen);
      } else {
        clients.openWindow(urlToOpen);
      }
    })
  );
});
