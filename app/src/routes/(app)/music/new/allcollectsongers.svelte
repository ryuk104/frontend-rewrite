<script>
  import { onMount } from "svelte";

  import Songer from "$lib/components/song/Singer.svelte";
  import { NavBar } from "$lib/components/song/base";

  import { defaultResumableStore } from "$lib/stores/song/common";

  import { likedArtists } from "$lib/api/user";

  $: collectSongers = [];

  /*
  onResume(() => {
    if (!$defaultResumableStore) {
      likedArtistsFun();
    }
  });
  */
  onMount(() => {
    likedArtistsFun();
  });
  //获取收藏的歌手
  async function likedArtistsFun() {
    const res = await likedArtists({ limit: 2000 });
    if (res.code === 200) {
      collectSongers = res.data;
    }
  }
</script>

<NavBar title="收藏的歌手" />
<div class="page">
  {#if collectSongers.length > 0}
    <div class="songer-box">
      {#each collectSongers as songer}
        <Songer {songer} coverSize={200} />
      {/each}
    </div>
  {/if}
</div>

<style>
  .songer-box {
    display: grid;
    justify-content: space-between;
    grid-template-columns: repeat(4, 75px);
    padding: 0 20px;
  }
  .page {
    font-size: 16px;
    padding: 50px 0px 70px;
  }
</style>
