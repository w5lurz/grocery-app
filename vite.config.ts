import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'sw.ts',
			registerType: 'autoUpdate',
			injectManifest: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
			},
			manifest: {
				name: 'Bevás – Tamás & Julcsi',
				short_name: 'Bevás',
				description: 'Közös bevásárlólista Tamásnak és Julcsinak',
				theme_color: '#9333ea',
				background_color: '#f9fafb',
				display: 'standalone',
				start_url: '/',
				icons: [
					{ src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
					{ src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
					{ src: 'pwa-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
				],
			},
		}),
	],
	server: {
		host: true,
		open: true,
	},
});
