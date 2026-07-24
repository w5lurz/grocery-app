import Modal from './Modal';
import Button from './Button';

type ConfirmDialogProps = {
	title: string;
	message: string;
	confirmLabel: string;
	cancelLabel: string;
	onConfirm: () => void;
	onCancel: () => void;
};

function ConfirmDialog({ title, message, confirmLabel, cancelLabel, onConfirm, onCancel }: ConfirmDialogProps) {
	return (
		<Modal title={title} onClose={onCancel}>
			<p className="mb-4 text-sm text-gray-700 dark:text-gray-300">{message}</p>
			<div className="flex justify-end gap-2">
				<Button variant="secondary" onClick={onCancel}>
					{cancelLabel}
				</Button>
				<Button variant="primary" onClick={onConfirm}>
					{confirmLabel}
				</Button>
			</div>
		</Modal>
	);
}

export default ConfirmDialog;
