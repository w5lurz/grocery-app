import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { TodoCategory } from '../types';
import { TODO_CATEGORIES } from '../types';
import { TODO_CATEGORY_ICONS } from '../icons';
import Select from './Select';
import Button from './Button';

export type TodoItemFormValues = {
	text: string;
	category: TodoCategory;
};

type TodoItemFormProps = {
	initialValues?: TodoItemFormValues;
	submitLabel: string;
	onSubmit: (values: TodoItemFormValues) => void;
	onCancel: () => void;
};

const CATEGORY_OPTIONS = TODO_CATEGORIES.map((category) => ({
	value: category,
	label: category,
	icon: TODO_CATEGORY_ICONS[category],
}));

function TodoItemForm({ initialValues, submitLabel, onSubmit, onCancel }: TodoItemFormProps) {
	const [text, setText] = useState(initialValues?.text ?? '');
	const [category, setCategory] = useState<TodoCategory>(initialValues?.category ?? 'Ház');

	const isValid = text.trim().length > 0;

	const handleSubmit = () => {
		if (!isValid) return;
		onSubmit({ text: text.trim(), category });
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit();
	};

	return (
		<div className="flex flex-col gap-3">
			<input
				type="text"
				value={text}
				onChange={(event) => setText(event.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Teendő"
				autoFocus
				className="w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-base text-gray-900 focus:border-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
			/>
			<Select value={category} onChange={setCategory} options={CATEGORY_OPTIONS} aria-label="Kategória" />
			<div className="flex justify-end gap-2">
				<Button variant="secondary" onClick={onCancel}>
					Mégse
				</Button>
				<Button variant="primary" disabled={!isValid} onClick={handleSubmit}>
					{submitLabel}
				</Button>
			</div>
		</div>
	);
}

export default TodoItemForm;
