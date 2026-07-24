import { BellIcon, BellSlashIcon } from '@heroicons/react/24/outline';
import Button from './Button';

type NotificationToggleProps = {
	permission: NotificationPermission;
	onRequest: () => void;
};

function NotificationToggle({ permission, onRequest }: NotificationToggleProps) {
	if (permission === 'granted') {
		return (
			<span className="p-1.5 text-gray-400 dark:text-gray-500" title="Értesítések engedélyezve">
				<BellIcon className="h-5 w-5" />
			</span>
		);
	}

	if (permission === 'denied') {
		return (
			<span className="p-1.5 text-gray-300 dark:text-gray-600" title="Értesítések letiltva a böngészőben">
				<BellSlashIcon className="h-5 w-5" />
			</span>
		);
	}

	return (
		<Button
			variant="icon"
			aria-label="Értesítések engedélyezése"
			title="Értesítések engedélyezése"
			onClick={onRequest}
		>
			<BellIcon className="h-5 w-5" />
		</Button>
	);
}

export default NotificationToggle;
