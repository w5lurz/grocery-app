import type { Page, User } from '../types';
import { PAGES } from '../types';
import MenuItem from './MenuItem';
import Chip from './Chip';
import ThemeToggle from './ThemeToggle';

type NavbarProps = {
	currentUser: User;
	onUserChange: (user: User) => void;
	activePage: Page;
	onPageChange: (page: Page) => void;
	isDark: boolean;
	onThemeToggle: () => void;
};

const USERS: User[] = ['Julcsi', 'Tamás'];

function Navbar({ currentUser, onUserChange, activePage, onPageChange, isDark, onThemeToggle }: NavbarProps) {
	return (
		<nav className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
			<div className="flex items-center gap-2">
				{PAGES.map((page) => (
					<MenuItem
						key={page.value}
						label={page.label}
						active={activePage === page.value}
						onClick={() => onPageChange(page.value)}
					/>
				))}
			</div>
			<div className="flex items-center gap-3">
				{USERS.map((user) => (
					<Chip key={user} label={user} selected={currentUser === user} onClick={() => onUserChange(user)} />
				))}
				<ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
			</div>
		</nav>
	);
}

export default Navbar;
