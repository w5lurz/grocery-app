import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import GroceriesPage from './pages/GroceriesPage';
import TodoPage from './pages/TodoPage';
import { useNotifications } from './hooks/useNotifications';
import type { Page, User } from './types';

function App() {
	const [currentUser, setCurrentUser] = useState<User>('Tamás');
	const [activePage, setActivePage] = useState<Page>('groceries');
	const [isDark, setIsDark] = useState(true);
	const { permission: notificationPermission, requestPermission } = useNotifications(currentUser);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-950">
			<Navbar
				currentUser={currentUser}
				onUserChange={setCurrentUser}
				activePage={activePage}
				onPageChange={setActivePage}
				isDark={isDark}
				onThemeToggle={() => setIsDark((prev) => !prev)}
				notificationPermission={notificationPermission}
				onRequestNotifications={() => void requestPermission()}
			/>
			{activePage === 'groceries' ? (
				<GroceriesPage currentUser={currentUser} />
			) : (
				<TodoPage currentUser={currentUser} />
			)}
		</div>
	);
}

export default App;
