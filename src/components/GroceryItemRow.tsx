import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import type { Category, GroceryItem } from '../types';
import { PRIORITY_LABELS } from '../types';
import { CATEGORY_ICONS, PRIORITY_ICONS } from '../icons';
import Checkbox from './Checkbox';
import Badge from './Badge';
import type { BadgeTone } from './Badge';
import Button from './Button';

type GroceryItemRowProps = {
	item: GroceryItem;
	onToggleDone: () => void;
	onEdit: () => void;
	onDelete: () => void;
};

const CATEGORY_TONES: Record<Category, BadgeTone> = {
	Tesco: 'blue',
	DM: 'pink',
	Fressnapf: 'orange',
	CBA: 'red',
	Auchan: 'rose',
	OBI: 'amber',
	Kertészet: 'green',
};

function GroceryItemRow({ item, onToggleDone, onEdit, onDelete }: GroceryItemRowProps) {
	return (
		<li className="flex items-center gap-3 border-b border-gray-200 px-3 py-2 last:border-0 dark:border-gray-700">
			<Checkbox checked={item.done} onChange={onToggleDone} aria-label="Kész" />
			<span
				className={`min-w-0 flex-1 truncate text-sm ${
					item.done ? 'text-gray-400 line-through dark:text-gray-500' : 'text-gray-900 dark:text-gray-100'
				}`}
			>
				{item.name}
			</span>
			<Badge label={item.category} tone={CATEGORY_TONES[item.category]} icon={CATEGORY_ICONS[item.category]} />
			<Badge label={PRIORITY_LABELS[item.priority]} tone={item.priority} icon={PRIORITY_ICONS[item.priority]} />
			<div className="flex gap-1">
				<Button variant="icon" aria-label="Szerkesztés" onClick={onEdit}>
					<PencilIcon className="h-4 w-4" />
				</Button>
				<Button variant="icon" aria-label="Törlés" onClick={onDelete}>
					<TrashIcon className="h-4 w-4" />
				</Button>
			</div>
		</li>
	);
}

export default GroceryItemRow;
