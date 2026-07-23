type ChipProps = {
	label: string;
	selected?: boolean;
	onClick?: () => void;
};

function Chip({ label, selected = false, onClick }: ChipProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
				selected
					? "border-purple-600 bg-purple-600 text-white"
					: "border-gray-300 bg-white text-gray-600 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-500"
			}`}
		>
			{label}
		</button>
	);
}

export default Chip;
