import { useFirebaseList } from './useFirebaseList';
import type { GroceryItem } from '../types';

export function useGroceryItems() {
	return useFirebaseList<GroceryItem>('groceries');
}
