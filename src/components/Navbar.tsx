import { ArrowRightStartOnRectangleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import type { Page, User } from '../types';
import { PAGES } from '../types';
import Button from './Button';
import MenuItem from './MenuItem';
import ThemeToggle from './ThemeToggle';
import NotificationToggle from './NotificationToggle';
import DropdownMenu from './DropdownMenu';

type NavbarProps = {
	currentUser: User;
	activePage: Page;
	onPageChange: (page: Page) => void;
	onSignOut: () => void;
	isDark: boolean;
	onThemeToggle: () => void;
	notificationPermission: NotificationPermission;
	onRequestNotifications: () => void;
};

function Navbar({
	currentUser,
	activePage,
	onPageChange,
	onSignOut,
	isDark,
	onThemeToggle,
	notificationPermission,
	onRequestNotifications,
}: NavbarProps) {
	return (
		<nav className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
			<div className="flex items-center gap-2">
				<div className="hidden items-center gap-2 sm:flex">
					{PAGES.map((page) => (
						<MenuItem
							key={page.value}
							label={page.label}
							active={activePage === page.value}
							onClick={() => onPageChange(page.value)}
						/>
					))}
				</div>
				<div className="sm:hidden">
					<DropdownMenu
						trigger={<Bars3Icon className="h-5 w-5" />}
						value={activePage}
						options={PAGES}
						onChange={onPageChange}
						align="left"
						aria-label="Menü"
					/>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<span className="rounded-full border border-purple-600 bg-purple-600 px-3 py-1 text-sm font-medium text-white">
					{currentUser}
				</span>
				<Button variant="icon" onClick={onSignOut} aria-label="Kijelentkezés" title="Kijelentkezés">
					<ArrowRightStartOnRectangleIcon className="h-5 w-5" />
				</Button>
				<NotificationToggle permission={notificationPermission} onRequest={onRequestNotifications} />
				<ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
			</div>
		</nav>
	);
}

export default Navbar;
