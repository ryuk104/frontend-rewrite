<script>
	import Editor from '$lib/editor/Static.svelte';
	let content = {
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Marketing' }]
			},
			{
				type: 'bulletList',
				content: [
					{
						type: 'listItem',
						content: [
							{
								type: 'paragraph',
								content: [
									{
										type: 'text',
										marks: [
											{
												type: 'link',
												attrs: {
													href: 'https://evidence-demo.netlify.app/marketing/attribution_model',
													target: '_blank',
													class: null
												}
											},
											{ type: 'bold' }
										],
										text: 'Attribution Model'
									},
									{ type: 'text', text: ': Where customers come from, marketing efficiency' }
								]
							}
						]
					}
				]
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', marks: [{ type: 'italic' }], text: 'N.B. Marketing data is managed by ' },
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: { href: 'mailto:lucius@needful.things', target: '_blank', class: null }
							},
							{ type: 'italic' }
						],
						text: 'Lucius'
					},
					{
						type: 'text',
						marks: [{ type: 'italic' }],
						text: ' - questions / errors should be raised to him in the first instance'
					}
				]
			}
		]
	};
</script>

<Editor {content} />
