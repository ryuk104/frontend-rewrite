<script>
	import Editor from '$lib/editor/Static.svelte';
	let content = {
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Operations Data' }]
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
													href: 'https://evidence-demo.netlify.app/operations/pick_lists',
													target: '_blank',
													class: null
												}
											},
											{ type: 'bold' }
										],
										text: 'Pick Lists'
									},
									{ type: 'text', text: ': Items to be picked and dispatched to customers' }
								]
							}
						]
					},
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
													href: 'https://evidence-demo.netlify.app/operations/unsatisfied_customers',
													target: '_blank',
													class: null
												}
											},
											{ type: 'bold' }
										],
										text: 'Unsatisfied Customers'
									},
									{ type: 'text', text: ': Customers we need to contant to resolve their issues.' }
								]
							}
						]
					}
				]
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', marks: [{ type: 'italic' }], text: 'N.B. Ops are handled by ' },
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: { href: 'mailto:summer@needful.things', target: '_blank', class: null }
							},
							{ type: 'italic' }
						],
						text: 'Summer'
					},
					{
						type: 'text',
						marks: [{ type: 'italic' }],
						text: '. Contact her with questions / corrections'
					}
				]
			}
		]
	};
</script>

<Editor {content} />
