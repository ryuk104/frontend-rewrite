<script>
	import Editor from '$lib/editor/Static.svelte';
	let content = {
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Customer Feedback' }]
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
													href: 'https://evidence-demo.netlify.app/customer/NPS_survey',
													target: '_blank',
													class: null
												}
											},
											{ type: 'bold' }
										],
										text: 'NPS'
									},
									{
										type: 'text',
										text: ': shows the review data we collect from customers on our products'
									}
								]
							}
						]
					}
				]
			}
		]
	};
</script>

<Editor {content} />
