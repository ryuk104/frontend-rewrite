<script>
	import Editor from '$lib/editor/Static.svelte';
	let content = {
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Daily KPIs' }]
			},
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: {
									href: 'https://evidence-demo.netlify.app/business_performance/2021-12-31',
									target: '_blank',
									class: null
								}
							},
							{ type: 'bold' }
						],
						text: 'Dec 31, 2021'
					}
				]
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'Sales are ' },
					{ type: 'text', marks: [{ type: 'bold' }], text: 'down' },
					{ type: 'text', text: ' by -$509 from the previous day, and ' },
					{ type: 'text', marks: [{ type: 'bold' }], text: 'down' },
					{ type: 'text', text: ' by -$702 from the same day the previous week.' }
				]
			},
			{ type: 'ChartComponent', attrs: { chart: 'bar' } },
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'KPIs for a specific date are at /business_performance/[YYYY-MM-DD]. E.g. '
					},
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: {
									href: 'https://evidence-demo.netlify.app/business_performance/2020-01-01',
									target: '_blank',
									class: null
								}
							}
						],
						text: '/business_performance/2020-01-01'
					}
				]
			},
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Monthly KPIs' }]
			},
			{
				type: 'heading',
				attrs: { level: 3 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: '2021-12-01' }]
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'Sales are ' },
					{ type: 'text', marks: [{ type: 'bold' }], text: 'up' },
					{ type: 'text', text: ' by 1% from the previous month.' }
				]
			},
			{ type: 'ChartComponent', attrs: { chart: 'area' } },
			{ type: 'paragraph' },
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Quarterly KPIs' }]
			},
			{
				type: 'heading',
				attrs: { level: 3 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: '2021-Q4' }]
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'Sales are ' },
					{ type: 'text', marks: [{ type: 'bold' }], text: 'up' },
					{ type: 'text', text: ' by 5% from the previous quarter.' }
				]
			},
			{ type: 'ChartComponent', attrs: { chart: 'line' } },
			{ type: 'paragraph' }
		]
	};
</script>

<Editor {content} />
