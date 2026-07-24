import type { ReactNode } from 'react';

export type BadgeTone =
	| 'neutral'
	| 'high'
	| 'medium'
	| 'low'
	| 'blue'
	| 'pink'
	| 'orange'
	| 'red'
	| 'rose'
	| 'amber'
	| 'green';

type BadgeProps = {
	label: string;
	tone?: BadgeTone;
	icon?: ReactNode;
};

const TONE_CLASSES: Record<BadgeTone, string> = {
	neutral: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300',
	high: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
	medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200',
	low: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
	blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
	pink: 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-200',
	orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200',
	red: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200',
	rose: 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-200',
	amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200',
	green: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
};

function Badge({ label, tone = 'neutral', icon }: BadgeProps) {
	if (icon) {
		return (
			<span
				title={label}
				className={`flex shrink-0 items-center gap-1 rounded-full p-1 sm:px-2 sm:py-0.5 ${TONE_CLASSES[tone]}`}
			>
				<span className="h-3 w-3 shrink-0 [&>svg]:h-3 [&>svg]:w-3">{icon}</span>
				<span className="hidden text-xs font-medium sm:inline">{label}</span>
			</span>
		);
	}

	return <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}>{label}</span>;
}

export default Badge;
