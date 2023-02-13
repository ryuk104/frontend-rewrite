import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import cssnano from 'cssnano'
import path from 'path'
import dotenv from 'dotenv';
import autoprefixer from 'autoprefixer'
import node from "@sveltejs/adapter-node";

dotenv.config();

const rootDomain = process.env["VITE_DOMAIN"]; // or your server IP for dev
const originURL = process.env["VITE_SITE_URL"]; // or your server IP for dev



/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({

		scss: {
			includePaths: ["src"],
			prependData: '@use "./src/global/stylesheet/base/_variables.scss" as *;',
			renderSync: true,
			stripIndent: true,
		},
		postcss: { configFilePath: path.resolve("./postcss.config.cjs") },
	}),
	ssr: false,
	kit: {
		adapter: adapter(),
		
		alias: {
			$stores: path.resolve("./src/lib/stores"),
			$api: path.resolve("./src/routes/api/_lib"),
			$components: path.resolve("./src/lib/components"),
			$env: path.resolve("./src/env.ts"),
		},
		files: {
			assets: "static",
			lib: "src/lib",
			routes: "src/routes",
			serviceWorker: "src/service-worker",
			appTemplate: "src/app.html",
			hooks: { server: "src/hooks.server" },
		},
		version: { pollInterval: 600000 },
	}
};

export default config;
