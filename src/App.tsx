import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import GroceriesPage from './pages/GroceriesPage';
import TodoPage from './pages/TodoPage';
import type { Page, User } from './types';

function App() {
	const [currentUser, setCurrentUser] = useState<User>('Tamás');
	const [activePage, setActivePage] = useState<Page>('groceries');
	const [isDark, setIsDark] = useState(true);

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
