import { useEffect, useState } from 'react';
import { onValue, ref, remove, set, update } from 'firebase/database';
import { authReady, db } from '../firebase';
import { generateId } from '../utils';

export function useFirebaseList<T extends { id: string }>(path: string) {
	const cacheKey = `${path}-cache`;

	function readCache(): T[] {
		const cached = localStorage.getItem(cacheKey);
		return cached ? (JSON.parse(cached) as T[]) : [];
	}

	const [items, setItems] = useState<T[]>(readCache);
	const [loading, setLoading] = useState(() => items.length === 0);

	useEffect(() => {
		let unsubscribe: (() => void) | undefined;

		void authReady.then(() => {
			const listRef = ref(db, path);
			unsubscribe = onValue(listRef, (snapshot) => {
				const value = snapshot.val() as Record<string, T> | null;
				const nextItems = value ? Object.values(value) : [];
				setItems(nextItems);
				setLoading(false);
				localStorage.setItem(cacheKey, JSON.stringify(nextItems));
			});
		});

		return () => unsubscribe?.();
	}, [path, cacheKey]);

	const addItem = (values: Omit<T, 'id'>) => {
		const id = generateId();
		void set(ref(db, `${path}/${id}`), { ...values, id });
	};

	const editItem = (id: string, values: Partial<T>) => {
		void update(ref(db, `${path}/${id}`), values);
	};

	const deleteItem = (id: string) => {
		void remove(ref(db, `${path}/${id}`));
	};

	return { items, loading, addItem, editItem, deleteItem };
}
