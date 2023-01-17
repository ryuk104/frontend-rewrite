import { writable } from 'svelte/store';

export const ymap = writable();

export const command_menu_visible = writable(false);
export const command_menu_items = writable([]);
export const command_menu_location = writable({ x: 0, y: 0, height: 0 });
export const content_editor = writable();
export const content_range = writable({});
// export const desktopMenu = writable(true);
