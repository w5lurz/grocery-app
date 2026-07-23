import type { User } from "../types";
import MenuItem from "./MenuItem";
import Chip from "./Chip";
import ThemeToggle from "./ThemeToggle";

type NavbarProps = {
	currentUser: User;
	onUserChange: (user: User) => void;
	isDark: boolean;
	onThemeToggle: () => void;
};

const USERS: User[] = ["Julcsi", "Tamás"];

function Navbar({ currentUser, onUserChange, isDark, onThemeToggle }: NavbarProps) {
	return (
		<nav className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
			<div className="flex items-center gap-2">
				<MenuItem label="Bevás" active />
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
