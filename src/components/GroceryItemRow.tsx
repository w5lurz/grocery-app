import {
	PencilIcon,
	TrashIcon,
	ArrowUpIcon,
	MinusIcon,
	ArrowDownIcon,
	ShoppingCartIcon,
	SparklesIcon,
	HeartIcon,
	ShoppingBagIcon,
	BuildingStorefrontIcon,
	WrenchScrewdriverIcon,
	SunIcon,
} from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';
import type { Category, GroceryItem, Priority } from '../types';
import { PRIORITY_LABELS } from '../types';
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

const PRIORITY_ICONS: Record<Priority, ReactNode> = {
	high: <ArrowUpIcon />,
	medium: <MinusIcon />,
	low: <ArrowDownIcon />,
};

const CATEGORY_META: Record<Category, { icon: ReactNode; tone: BadgeTone }> = {
	Tesco: { icon: <ShoppingCartIcon />, tone: 'blue' },
	DM: { icon: <SparklesIcon />, tone: 'pink' },
	Fressnapf: { icon: <HeartIcon />, tone: 'orange' },
	CBA: { icon: <ShoppingBagIcon />, tone: 'red' },
	Auchan: { icon: <BuildingStorefrontIcon />, tone: 'rose' },
	OBI: { icon: <WrenchScrewdriverIcon />, tone: 'amber' },
	Kertészet: { icon: <SunIcon />, tone: 'green' },
};

function GroceryItemRow({ item, onToggleDone, onEdit, onDelete }: GroceryItemRowProps) {
	const categoryMeta = CATEGORY_META[item.category];

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
			<Badge label={item.category} tone={categoryMeta.tone} icon={categoryMeta.icon} />
			<Badge label={PRIORITY_LABELS[item.priority]} tone={item.priority} icon={PRIORITY_ICONS[item.priority]} />
			<Button variant="icon" aria-label="Szerkesztés" onClick={onEdit}>
				<PencilIcon className="h-4 w-4" />
			</Button>
			<Button variant="icon" aria-label="Törlés" onClick={onDelete}>
				<TrashIcon className="h-4 w-4" />
			</Button>
		</li>
	);
}

export default GroceryItemRow;
