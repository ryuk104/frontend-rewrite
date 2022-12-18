<script>
	export let href;
	export let name;
	export let path;
</script>

<a class="link" {href} data-tippy-content="@handle"
	><svg
		class="h-6 fill-current text-gray-600 hover:text-green-700"
		role="img"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"><title>{name}</title><path d={path} /></svg
	></a
>
