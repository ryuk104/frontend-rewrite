<script>
	import Editor from '$lib/editor/Static.svelte';
	let content = {
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Retail' }]
			},
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Sales Mix' }]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'In the past year, 83% of sales have come from Odd Equipment and Cursed Sporting Goods.'
					}
				]
			},
			{ type: 'ChartComponent', attrs: { chart: 'bar' } },
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'The most popular items were the Microscope ($258,199), Running Shoes ($232,411), and Fishing Rod ($225,054).'
					}
				]
			},
			{ type: 'ChartComponent', attrs: { chart: 'bar' } },
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Product Popularity' }]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Customers have differing opinions about the products, however: Sinister Toys is an unpopular category in customer NPS reviews.'
					}
				]
			}
		]
	};
</script>

<Editor {content} />
