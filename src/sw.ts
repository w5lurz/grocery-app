/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching';
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

declare let self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
	const title = payload.data?.title ?? 'Bevás';
	const body = payload.data?.body;
	void self.registration.showNotification(title, {
		body,
		icon: '/pwa-192.png',
	});
});
