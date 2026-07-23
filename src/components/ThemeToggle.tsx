import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

type ThemeToggleProps = {
	isDark: boolean;
	onToggle: () => void;
};

function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={isDark}
			aria-label="Sötét/világos mód váltása"
			onClick={onToggle}
			className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
				isDark ? 'bg-purple-600' : 'bg-gray-300'
			}`}
		>
			<span
				className={`inline-flex h-4 w-4 transform items-center justify-center rounded-full bg-white transition-transform ${
					isDark ? 'translate-x-6' : 'translate-x-1'
				}`}
			>
				{isDark ? (
					<MoonIcon className="h-3 w-3 text-purple-600" />
				) : (
					<SunIcon className="h-3 w-3 text-yellow-500" />
				)}
			</span>
		</button>
	);
}

export default ThemeToggle;
