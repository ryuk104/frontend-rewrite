<script>
  import NodeViewWrapper from "./svelte-block/NodeViewWrapper.svelte";
  import Repl from "$lib/repl/index.svelte";
  export let node;
  export let selected = false;
</script>

<NodeViewWrapper id="svelte-component">
  <div class="p-3 md:p-8" style="width:var(--content-width);">
    <div
      class="border {selected
        ? 'border-blue-600 shadow'
        : ''} sm:rounded-2xl sm:overflow-clip h-[650px] max-h-screen"
    >
      <Repl yid={node.attrs.yid} />
    </div>
  </div>
</NodeViewWrapper>
