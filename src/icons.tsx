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
} from '@heroicons/react/24/outline';
import type { Category, Priority } from './types';

export const CATEGORY_ICONS: Record<Category, ReactNode> = {
	Tesco: <ShoppingCartIcon />,
	DM: <SparklesIcon />,
	Fressnapf: <HeartIcon />,
	CBA: <ShoppingBagIcon />,
	Auchan: <BuildingStorefrontIcon />,
	OBI: <WrenchScrewdriverIcon />,
	Kertészet: <SunIcon />,
};

export const PRIORITY_ICONS: Record<Priority, ReactNode> = {
	high: <ArrowUpIcon />,
	medium: <MinusIcon />,
	low: <ArrowDownIcon />,
};
