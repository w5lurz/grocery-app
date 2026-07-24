import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

type SelectOption<T extends string> = {
	value: T;
	label: string;
};

type SelectProps<T extends string> = {
	value: T;
	onChange: (value: T) => void;
	options: SelectOption<T>[];
	'aria-label'?: string;
};

function Select<T extends string>({ value, onChange, options, 'aria-label': ariaLabel }: SelectProps<T>) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative inline-block">
			<select
				value={value}
				aria-label={ariaLabel}
				onChange={(event) => onChange(event.target.value as T)}
				onFocus={() => setIsOpen(true)}
				onBlur={() => setIsOpen(false)}
				className="appearance-none rounded-md border border-gray-300 bg-white py-1.5 pr-9 pl-2 text-sm text-gray-700 focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<ChevronDownIcon
				className={`pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-transform dark:text-gray-400 ${
					isOpen ? 'rotate-180' : ''
				}`}
			/>
		</div>
	);
}

export default Select;
