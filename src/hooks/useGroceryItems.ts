import { useEffect, useState } from 'react';
import { onValue, ref, remove, set, update } from 'firebase/database';
import { db } from '../firebase';
import type { GroceryItem } from '../types';
import { generateId } from '../utils';

const GROCERIES_PATH = 'groceries';
const CACHE_KEY = 'grocery-items-cache';

function readCache(): GroceryItem[] {
	const cached = localStorage.getItem(CACHE_KEY);
	return cached ? (JSON.parse(cached) as GroceryItem[]) : [];
}

export function useGroceryItems() {
	const [items, setItems] = useState<GroceryItem[]>(readCache);
	const [loading, setLoading] = useState(() => items.length === 0);

	useEffect(() => {
		const groceriesRef = ref(db, GROCERIES_PATH);
		const unsubscribe = onValue(groceriesRef, (snapshot) => {
			const value = snapshot.val() as Record<string, GroceryItem> | null;
			const nextItems = value ? Object.values(value) : [];
			setItems(nextItems);
			setLoading(false);
			localStorage.setItem(CACHE_KEY, JSON.stringify(nextItems));
		});
		return () => unsubscribe();
	}, []);

	const addItem = (values: Omit<GroceryItem, 'id'>) => {
		const id = generateId();
		void set(ref(db, `${GROCERIES_PATH}/${id}`), { ...values, id });
	};

	const editItem = (id: string, values: Partial<GroceryItem>) => {
		void update(ref(db, `${GROCERIES_PATH}/${id}`), values);
	};

	const deleteItem = (id: string) => {
		void remove(ref(db, `${GROCERIES_PATH}/${id}`));
	};

	return { items, loading, addItem, editItem, deleteItem };
}
