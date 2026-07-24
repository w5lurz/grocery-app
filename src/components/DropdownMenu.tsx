import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Button from './Button';

type DropdownMenuOption<T extends string> = {
	value: T;
	label: string;
};

type DropdownMenuProps<T extends string> = {
	trigger: ReactNode;
	value: T;
	options: DropdownMenuOption<T>[];
	onChange: (value: T) => void;
	'aria-label'?: string;
};

function DropdownMenu<T extends string>({ trigger, value, options, onChange, 'aria-label': ariaLabel }: DropdownMenuProps<T>) {
	const [isOpen, setIsOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

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
		<div ref={containerRef} className="relative">
			<Button
				variant="icon"
				aria-label={ariaLabel}
				aria-haspopup="menu"
				aria-expanded={isOpen}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				{trigger}
			</Button>
			{isOpen && (
				<ul
					role="menu"
					className="absolute right-0 z-10 mt-1 min-w-[10rem] rounded-md border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
				>
					{options.map((option) => (
						<li key={option.value} role="none">
							<button
								type="button"
								role="menuitemradio"
								aria-checked={option.value === value}
								onClick={() => {
									onChange(option.value);
									setIsOpen(false);
								}}
								className={`block w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 ${
									option.value === value
										? 'font-semibold text-purple-600 dark:text-purple-400'
										: 'text-gray-700 dark:text-gray-200'
								}`}
							>
								{option.label}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default DropdownMenu;
