import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'icon';

type ButtonProps = {
	variant?: ButtonVariant;
	children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
	primary:
		'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-800 dark:disabled:text-gray-600',
	secondary:
		'inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800',
	icon: 'inline-flex items-center justify-center rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200',
};

function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			className={`transition-colors ${VARIANT_CLASSES[variant]} ${className} cursor-pointer`}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
