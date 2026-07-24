import { useState } from 'react';
import { PlusIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import type { GroceryItem, Priority, SortBy, User } from '../types';
import { CATEGORIES, PRIORITY_LABELS, SORT_OPTIONS } from '../types';
import Button from '../components/Button';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import DropdownMenu from '../components/DropdownMenu';
import GroceryItemForm from '../components/GroceryItemForm';
import GroceryItemRow from '../components/GroceryItemRow';
import type { GroceryItemFormValues } from '../components/GroceryItemForm';
import { useGroceryItems } from '../hooks/useGroceryItems';
import { notifyOtherUser } from '../notify';

const PRIORITIES_BY_ORDER: Priority[] = ['high', 'medium', 'low'];

type GroceryItemGroup = {
	key: string;
	label: string | null;
	items: GroceryItem[];
};

function groupItems(items: GroceryItem[], sortBy: SortBy): GroceryItemGroup[] {
	if (sortBy === 'category') {
		return CATEGORIES.map((category) => ({
			key: category,
			label: category,
			items: items.filter((item) => item.category === category),
		})).filter((group) => group.items.length > 0);
	}
	if (sortBy === 'priority') {
		return PRIORITIES_BY_ORDER.map((priority) => ({
			key: priority,
			label: PRIORITY_LABELS[priority],
			items: items.filter((item) => item.priority === priority),
		})).filter((group) => group.items.length > 0);
	}
	return [{ key: 'default', label: null, items }];
}

type GroceriesPageProps = {
	currentUser: User;
};

function GroceriesPage({ currentUser }: GroceriesPageProps) {
	const { items, loading, addItem, editItem, deleteItem } = useGroceryItems();
	const [isAdding, setIsAdding] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
	const [sortBy, setSortBy] = useState<SortBy>('category');
	const editingItem = items.find((item) => item.id === editingId) ?? null;
	const pendingDeleteItem = items.find((item) => item.id === pendingDeleteId) ?? null;
	const groups = groupItems(items, sortBy);

	const handleAdd = (values: GroceryItemFormValues) => {
		addItem({
			...values,
			done: false,
			createdAt: Date.now(),
			addedBy: currentUser,
			lastEditedBy: currentUser,
		});
		void notifyOtherUser(currentUser, 'Bevás', `${currentUser} hozzáadta: ${values.name}`);
		setIsAdding(false);
	};

	const handleEdit = (id: string, values: GroceryItemFormValues) => {
		editItem(id, { ...values, lastEditedBy: currentUser });
		setEditingId(null);
	};

	const handleToggleDone = (id: string) => {
		const item = items.find((item) => item.id === id);
		if (!item) return;
		editItem(id, { done: !item.done });
		if (!item.done) {
			void notifyOtherUser(currentUser, 'Bevás', `${currentUser} kipipálta: ${item.name}`);
		}
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
				<h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Bevás</h1>
				<div className="flex items-center gap-2">
					<DropdownMenu
						trigger={<AdjustmentsHorizontalIcon className="h-5 w-5" />}
						value={sortBy}
						options={SORT_OPTIONS}
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
								<GroceryItemRow
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
						{loading ? 'Betöltés…' : 'Nincs még tétel'}
					</li>
				)}
			</ul>

			{isAdding && (
				<Modal title="Új tétel" onClose={() => setIsAdding(false)}>
					<GroceryItemForm
						submitLabel="Hozzáad"
						existingNames={items.map((item) => item.name)}
						onSubmit={handleAdd}
						onCancel={() => setIsAdding(false)}
					/>
				</Modal>
			)}

			{editingItem && (
				<Modal title="Tétel szerkesztése" onClose={() => setEditingId(null)}>
					<GroceryItemForm
						initialValues={{
							name: editingItem.name,
							category: editingItem.category,
							priority: editingItem.priority,
						}}
						submitLabel="Mentés"
						existingNames={items.filter((item) => item.id !== editingItem.id).map((item) => item.name)}
						onSubmit={(values) => handleEdit(editingItem.id, values)}
						onCancel={() => setEditingId(null)}
					/>
				</Modal>
			)}

			{pendingDeleteItem && (
				<ConfirmDialog
					title="Törlés megerősítése"
					message="Tutkó törlöd diló? Még meg sincs véve."
					confirmLabel="Törlés"
					cancelLabel="Mégse"
					onConfirm={handleConfirmDelete}
					onCancel={() => setPendingDeleteId(null)}
				/>
			)}
		</div>
	);
}

export default GroceriesPage;
