import {
	command_menu_visible,
	command_menu_items,
	command_menu_location,
	content_range,
	ymap
} from '$lib/stores';
import * as Y from 'yjs';
import { get } from 'svelte/store';
import { uuid } from '$lib/utils';

export default {
	items: ({ query }) => {
		return [
			{
				title: 'Heading 1',
				subtitle: 'BIG heading',
				command: ({ editor, range }) => {
					editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run();
				}
			},
			{
				title: 'Heading 2',
				subtitle: 'Less Big heading',
				command: ({ editor, range }) => {
					editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run();
				}
			},
			{
				title: 'Heading 3',
				subtitle: 'Medium big heading',
				command: ({ editor, range }) => {
					editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run();
				}
			},
			{
				title: 'Area Chart',
				subtitle: 'Create an area chart',
				command: ({ editor, range }) => {
					editor.commands.deleteRange(range);
					editor.commands.insertContent([
						{
							type: 'ChartComponent',
							attrs: { chart: 'area' }
						},
						{
							type: 'paragraph'
						}
					]);
					window.dispatchEvent(new Event('resize'));
				}
			},
			{
				title: 'Bar Chart',
				subtitle: 'Create a bar chart',
				command: ({ editor, range }) => {
					editor.commands.deleteRange(range);
					editor.commands.insertContent([
						{
							type: 'ChartComponent',
							attrs: { chart: 'bar' }
						},
						{
							type: 'paragraph'
						}
					]);
					window.dispatchEvent(new Event('resize'));
				}
			},
			{
				title: 'Line Chart',
				subtitle: 'Create a line chart',
				command: ({ editor, range }) => {
					editor.commands.deleteRange(range);
					editor.commands.insertContent([
						{
							type: 'ChartComponent',
							attrs: { chart: 'line' }
						},
						{
							type: 'paragraph'
						}
					]);
					window.dispatchEvent(new Event('resize'));
				}
			},
			{
				title: 'Scatter Plot',
				subtitle: 'Create a scatter plot',
				command: ({ editor, range }) => {
					editor.commands.deleteRange(range);
					editor.commands.insertContent([
						{
							type: 'ChartComponent',
							attrs: { chart: 'scatter' }
						},
						{
							type: 'paragraph'
						}
					]);
					window.dispatchEvent(new Event('resize'));
				}
			}
			// import ScatterPlot from '@evidence-dev/components/viz/ScatterPlot.svelte';
			// {
			// 	title: 'To Dos',
			// 	subtitle: 'Create a to do list with checkboxes',
			// 	command: ({ editor, range }) => {
			// 		editor.commands.deleteRange(range);
			// 		editor.commands.insertContent(
			// 			'<ul data-type="taskList"><li data-checked="false"><li>&#8203</li></ul>'
			// 		);
			// 	}
			// }
		]
			.filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
			.slice(0, 10);
	},

	render: () => {
		return {
			onStart: (props) => {
				let location = props.clientRect();
				content_range.set(props.range);
				command_menu_visible.set(true);
				command_menu_location.set({
					x: location.x,
					y: location.y + window.scrollY,
					height: location.height
				});
				command_menu_items.set(props.items);
			},

			onUpdate(props) {
				command_menu_items.set(props.items);
			},

			onKeyDown(props) {
				if (props.event.key === 'Escape') {
					command_menu_visible.set(false);
					return true;
				}
				if (props.event.key === 'Backspace') {
					return content_range.set(props.range);
				}
				content_range.set({ from: props.range.from, to: props.range.to + 1 });
			},

			onExit() {
				command_menu_visible.set(false);
			}
		};
	}
};

function new_repl() {
	const repl = new Y.Array();
	const file = new Y.Map();
	const source = new Y.Text();
	file.set('id', 1);
	file.set('name', 'App');
	file.set('type', 'svelte');
	file.set('source', source);
	repl.insert(0, [file]);

	return repl;
}

function new_table() {
	const ytable = new Y.Map();
	const yheader = new Y.Array();
	const ydata = new Y.Array();

	ytable.set('header', yheader);
	ytable.set('data', ydata);
	const title = new Y.Map();
	title.set('id', 'title');
	title.set('name', 'Title');
	yheader.insert(0, [title]);
	const row1 = new Y.Map();
	const row2 = new Y.Map();
	const row3 = new Y.Map();
	row1.set('id', 'row1');
	row2.set('id', 'row2');
	row3.set('id', 'row3');
	ydata.insert(0, [row1, row2, row3]);

	return ytable;
}
