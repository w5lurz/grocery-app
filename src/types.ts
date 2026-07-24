export type User = 'Tamás' | 'Julcsi';

export type Category = 'Tesco' | 'DM' | 'Fressnapf' | 'CBA' | 'Auchan' | 'OBI' | 'Kertészet';

export const CATEGORIES: Category[] = ['Tesco', 'DM', 'Fressnapf', 'CBA', 'Auchan', 'OBI', 'Kertészet'];

export type Priority = 'high' | 'medium' | 'low';

export const PRIORITY_LABELS: Record<Priority, string> = {
	high: 'Nagyon fontos',
	medium: 'Aránylag fontos',
	low: 'Ráérős',
};

export const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
	{ value: 'high', label: PRIORITY_LABELS.high },
	{ value: 'medium', label: PRIORITY_LABELS.medium },
	{ value: 'low', label: PRIORITY_LABELS.low },
];

export const PRIORITY_ORDER: Record<Priority, number> = {
	high: 0,
	medium: 1,
	low: 2,
};

export type GroceryItem = {
	id: string;
	name: string;
	category: Category;
	priority: Priority;
	done: boolean;
	createdAt: number;
	addedBy: User;
	lastEditedBy: User;
};

export type SortBy = 'default' | 'category' | 'priority';

export const SORT_OPTIONS: { value: SortBy; label: string }[] = [
	{ value: 'default', label: 'Alapértelmezett' },
	{ value: 'category', label: 'Kategória szerint' },
	{ value: 'priority', label: 'Prioritás szerint' },
];
