import { useEffect } from 'react';
import type { ReactNode } from 'react';

type ModalProps = {
	title: string;
	onClose: () => void;
	children: ReactNode;
};

function Modal({ title, onClose, children }: ModalProps) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [onClose]);

	return (
		<div
			className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4"
			onClick={onClose}
		>
			<div
				role="dialog"
				aria-modal="true"
				aria-label={title}
				onClick={(event) => event.stopPropagation()}
				className="my-8 w-full max-w-md rounded-lg bg-white p-4 shadow-xl dark:bg-gray-900"
			>
				<h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
				{children}
			</div>
		</div>
	);
}

export default Modal;
