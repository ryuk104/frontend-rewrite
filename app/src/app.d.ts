// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />


declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}

	interface Locals {
		iOS: boolean;
		Android: boolean;
	}

	interface Platform {}

	interface Session {
		iOS?: boolean;
		Android?: boolean;
	}

	interface Stuff {
		path?: string;
		page?: string;
	}
}
