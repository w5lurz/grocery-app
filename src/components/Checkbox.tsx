type CheckboxProps = {
	checked: boolean;
	onChange: () => void;
	'aria-label'?: string;
};

function Checkbox({ checked, onChange, 'aria-label': ariaLabel }: CheckboxProps) {
	return (
		<input
			type="checkbox"
			checked={checked}
			onChange={onChange}
			aria-label={ariaLabel}
			className="h-4 w-4 shrink-0 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800"
		/>
	);
}

export default Checkbox;
