type MenuItemProps = {
	label: string;
	active?: boolean;
	onClick?: () => void;
};

function MenuItem({ label, active = false, onClick }: MenuItemProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
				active
					? "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200"
					: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
			}`}
		>
			{label}
		</button>
	);
}

export default MenuItem;
