<script>
	import Editor from '$lib/components/notes/editor/Static.svelte';
	let content = {
		type: 'doc',
		content: [
			{
				type: 'image',
				attrs: {
					src: 'https://static1.squarespace.com/static/55d5e6bbe4b07fd45aec98a4/t/5a67ff45ec212de974357e39/1622153363313/Needful+logo.png',
					alt: 'Needful Things Logo',
					title: 'logo'
				}
			},
			{ type: 'paragraph' },
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Daily KPIs for Dec 31, 2021' }]
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
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Jump to:' }]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: { href: '/business_performance', target: '_self', class: null }
							}
						],
						text: '📊 Whole Business KPIs'
					},
					{ type: 'hardBreak' },
					{
						type: 'text',
						marks: [{ type: 'link', attrs: { href: '/customer', target: '_self', class: null } }],
						text: '💬 Customer Feedback'
					},
					{ type: 'hardBreak' },
					{
						type: 'text',
						marks: [{ type: 'link', attrs: { href: '/marketing', target: '_self', class: null } }],
						text: '📢 Marketing'
					},
					{ type: 'hardBreak' },
					{
						type: 'text',
						marks: [{ type: 'link', attrs: { href: '/operations', target: '_self', class: null } }],
						text: '⚙️ Ops'
					},
					{ type: 'hardBreak' },
					{
						type: 'text',
						marks: [{ type: 'link', attrs: { href: '/retail', target: '_self', class: null } }],
						text: '📦 Retail'
					}
				]
			},
			{ type: 'paragraph' }
		]
	};
</script>

<Editor {content} />

<style>
	:global(img[title='logo']) {
		max-width: 100%;
		width: 330px;
		margin: 0 auto;
	}
</style>
