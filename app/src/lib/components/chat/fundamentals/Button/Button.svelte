<script lang="ts">
	import ButtonType from './ButtonType.svelte';

	// TODO:
	// Add icon dynamic sizeing realtive to selceted size
	// Add icon fix by flex order
	// Finish color and varient styles

	let klass = '';
	export { klass as class };

	export let icon: any | null = null;
	export let iconFix: 'prefix' | 'suffix' = 'prefix';
	export let disabled: boolean = false;
	export let label: string | null = null;
	export let href: string | null = null;
	export let target: '_blank' | '_self' = '_self';
	export let size: 'small' | 'medium' | 'large' | 'square' = 'medium';
	export let variant: 'filled' | 'tonal' | 'outline' | 'text' = 'filled';
	export let color: 'primary' | 'secondary' | 'success' | 'danger' | 'plain' = 'primary';
	export let type: 'button' | 'submit' | 'reset' = 'button';

	// Styling & Classes
	// Base style for all buttons
	let baseStyle =
		'inline-flex justify-center items-center rounded-xl border font-medium focus:outline-none focus:ring-2 focus:ring-green-900 transition-all ease-in-out duration-200 group';

	// Size Classes & icon sizes
	$: btnSize =
		size === 'small'
			? 'text-xs h-10 py-2 px-4'
			: size === 'large'
			? 'text-baselg h-14 py-4 px-10'
			: size === 'square'
			? 'text-sm h-12 p-3'
			: 'text-sm h-12 py-3 px-6';

	$: iconSize = size === 'small' ? '24' : size === 'large' ? '24' : size === 'square' ? '24' : '24';

	// Variant & Color Classes
	let variantStyle: string;
	$: switch (true) {
		case variant === 'filled' && color === 'primary' && disabled:
			variantStyle =
				'bg-sky-700 border-sky-700 text-sky-900 hover:bg-sky-700 hover:text-sky-900 opacity-70 cursor-not-allowed';
			break;

		case variant === 'filled' && color === 'primary':
			variantStyle = 'bg-green-600 border-green-500 text-white hover:bg-green-500';
			break;

		case variant === 'filled' && color === 'plain':
			variantStyle =
				'bg-transparent border-transparent text-zinc-500 hover:bg-green-900 hover:bg-opacity-20 hover:text-green-500';
			break;

		case variant === 'outline' && color === 'plain':
			variantStyle =
				'border-2 border-gray-850 text-white hover:bg-gray-850 hover:text-sky-500 hover:border-sky-500';
			break;

		default:
			variantStyle = '';
			break;
	}
</script>

<ButtonType
	on:click
	class="{baseStyle} {variantStyle} {btnSize} {klass} focus:ring-2"
	{href}
	{target}
	{disabled}
	{type}
>
	{#if icon !== null}
		<span
			class="{iconFix === 'prefix' ? 'order-1' : 'order-2'} 
			{label !== null && iconFix === 'prefix' ? 'mr-2' : ''}
			{label !== null && iconFix === 'suffix' ? 'ml-2' : ''}"
		>
			<svelte:component
				this={icon}
				size={iconSize}
				class="opacity-100 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
			/>
		</span>
	{/if}
	{#if label !== null}
		<span class={iconFix === 'prefix' ? 'order-2' : 'order-1'}>
			{label}
		</span>
	{/if}
</ButtonType>
