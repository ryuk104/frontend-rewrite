<script>
	import AreaChart from '@evidence-dev/components/viz/AreaChart.svelte';
	import BarChart from '@evidence-dev/components/viz/BarChart.svelte';
	import LineChart from '@evidence-dev/components/viz/LineChart.svelte';
	import ScatterPlot from '@evidence-dev/components/viz/ScatterPlot.svelte';
	import BubbleChart from '@evidence-dev/components/viz/BubbleChart.svelte';
	import ECharts from '@evidence-dev/components/viz/ECharts.svelte';

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

	let missingY = [
		{ x: 'a1', series: 'a', y: 10 },
		{ x: 'a1', series: 'b', y: 24 },
		{ x: 'a1', series: 'c', y: 45 },
		{ x: 'a2', series: 'a', y: 14 },
		{ x: 'a2', series: 'b', y: 26 },
		{ x: 'a3', series: 'a', y: 6 },
		{ x: 'a3', series: 'b', y: 3 },
		{ x: 'a3', series: 'c', y: 5 },
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

	let missingX = [
		{ x: 'a1', series: 'a', y: 10 },
		{ x: 'a1', series: 'b', y: 24 },
		{ x: 'a1', series: 'c', y: 45 },
		{ x: 'a2', series: 'a', y: 14 },
		{ x: 'a2', series: 'b', y: 26 },
		{ x: 'a2', series: 'c', y: 51 },
		{ x: 'a3', series: 'a', y: 16 },
		{ x: 'a3', series: 'b', y: 22 },
		{ x: 'a3', series: 'c', y: 53 },
		{ x: 'a5', series: 'a', y: 18 },
		{ x: 'a5', series: 'b', y: 28 },
		{ x: 'a5', series: 'c', y: 58 },
		{ x: 'a6', series: 'a', y: 15 },
		{ x: 'a6', series: 'b', y: 22 },
		{ x: 'a6', series: 'c', y: 63 }
	];

	let nulls = [
		{ x: 'a1', series: 'a', y: 10 },
		{ x: 'a1', series: 'b', y: 24 },
		{ x: 'a1', series: 'c', y: 45 },
		{ x: 'a2', series: 'a', y: 14 },
		{ x: 'a2', series: 'b', y: 26 },
		{ x: 'a2', series: 'c', y: null },
		{ x: 'a3', series: 'a', y: 16 },
		{ x: 'a3', series: 'b', y: 22 },
		{ x: 'a3', series: 'c', y: 53 },
		{ x: 'a4', series: 'a', y: 11 },
		{ x: 'a4', series: 'b', y: 20 },
		{ x: 'a4', series: 'c', y: 60 },
		{ x: 'a5', series: 'a', y: null },
		{ x: 'a5', series: 'b', y: 28 },
		{ x: 'a5', series: 'c', y: 58 },
		{ x: 'a6', series: 'a', y: 15 },
		{ x: 'a6', series: 'b', y: 22 },
		{ x: 'a6', series: 'c', y: 63 }
	];

	const dataAll = [
		[
			[10.0, 8.04],
			[8.0, 6.95],
			[13.0, 7.58],
			[9.0, 8.81],
			[11.0, 8.33],
			[14.0, 9.96],
			[6.0, 7.24],
			[4.0, 4.26],
			[12.0, 10.84],
			[7.0, 4.82],
			[5.0, 5.68]
		],
		[
			[10.0, 9.14],
			[8.0, 8.14],
			[13.0, 8.74],
			[9.0, 8.77],
			[11.0, 9.26],
			[14.0, 8.1],
			[6.0, 6.13],
			[4.0, 3.1],
			[12.0, 9.13],
			[7.0, 7.26],
			[5.0, 4.74]
		],
		[
			[10.0, 7.46],
			[8.0, 6.77],
			[13.0, 12.74],
			[9.0, 7.11],
			[11.0, 7.81],
			[14.0, 8.84],
			[6.0, 6.08],
			[4.0, 5.39],
			[12.0, 8.15],
			[7.0, 6.42],
			[5.0, 5.73]
		],
		[
			[8.0, 6.58],
			[8.0, 5.76],
			[8.0, 7.71],
			[8.0, 8.84],
			[8.0, 8.47],
			[8.0, 7.04],
			[8.0, 5.25],
			[19.0, 12.5],
			[8.0, 5.56],
			[8.0, 7.91],
			[8.0, 6.89]
		]
	];
	const markLineOpt = {
		animation: false,
		label: {
			formatter: 'y = 0.5 * x + 3',
			align: 'right'
		},
		lineStyle: {
			type: 'solid'
		},
		tooltip: {
			formatter: 'y = 0.5 * x + 3'
		},
		data: [
			[
				{
					coord: [0, 3],
					symbol: 'none'
				},
				{
					coord: [20, 13],
					symbol: 'none'
				}
			]
		]
	};
	let options = {
		title: {
			text: "Anscombe's quartet",
			left: 'center',
			top: 0
		},
		grid: [
			{ left: '7%', top: '7%', width: '38%', height: '38%' },
			{ right: '7%', top: '7%', width: '38%', height: '38%' },
			{ left: '7%', bottom: '7%', width: '38%', height: '38%' },
			{ right: '7%', bottom: '7%', width: '38%', height: '38%' }
		],
		tooltip: {
			formatter: 'Group {a}: ({c})'
		},
		xAxis: [
			{ gridIndex: 0, min: 0, max: 20 },
			{ gridIndex: 1, min: 0, max: 20 },
			{ gridIndex: 2, min: 0, max: 20 },
			{ gridIndex: 3, min: 0, max: 20 }
		],
		yAxis: [
			{ gridIndex: 0, min: 0, max: 15 },
			{ gridIndex: 1, min: 0, max: 15 },
			{ gridIndex: 2, min: 0, max: 15 },
			{ gridIndex: 3, min: 0, max: 15 }
		],
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {
					show: true
				}
			}
		},
		series: [
			{
				name: 'I',
				type: 'scatter',
				xAxisIndex: 0,
				yAxisIndex: 0,
				data: dataAll[0],
				markLine: markLineOpt
			},
			{
				name: 'II',
				type: 'scatter',
				xAxisIndex: 1,
				yAxisIndex: 1,
				data: dataAll[1],
				markLine: markLineOpt
			},
			{
				name: 'III',
				type: 'scatter',
				xAxisIndex: 2,
				yAxisIndex: 2,
				data: dataAll[2],
				markLine: markLineOpt
			},
			{
				name: 'IV',
				type: 'scatter',
				xAxisIndex: 3,
				yAxisIndex: 3,
				data: dataAll[3],
				markLine: markLineOpt
			}
		]
	};
</script>

<div class="max-w-3xl m-auto px-4">
	<BarChart data={full} series="series" swapXY="true" title="Full Data" sort="false" />

	<h1>Series Column with String X Axis</h1>
	<h2>Line Chart</h2>
	<BarChart data={full} series="series" swapXY="true" title="Full Data" sort="false" />

	<LineChart data={full} series="series" title="Full Data" sort="false" />
	<BarChart data={full} series="series" swapXY="true" title="Full Data" sort="false" />

	<LineChart data={missingY} series="series" title="Missing Y - handleNulls=gaps (default)" />
	<LineChart
		data={missingY}
		series="series"
		handleNulls="connect"
		title="Missing Y - handleNulls=connect"
	/>
	<LineChart
		data={missingY}
		series="series"
		handleNulls="zero"
		title="Missing Y - handleNulls=zero"
	/>
	<LineChart data={nulls} series="series" title="Nulls - handleNulls=gaps (default)" />

	<BarChart data={full} series="series" swapXY="true" title="Full Data" sort="false" />

	<h2>Area Chart</h2>
	<AreaChart data={full} series="series" title="Full Data" sort="false" />
	<AreaChart data={missingY} series="series" title="Missing Y" handleNulls="connect" />
	<AreaChart data={nulls} series="series" title="Nulls" handleNulls="zero" />

	<h2>100% Stacked Area Chart</h2>
	<AreaChart data={full} series="series" title="Full Data" type="stacked100" />
	<AreaChart
		data={missingY}
		series="series"
		title="Missing Y"
		handleNulls="connect"
		type="stacked100"
	/>
	<AreaChart data={nulls} series="series" title="Nulls" handleNulls="zero" type="stacked100" />

	<h2>Stacked Bar Chart</h2>
	<BarChart data={full} series="series" title="Full Data" sort="false" />
	<BarChart data={full} series="series" swapXY="true" title="Full Data" sort="false" />
	<BarChart data={missingY} series="series" title="Missing Y" />
	<BarChart data={nulls} series="series" title="Nulls" />

	<h2>100% Stacked Bar Chart</h2>
	<BarChart data={full} series="series" title="Full Data" sort="false" type="stacked100" />
	<BarChart
		data={full}
		series="series"
		swapXY="true"
		title="Full Data"
		sort="false"
		type="stacked100"
	/>
	<BarChart data={missingY} series="series" title="Missing Y" type="stacked100" />
	<BarChart data={nulls} series="series" title="Nulls" type="stacked100" />

	<h2>Horizontal Stacked Bar Chart</h2>
	<BarChart data={full} series="series" swapXY="true" title="Full Data" sort="true" />
	<BarChart data={missingY} series="series" swapXY="true" title="Missing Y" sort="false" />
	<BarChart data={nulls} series="series" swapXY="true" title="Nulls" sort="false" />

	<h2>Horizontal 100% Stacked Bar Chart</h2>
	<BarChart
		data={full}
		series="series"
		swapXY="true"
		title="Full Data"
		sort="true"
		type="stacked100"
	/>
	<BarChart
		data={missingY}
		series="series"
		swapXY="true"
		title="Missing Y"
		sort="false"
		type="stacked100"
	/>
	<BarChart
		data={nulls}
		series="series"
		swapXY="true"
		title="Nulls"
		sort="false"
		type="stacked100"
	/>

	<h2>Grouped Bar Chart</h2>
	<BarChart data={full} series="series" type="grouped" title="Full Data" />
	<BarChart data={missingY} series="series" type="grouped" title="Missing Y" />
	<BarChart data={nulls} series="series" type="grouped" title="Nulls" />

	<h2>Horizontal Grouped Bar Chart</h2>
	<BarChart data={full} series="series" swapXY="true" type="grouped" title="Full Data" />
	<BarChart data={missingY} series="series" swapXY="true" type="grouped" title="Missing Y" />
	<BarChart data={nulls} series="series" swapXY="true" type="grouped" title="Nulls" />

	<h2>Scatter Plot</h2>
	<ScatterPlot data={full} series="series" title="Full Data" />
	<ScatterPlot data={missingY} series="series" title="Missing Y" />
	<ScatterPlot data={nulls} series="series" title="Nulls" />

	<h2>Bubble Chart</h2>
	<BubbleChart data={full} series="series" size="y" y="y" title="Full Data" />
	<BubbleChart data={missingY} series="series" size="y" y="y" title="Missing Y" />
	<BubbleChart data={nulls} series="series" size="y" y="y" title="Nulls" />

	<h2>Advanced Chart</h2>
	<ECharts config={options} />
</div>
