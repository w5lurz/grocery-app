import { useState } from 'react';
import { PlusIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import type { TodoItem, TodoSortBy, User } from '../types';
import { TODO_CATEGORIES, TODO_SORT_OPTIONS } from '../types';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import DropdownMenu from '../components/DropdownMenu';
import TodoItemForm from '../components/TodoItemForm';
import TodoItemRow from '../components/TodoItemRow';
import type { TodoItemFormValues } from '../components/TodoItemForm';
import { useTodoItems } from '../hooks/useTodoItems';

type TodoItemGroup = {
	key: string;
	label: string | null;
	items: TodoItem[];
};

function groupItems(items: TodoItem[], sortBy: TodoSortBy): TodoItemGroup[] {
	if (sortBy === 'category') {
		return TODO_CATEGORIES.map((category) => ({
			key: category,
			label: category,
			items: items.filter((item) => item.category === category),
		})).filter((group) => group.items.length > 0);
	}
	return [{ key: 'default', label: null, items }];
}

type TodoPageProps = {
	currentUser: User;
};

function TodoPage({ currentUser }: TodoPageProps) {
	const { items, loading, addItem, editItem, deleteItem } = useTodoItems();
	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
	const [sortBy, setSortBy] = useState<TodoSortBy>('category');
	const editingItem = items.find((item) => item.id === editingId) ?? null;
	const pendingDeleteItem = items.find((item) => item.id === pendingDeleteId) ?? null;
	const groups = groupItems(items, sortBy);

	const handleAdd = (values: TodoItemFormValues) => {
		addItem({
			...values,
			done: false,
			createdAt: Date.now(),
			addedBy: currentUser,
			lastEditedBy: currentUser,
		});
		setIsAdding(false);
	};

	const handleEdit = (id: string, values: TodoItemFormValues) => {
		editItem(id, { ...values, lastEditedBy: currentUser });
		setEditingId(null);
	};

	const handleToggleDone = (id: string) => {
		const item = items.find((item) => item.id === id);
		if (!item) return;
		editItem(id, { done: !item.done });
	};

	const handleDeleteRequest = (id: string) => {
		const item = items.find((item) => item.id === id);
		if (!item) return;
		if (item.done) {
			deleteItem(id);
			return;
		}
		setPendingDeleteId(id);
	};

	const handleConfirmDelete = () => {
		if (pendingDeleteId) deleteItem(pendingDeleteId);
		setPendingDeleteId(null);
	};

	return (
		<div className="mx-auto max-w-2xl p-4">
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Todo</h1>
				<div className="flex items-center gap-2">
					<DropdownMenu
						trigger={<AdjustmentsHorizontalIcon className="h-5 w-5" />}
						value={sortBy}
						options={TODO_SORT_OPTIONS}
						onChange={setSortBy}
						aria-label="Rendezés"
					/>
					<Button variant="primary" onClick={() => setIsAdding(true)}>
						<PlusIcon className="h-4 w-4" />
						Új
					</Button>
				</div>
			</div>
			<ul className="rounded-md border border-gray-200 dark:border-gray-700">
				{groups.map((group, index) => (
					<li key={group.key} className={index > 0 ? 'border-t-4 border-gray-100 dark:border-gray-800' : ''}>
						{group.label && (
							<div className="bg-gray-100 px-3 py-1.5 text-xs font-semibold tracking-wide text-gray-600 uppercase dark:bg-gray-800/60 dark:text-gray-400">
								{group.label}
							</div>
						)}
						<ul>
							{group.items.map((item) => (
								<TodoItemRow
									key={item.id}
									item={item}
									onToggleDone={() => handleToggleDone(item.id)}
									onEdit={() => setEditingId(item.id)}
									onDelete={() => handleDeleteRequest(item.id)}
								/>
							))}
						</ul>
					</li>
				))}
				{items.length === 0 && (
					<li className="px-3 py-6 text-center text-sm text-gray-400 dark:text-gray-500">
						{loading ? 'Betöltés…' : 'Nincs még teendő'}
					</li>
				)}
			</ul>

			{isAdding && (
				<Modal title="Új teendő" onClose={() => setIsAdding(false)}>
					<TodoItemForm submitLabel="Hozzáad" onSubmit={handleAdd} onCancel={() => setIsAdding(false)} />
				</Modal>
			)}

			{editingItem && (
				<Modal title="Teendő szerkesztése" onClose={() => setEditingId(null)}>
					<TodoItemForm
						initialValues={{ text: editingItem.text, category: editingItem.category }}
						submitLabel="Mentés"
						onSubmit={(values) => handleEdit(editingItem.id, values)}
						onCancel={() => setEditingId(null)}
					/>
				</Modal>
			)}

			{pendingDeleteItem && (
				<ConfirmDialog
					title="Törlés megerősítése"
					message="Tutkó törlöd diló? Még meg se csináltad."
					confirmLabel="Törlés"
					cancelLabel="Mégse"
					onConfirm={handleConfirmDelete}
					onCancel={() => setPendingDeleteId(null)}
				/>
			)}
		</div>
	);
}

export default TodoPage;
