<script>
  throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import Tchat from "$lib/components/server/Tchat.svelte";
  const { id } = page.params;

  export let params = {};
</script>

<style>
  .root {
    padding: 80px 0;
  }
</style>

<div class="root">
  <Tchat channelId={params.id} />
</div>
