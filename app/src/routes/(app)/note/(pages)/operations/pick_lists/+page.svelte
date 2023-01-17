<script>
	import Editor from '$lib/editor/Static.svelte';
	let content = {
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Pick Lists' }]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Pick lists for a specific day can be accessed at /operations/pick-lists/yyyy-mm-dd/'
					}
				]
			},
			{
				type: 'paragraph',
				content: [
					{ type: 'text', text: 'For example, for 20th Jan 2021, the link is: ' },
					{
						type: 'text',
						marks: [
							{
								type: 'link',
								attrs: {
									href: 'https://evidence-demo.netlify.app/operations/pick_lists/2021-01-20/',
									target: '_blank',
									class: null
								}
							}
						],
						text: '/operations/pick_lists/2021-01-20/'
					}
				]
			},
			{
				type: 'heading',
				attrs: { level: 2 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Recent Lists:' }]
			},
			{
				type: 'paragraph',
				content: [{ type: 'text', text: 'The last 7 days pick lists are below:' }]
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
													href: 'https://evidence-demo.netlify.app/operations/pick_lists/2021-12-31/',
													target: '_blank',
													class: null
												}
											}
										],
										text: '2021-12-31'
									}
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
													href: 'https://evidence-demo.netlify.app/operations/pick_lists/2021-12-30/',
													target: '_blank',
													class: null
												}
											}
										],
										text: '2021-12-30'
									}
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
													href: 'https://evidence-demo.netlify.app/operations/pick_lists/2021-12-29/',
													target: '_blank',
													class: null
												}
											}
										],
										text: '2021-12-29'
									}
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
													href: 'https://evidence-demo.netlify.app/operations/pick_lists/2021-12-28/',
													target: '_blank',
													class: null
												}
											}
										],
										text: '2021-12-28'
									}
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
													href: 'https://evidence-demo.netlify.app/operations/pick_lists/2021-12-27/',
													target: '_blank',
													class: null
												}
											}
										],
										text: '2021-12-27'
									}
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
													href: 'https://evidence-demo.netlify.app/operations/pick_lists/2021-12-26/',
													target: '_blank',
													class: null
												}
											}
										],
										text: '2021-12-26'
									}
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
													href: 'https://evidence-demo.netlify.app/operations/pick_lists/2021-12-25/',
													target: '_blank',
													class: null
												}
											}
										],
										text: '2021-12-25'
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
