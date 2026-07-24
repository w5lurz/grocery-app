import { get, ref } from 'firebase/database';
import { db } from './firebase';
import type { User } from './types';

const NOTIFY_URL = import.meta.env.VITE_NOTIFY_URL;
const NOTIFY_SECRET = import.meta.env.VITE_NOTIFY_SECRET;

function otherUser(currentUser: User): User {
	return currentUser === 'Tamás' ? 'Julcsi' : 'Tamás';
}

export async function notifyOtherUser(currentUser: User, title: string, body: string) {
	if (!NOTIFY_URL) return;

	const snapshot = await get(ref(db, `fcmTokens/${otherUser(currentUser)}`));
	const token = snapshot.val() as string | null;
	if (!token) return;

	void fetch(NOTIFY_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${NOTIFY_SECRET}`,
		},
		body: JSON.stringify({ token, title, body }),
	});
}
