import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import type { User } from './types';

function App() {
	const [currentUser, setCurrentUser] = useState<User>('Tamás');
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-950">
			<Navbar
				currentUser={currentUser}
				onUserChange={setCurrentUser}
				isDark={isDark}
				onThemeToggle={() => setIsDark((prev) => !prev)}
			/>
		</div>
	);
}

export default App;
