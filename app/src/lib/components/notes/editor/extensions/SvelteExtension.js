// import { SvelteNodeViewRenderer } from "svelte-tiptap";
import { SvelteNodeViewRenderer } from '$lib/blocks/svelte-block/SvelteNodeViewRenderer';
import { Node, mergeAttributes } from '@tiptap/core';
import Chart from '$lib/blocks/Chart.svelte';

export const ChartExtension = Node.create({
	name: 'ChartComponent',
	group: 'block',
	atom: true,
	draggable: false,
	inline: false,
	addAttributes() {
		return {
			chart: {
				default: 'none'
			}
		};
	},

	parseHTML() {
		return [{ tag: 'chart-component' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['chart-component', mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(Chart);
	}
});
