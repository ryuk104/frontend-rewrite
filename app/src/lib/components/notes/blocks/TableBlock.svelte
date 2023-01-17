<script>
  import NodeViewWrapper from "./svelte-block/NodeViewWrapper.svelte";
  import Table from "$lib/table/index.svelte";
  export let node;
  export let selected = false;
</script>

<NodeViewWrapper id="svelte-component">
  <div class="overflow-scroll" style="width:var(--content-width);;">
    <div class="not-prose max-w-3xl overflow-visible m-auto">
      <Table yid={node.attrs.yid} bind:selected />
    </div>
  </div>
</NodeViewWrapper>
