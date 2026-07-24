import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type SelectOption<T extends string> = {
	value: T;
	label: string;
	icon?: ReactNode;
};

type SelectProps<T extends string> = {
	value: T;
	onChange: (value: T) => void;
	options: SelectOption<T>[];
	'aria-label'?: string;
};

function Select<T extends string>({ value, onChange, options, 'aria-label': ariaLabel }: SelectProps<T>) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);
	const selected = options.find((option) => option.value === value);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsOpen(false);
		};

		document.addEventListener('mousedown', handleClickOutside);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen]);

	return (
		<div ref={containerRef} className="relative w-full">
			<button
				type="button"
				aria-label={ariaLabel}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				onClick={() => setIsOpen((prev) => !prev)}
				className="flex w-full items-center gap-2 cursor-pointer rounded-md border border-gray-300 bg-white py-1.5 pr-9 pl-2 text-left text-sm text-gray-700 focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
			>
				{selected?.icon && <span className="h-4 w-4 shrink-0 [&>svg]:h-4 [&>svg]:w-4">{selected.icon}</span>}
				<span className="truncate">{selected?.label}</span>
			</button>
			<ChevronDownIcon
				className={`pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-transform dark:text-gray-400 ${
					isOpen ? 'rotate-180' : ''
				}`}
			/>
			{isOpen && (
				<ul
					role="listbox"
					aria-label={ariaLabel}
					className="absolute left-0 z-10 mt-1 w-full rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
				>
					{options.map((option) => (
						<li key={option.value} role="none">
							<button
								type="button"
								role="option"
								aria-selected={option.value === value}
								onClick={() => {
									onChange(option.value);
									setIsOpen(false);
								}}
								className={`flex w-full items-center cursor-pointer gap-2 px-3 py-1.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
									option.value === value
										? 'font-semibold text-purple-600 dark:text-purple-400'
										: 'text-gray-700 dark:text-gray-200'
								}`}
							>
								{option.icon && (
									<span className="h-4 w-4 shrink-0 [&>svg]:h-4 [&>svg]:w-4">{option.icon}</span>
								)}
								{option.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Select;
