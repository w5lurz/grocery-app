import { useState, type SubmitEvent } from 'react';
import Button from './Button';

type AuthScreenProps = {
	error: string;
	onSignIn: (email: string, password: string) => Promise<void>;
};

export default function AuthScreen({ error, onSignIn }: AuthScreenProps) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			await onSignIn(email.trim(), password);
		} catch {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
			<form
				onSubmit={(event) => void handleSubmit(event)}
				className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
			>
				<h1 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-100">Bejelentkezés</h1>
				<label className="mb-4 block text-sm font-medium text-gray-700 dark:text-gray-300">
					E-mail-cím
					<input
						type="email"
						autoComplete="username"
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
					/>
				</label>
				<label className="mb-5 block text-sm font-medium text-gray-700 dark:text-gray-300">
					Jelszó
					<input
						type="password"
						autoComplete="current-password"
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
					/>
				</label>
				{error && (
					<p role="alert" className="mb-4 text-sm text-red-600 dark:text-red-400">
						{error}
					</p>
				)}
				<Button type="submit" disabled={isSubmitting} className="w-full justify-center">
					{isSubmitting ? 'Bejelentkezés…' : 'Belépés'}
				</Button>
			</form>
		</main>
	);
}
