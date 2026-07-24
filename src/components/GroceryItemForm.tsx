import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Category, Priority } from '../types';
import { CATEGORIES, PRIORITY_OPTIONS } from '../types';
import Select from './Select';
import Button from './Button';

export type GroceryItemFormValues = {
	name: string;
	category: Category;
	priority: Priority;
};

type GroceryItemFormProps = {
	initialValues?: GroceryItemFormValues;
	submitLabel: string;
	existingNames: string[];
	onSubmit: (values: GroceryItemFormValues) => void;
	onCancel: () => void;
};

const CATEGORY_OPTIONS = CATEGORIES.map((category) => ({ value: category, label: category }));

function GroceryItemForm({ initialValues, submitLabel, existingNames, onSubmit, onCancel }: GroceryItemFormProps) {
	const [name, setName] = useState(initialValues?.name ?? '');
	const [category, setCategory] = useState<Category>(initialValues?.category ?? 'Tesco');
	const [priority, setPriority] = useState<Priority>(initialValues?.priority ?? 'high');
	const [error, setError] = useState<string | null>(null);

	const isValid = name.trim().length > 0;

	const handleNameChange = (value: string) => {
		setName(value);
		setError(null);
	};

	const handleSubmit = () => {
		if (!isValid) return;
		const trimmedName = name.trim();
		const isDuplicate = existingNames.some(
			(existingName) => existingName.toLowerCase() === trimmedName.toLowerCase(),
		);
		if (isDuplicate) {
			setError('Már van ilyen nevű tétel a listában.');
			return;
		}
		onSubmit({ name: trimmedName, category, priority });
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit();
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-wrap items-center gap-2">
				<Select value={category} onChange={setCategory} options={CATEGORY_OPTIONS} aria-label="Kategória" />
				<Select value={priority} onChange={setPriority} options={PRIORITY_OPTIONS} aria-label="Prioritás" />
				<input
					type="text"
					value={name}
					onChange={(event) => handleNameChange(event.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Tétel neve"
					autoFocus
					className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-base text-gray-900 focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
				/>
				{error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
				<div className="ml-auto flex gap-2">
					<Button variant="secondary" onClick={onCancel}>
						Mégse
					</Button>
					<Button variant="primary" disabled={!isValid} onClick={handleSubmit}>
						{submitLabel}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default GroceryItemForm;
