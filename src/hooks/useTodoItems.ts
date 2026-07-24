import { useFirebaseList } from './useFirebaseList';
import type { TodoItem } from '../types';

export function useTodoItems() {
	return useFirebaseList<TodoItem>('todos');
}
