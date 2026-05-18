import {
  FCM_NOTIFICATION_ICON,
  FIREBASE_SDK_VERSION,
  getFirebaseSwConfig,
} from "@/constants/firebase";

export const buildFirebaseMessagingSwScript = (): string => {
  const configJson = JSON.stringify(getFirebaseSwConfig());
  const icon = FCM_NOTIFICATION_ICON;

  return `
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetPath = event.notification.data?.url ?? '/';
  const targetUrl = new URL(targetPath, self.location.origin).href;

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) {
          if ('navigate' in client) {
            return client.navigate(targetUrl).then(() => client.focus());
          }
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    }),
  );
});

importScripts('https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/${FIREBASE_SDK_VERSION}/firebase-messaging-compat.js');

firebase.initializeApp(${configJson});

const messaging = firebase.messaging();

const readDataField = (data, keys) => {
  if (!data) return '';
  for (const key of keys) {
    const value = data[key];
    if (value !== undefined && value !== '') return String(value);
  }
  return '';
};

const parsePayload = (payload) => {
  const data = payload.data ?? {};
  const title =
    (payload.notification?.title ??
      readDataField(data, ['title', 'subject'])) ||
    '알림';
  const body =
    (payload.notification?.body ??
      readDataField(data, ['body', 'message', 'content'])) ||
    '';
  const url =
    readDataField(data, ['url', 'click_action', 'link']) ||
    payload.fcmOptions?.link ||
    '/';

  return { title, body, url };
};

const showFcmNotification = (payload) => {
  const { title, body, url } = parsePayload(payload);
  const tag = readDataField(payload.data ?? {}, ['tag']) || payload.collapseKey || 'accompany-fcm';

  return self.registration.showNotification(title, {
    body,
    icon: '${icon}',
    badge: '${icon}',
    tag,
    renotify: true,
    data: { url },
  });
};

messaging.onBackgroundMessage((payload) => {
  console.log('[FCM] Background message:', payload);
  return showFcmNotification(payload);
});
`.trim();
};
