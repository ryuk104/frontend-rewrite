<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { Editor } from '@tiptap/core';
	import BubbleMenu from '@tiptap/extension-bubble-menu';
	import { defaultExtensions } from './extensions';
	import Slash from './Slash.svelte';
	import Toolbar from './Toolbar.svelte';
	import {
		content_editor,
		content_range,
		command_menu_visible,
		command_menu_items
	} from '$lib/stores';

	let element, toolbar;
	let selectedIndex = 0;
	export let content = 'hello';

	$: selectedIndex = $command_menu_visible ? selectedIndex : 0;

	function handleKeydown(event) {
		if (!$command_menu_visible) return;
		if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = (selectedIndex + $command_menu_items.length - 1) % $command_menu_items.length;
			return true;
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = (selectedIndex + 1) % $command_menu_items.length;
			return true;
		}

		if (event.key === 'Enter') {
			event.preventDefault();
			const item = $command_menu_items[selectedIndex];
			if (item) {
				item.command({ editor: $content_editor, range: $content_range });
			}
			return true;
		}

		return false;
	}

	function newYdoc() {
		if (!browser) return;

		if (!element) return;
		element.innerHTML = '';
		$content_editor = new Editor({
			element: element,
			editorProps: {
				attributes: {
					'data-editor': 'true',
					class:
						'prose prose-slate prose-sm prose-p:text-lg prose-p:font-serif focus:outline-none flex flex-col items-stretch m-auto prose-a:text-sky-700 prose-a:cursor-pointer px-8 max-w-3xl'
				}
			},
			extensions: [
				...defaultExtensions,
				BubbleMenu.configure({
					element: toolbar
				})
			],
			content,
			onTransaction: () => {
				$content_editor = $content_editor;
			},
			onUpdate: () => {}
		});
		window.dispatchEvent(new Event('resize'));
	}

	onMount(async () => {
		newYdoc();
	});

	onDestroy(() => {
		if ($content_editor) $content_editor.destroy();
	});
	let json;
</script>

<div bind:this={toolbar}>
	{#if $content_editor}
		<Toolbar />
	{/if}
</div>
<div class="loading relative" data-editor="true">
	<div bind:this={element} on:keydown|capture={handleKeydown} />
	<Slash {selectedIndex} {element} />
</div>

<style>
	:global(h1, h2, h3, h4, h5, h6, p, ul, li) {
		width: 100%;
	}

	:global(.ProseMirror) {
		position: static !important;
	}
	:global(.ProseMirror p.is-empty::before) {
		content: "Type '/' for commands";
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.loading) {
		animation: fadeIn 0.15s;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	:global(.ProseMirror h1.is-empty::before) {
		content: 'Heading 1';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h2.is-empty::before) {
		content: 'Heading 2';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h3.is-empty::before) {
		content: 'Heading 3';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h4.is-empty::before) {
		content: 'Heading 4';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h5.is-empty::before) {
		content: 'Heading 5';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h6.is-empty::before) {
		content: 'Heading 6';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror p) {
		margin-top: 0px;
	}
	:global(ul[data-type='taskList']) {
		list-style: none;
		padding-left: 2px;
	}
	:global(ul[data-type='taskList'] li) {
		display: flex;
		align-items: top;
	}
	:global(ul[data-type='taskList'] li p) {
		margin: 0;
	}
	:global(ul[data-type='taskList'] li label) {
		padding-right: 12px;
		margin-top: 4px !important;
	}
	:global(ul[data-type='taskList'] li label input) {
		border-radius: 0.25rem;
		border-color: #cbd5e1;
	}
	:global(.max-width-content) {
		max-width: var(--content-width);
	}
	:global(ul[data-type='taskList'] li div) {
		margin-bottom: 0;
	}
</style>
