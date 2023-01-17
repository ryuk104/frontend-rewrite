<script>
	import Editor from '$lib/editor/Static.svelte';
	let content = {
		type: 'doc',
		content: [
			{
				type: 'heading',
				attrs: { level: 1 },
				content: [{ type: 'text', marks: [{ type: 'bold' }], text: 'Unsatisfied Customers' }]
			},
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Below are customers who had a poor experience that we need to follow up with:'
					}
				]
			}
		]
	};
</script>

<Editor {content} />
