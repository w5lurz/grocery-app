import type { ReactNode } from 'react';
import {
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
	HomeIcon,
	TruckIcon,
	TrophyIcon,
	BeakerIcon,
} from '@heroicons/react/24/outline';
import type { Category, Priority, TodoCategory } from './types';

const leafIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M11 20a7 7 0 0 1-1.2-13.9C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
		/>
		<path strokeLinecap="round" strokeLinejoin="round" d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
	</svg>
);

export const CATEGORY_ICONS: Record<Category, ReactNode> = {
	Tesco: <ShoppingCartIcon />,
	DM: <SparklesIcon />,
	Fressnapf: <HeartIcon />,
	CBA: <ShoppingBagIcon />,
	BioBolt: leafIcon,
	Decathlon: <TrophyIcon />,
	Auchan: <BuildingStorefrontIcon />,
	OBI: <WrenchScrewdriverIcon />,
	Kertészet: <SunIcon />,
	Gyogyó: <BeakerIcon />,
};

export const PRIORITY_ICONS: Record<Priority, ReactNode> = {
	high: <ArrowUpIcon />,
	medium: <MinusIcon />,
	low: <ArrowDownIcon />,
};

export const TODO_CATEGORY_ICONS: Record<TodoCategory, ReactNode> = {
	Ház: <HomeIcon />,
	Kert: leafIcon,
	Autó: <TruckIcon />,
};
