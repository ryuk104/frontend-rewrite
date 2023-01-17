<script>
	import Editor from '$lib/editor/Static.svelte';
	let content = {
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'NPS Survey' }]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Each customer is sent a survey after recieving their products. We use NPS, where customers rate their experience on a 0 - 10 scale. The '
					},
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: {
									href: 'https://delighted.com/nps-calculator',
									target: '_blank',
									class: null
								}
							}
						],
						text: 'NPS score'
					},
					{ type: 'text', text: ' is on a scale between -100 and 100.' }
				]
			},
			{ type: 'heading', attrs: { level: 1 }, content: [{ type: 'text', text: '-14.4' }] },
			{
				type: 'paragraph',
				content: [{ type: 'text', marks: [{ type: 'italic' }], text: 'NPS score to date' }]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'NPS scores of >70 are considered market leading in ecommerce. Our NPS score is well below that, indicating unsatisfied customers.'
					}
				]
			},
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Distribution of Scores' }]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Whilst 33.0% of customers are promotors, there are 47.0% that are detractors.'
					}
				]
			},
			{ type: 'ChartComponent', attrs: { chart: 'bar' } },
			{ type: 'paragraph' },
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Score over Time' }]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'The volume of NPS reviews is currently too low for month on month trends to be significant.'
					}
				]
			},
			{ type: 'ChartComponent', attrs: { chart: 'line' } },
			{ type: 'paragraph' }
		]
	};
</script>

<Editor {content} />
