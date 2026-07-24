import { useEffect, useState } from 'react';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';
import { ref, set } from 'firebase/database';
import { app, db } from '../firebase';
import type { User } from '../types';

async function registerToken(user: User) {
	const supported = await isSupported();
	if (!supported) return;

	const registration = await navigator.serviceWorker.ready;
	const messaging = getMessaging(app);
	const token = await getToken(messaging, {
		vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
		serviceWorkerRegistration: registration,
	});
	if (token) {
		await set(ref(db, `fcmTokens/${user}`), token);
	}
}

export function useNotifications(currentUser: User) {
	const [permission, setPermission] = useState<NotificationPermission>(
		typeof Notification !== 'undefined' ? Notification.permission : 'default',
	);

	useEffect(() => {
		if (permission === 'granted') {
			void registerToken(currentUser);
		}
	}, [currentUser, permission]);

	const requestPermission = async () => {
		const supported = await isSupported();
		if (!supported) return;
		const result = await Notification.requestPermission();
		setPermission(result);
	};

	return { permission, requestPermission };
}
