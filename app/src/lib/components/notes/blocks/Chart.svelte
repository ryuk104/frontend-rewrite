<script>
	import { onMount } from 'svelte';
	import NodeViewWrapper from './svelte-block/NodeViewWrapper.svelte';

	//Could dynamically import based on which componenet is requested.
	import AreaChart from '@evidence-dev/components/viz/AreaChart.svelte';
	import BarChart from '@evidence-dev/components/viz/BarChart.svelte';
	import LineChart from '@evidence-dev/components/viz/LineChart.svelte';
	import ScatterPlot from '@evidence-dev/components/viz/ScatterPlot.svelte';
	import BubbleChart from '@evidence-dev/components/viz/BubbleChart.svelte';
	import ECharts from '@evidence-dev/components/viz/ECharts.svelte';

	export let node;
	export let selected = false;

	let charts = {
		area: AreaChart,
		bar: BarChart,
		line: LineChart,
		scatter: ScatterPlot,
		bubble: BubbleChart,
		echart: ECharts
	};

	onMount(async () => {
		//We could dynamically import the chart from
		// Chart = (await import('@evidence-dev/components/viz/AreaChart.svelte')).default;
	});

	//import data from store or fetch based on input.
	let full = [
		{ x: 'a1', series: 'a', y: 10 },
		{ x: 'a1', series: 'b', y: 24 },
		{ x: 'a1', series: 'c', y: 45 },
		{ x: 'a2', series: 'a', y: 14 },
		{ x: 'a2', series: 'b', y: 26 },
		{ x: 'a2', series: 'c', y: 51 },
		{ x: 'a3', series: 'a', y: 16 },
		{ x: 'a3', series: 'b', y: 22 },
		{ x: 'a3', series: 'c', y: 53 },
		{ x: 'a4', series: 'a', y: 11 },
		{ x: 'a4', series: 'b', y: 20 },
		{ x: 'a4', series: 'c', y: 60 },
		{ x: 'a5', series: 'a', y: 18 },
		{ x: 'a5', series: 'b', y: 28 },
		{ x: 'a5', series: 'c', y: 58 },
		{ x: 'a6', series: 'a', y: 15 },
		{ x: 'a6', series: 'b', y: 22 },
		{ x: 'a6', series: 'c', y: 63 }
	];
</script>

<NodeViewWrapper>
	<div class="overflow-scroll w-full">
		<div class="not-prose max-w-3xl overflow-visible m-auto w-full min-w-full">
			<!-- <BarChart data={full} series="series" swapXY="true" title="Full Data" sort="false" /> -->
			<svelte:component
				this={charts[node.attrs.chart]}
				data={full}
				series="series"
				title="Data Ipsum..."
				sort="false"
			/>
		</div>
	</div>
</NodeViewWrapper>
