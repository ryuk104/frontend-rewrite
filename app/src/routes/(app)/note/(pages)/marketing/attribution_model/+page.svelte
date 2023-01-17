<script>
	import Editor from '$lib/editor/Static.svelte';
	let content = {
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Attribution Model' }]
			},
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Orders by Channel' }]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'The largest channels are currently Google Paid, Facebook Ads and Google Organic.'
					}
				]
			},
			{ type: 'ChartComponent', attrs: { chart: 'area' } },
			{
				type: 'heading',
				attrs: { level: 3 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'CPA - 2021' }]
			},
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: '$10.94' }]
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', marks: [{ type: 'bold' }, { type: 'italic' }], text: '-22% vs target' }
				]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'CPA is below target, so you may wish to investigate spending more in efficient channels, or testing new channels:'
					}
				]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'The most efficient channels are currently Google Paid (CPA $11.15) and Facebook Ads (CPA $13.27).'
					}
				]
			},
			{ type: 'ChartComponent', attrs: { chart: 'line' } },
			{
				type: 'heading',
				attrs: { level: 3 },
				content: [
					{
						type: 'text',
						marks: [{ type: 'italic' }],
						text: 'N.B. TikTik Ads are being tested as a new channel and are expected to become more efficient over time'
					}
				]
			}
		]
	};
</script>

<Editor {content} />
