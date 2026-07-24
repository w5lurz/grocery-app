import type { VercelRequest, VercelResponse } from '@vercel/node';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

if (!getApps().length) {
	initializeApp({
		credential: cert({
			projectId: process.env.FIREBASE_PROJECT_ID,
			clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
			privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
		}),
	});
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
	if (req.method !== 'POST') {
		res.status(405).json({ error: 'Method not allowed' });
		return;
	}

	if (req.headers.authorization !== `Bearer ${process.env.NOTIFY_SECRET}`) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	const { token, title, body } = req.body as { token?: string; title?: string; body?: string };
	if (!token || !title || !body) {
		res.status(400).json({ error: 'Missing token, title, or body' });
		return;
	}

	try {
		await getMessaging().send({ token, notification: { title, body } });
		res.status(200).json({ ok: true });
	} catch (error) {
		res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
	}
}
