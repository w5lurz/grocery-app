import { useEffect, useLayoutEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User as FirebaseUser } from 'firebase/auth';
import { auth, authPersistenceReady } from './firebase';
import AuthScreen from './components/AuthScreen';
import Navbar from './components/Navbar';
import GroceriesPage from './pages/GroceriesPage';
import TodoPage from './pages/TodoPage';
import { useNotifications } from './hooks/useNotifications';
import type { Page, User } from './types';

function getUserForUid(uid: string): User | null {
	if (import.meta.env.VITE_FIREBASE_TAMAS_UID && uid === import.meta.env.VITE_FIREBASE_TAMAS_UID) return 'Tamás';
	if (import.meta.env.VITE_FIREBASE_JULCSI_UID && uid === import.meta.env.VITE_FIREBASE_JULCSI_UID) return 'Julcsi';
	return null;
}

function App() {
	const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const [authError, setAuthError] = useState('');
	const [isDark, setIsDark] = useState(true);

	useLayoutEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	useEffect(() => {
		let isActive = true;
		let unsubscribe = () => {};

		void authPersistenceReady
			.then(() => {
				if (!isActive) return;
				unsubscribe = onAuthStateChanged(
					auth,
					(user) => {
						if (!isActive) return;
						if (user?.isAnonymous) {
							void signOut(auth).catch(() => {
								if (!isActive) return;
								setAuthError('A régi vendégfiókból nem sikerült kijelentkezni. Töltsd újra az oldalt.');
								setIsCheckingAuth(false);
							});
							return;
						}
						if (user && !getUserForUid(user.uid)) {
							void signOut(auth)
								.then(() => {
									if (!isActive) return;
									setAuthError('Ez a Firebase-fiók nincs hozzárendelve Tamáshoz vagy Julcsihoz.');
									setIsCheckingAuth(false);
								})
								.catch(() => {
									if (!isActive) return;
									setAuthError(
										'Az ismeretlen fiókból nem sikerült kijelentkezni. Töltsd újra az oldalt.',
									);
									setIsCheckingAuth(false);
								});
							return;
						}
						setFirebaseUser(user);
						setIsCheckingAuth(false);
					},
					() => {
						if (!isActive) return;
						setAuthError('Nem sikerült ellenőrizni a bejelentkezést. Töltsd újra az oldalt.');
						setIsCheckingAuth(false);
					},
				);
			})
			.catch(() => {
				if (!isActive) return;
				setAuthError('Nem sikerült elindítani a bejelentkezést. Töltsd újra az oldalt.');
				setIsCheckingAuth(false);
			});

		return () => {
			isActive = false;
			unsubscribe?.();
		};
	}, []);

	const handleSignIn = async (email: string, password: string) => {
		setAuthError('');
		let isUnrecognizedAccount = false;
		try {
			await authPersistenceReady;
			const credential = await signInWithEmailAndPassword(auth, email, password);
			if (!getUserForUid(credential.user.uid)) {
				isUnrecognizedAccount = true;
				await signOut(auth);
				throw new Error('Unrecognized Firebase account');
			}
		} catch {
			setAuthError(
				isUnrecognizedAccount
					? 'Ez a Firebase-fiók nincs hozzárendelve Tamáshoz vagy Julcsihoz.'
					: 'Nem sikerült bejelentkezni. Ellenőrizd az e-mail-címet és a jelszót.',
			);
			throw new Error('Sign-in failed');
		}
	};

	if (isCheckingAuth) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50 text-sm text-gray-500 dark:bg-gray-950 dark:text-gray-400">
				Betöltés…
			</div>
		);
	}

	if (!firebaseUser) {
		return <AuthScreen error={authError} onSignIn={handleSignIn} />;
	}

	const currentUser = getUserForUid(firebaseUser.uid);
	if (!currentUser) {
		return (
			<AuthScreen
				error="Ez a Firebase-fiók nincs hozzárendelve Tamáshoz vagy Julcsihoz."
				onSignIn={handleSignIn}
			/>
		);
	}

	return (
		<AuthenticatedApp
			currentUser={currentUser}
			onSignOut={() => signOut(auth)}
			isDark={isDark}
			onThemeToggle={() => setIsDark((prev) => !prev)}
		/>
	);
}

function AuthenticatedApp({
	currentUser,
	onSignOut,
	isDark,
	onThemeToggle,
}: {
	currentUser: User;
	onSignOut: () => Promise<void>;
	isDark: boolean;
	onThemeToggle: () => void;
}) {
	const [activePage, setActivePage] = useState<Page>('groceries');
	const { permission: notificationPermission, requestPermission } = useNotifications(currentUser);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-950">
			<Navbar
				currentUser={currentUser}
				activePage={activePage}
				onPageChange={setActivePage}
				onSignOut={() => void onSignOut()}
				isDark={isDark}
				onThemeToggle={onThemeToggle}
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
