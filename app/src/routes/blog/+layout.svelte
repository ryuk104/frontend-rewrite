<script lang="ts">
  import { fly } from 'svelte/transition';
  import Head from '$lib/components/Blog/head.svelte';
  import Header from '$lib/components/Blog/header.svelte';
  import Footer from '$lib/components/Blog/footer.svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;

  import { navigating } from '$app/stores';
  /*
  import NProgress from 'nprogress';
  import '$lib/styles/nprogress.css';
  // Full list: https://github.com/rstacruz/nprogress#configuration
  NProgress.configure({ minimum: 0.2, easing: 'ease', speed: 600 });
  $: $navigating ? NProgress.start() : NProgress.done();
  */

  import { onMount } from 'svelte';
  import { partytownSnippet } from '@builder.io/partytown/integration';

  let scriptEl: any;
  onMount(() => scriptEl && (scriptEl.textContent = partytownSnippet()));
</script>

<svelte:head>
  <script>
    partytown = {
      forward: ['plausible', 'dataLayer.push'],
    };
  </script>
  <script bind:this={scriptEl}></script>
</svelte:head>

<Head />

<Header />

{#key data.props.path}
  <div in:fly={{ y: 100, duration: 300, delay: 300 }} out:fly={{ y: -100, duration: 300 }} class="pt-[4rem] min-h-75vh">
    <slot />
  </div>
{/key}

<Footer />
