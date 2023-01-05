<script>
  import { bgColor, showThemeModal } from "$lib/store";
  import themes from "$lib/data/themes.json";
  import { fly } from "svelte/transition";
  import Cookies from "js-cookie";

  const setBgColor = (val) => {
    $bgColor = val
    Cookies.set('bgColor', $bgColor)
  }
</script>

<div
  class="modal-theme"
  transition:fly={{ y: -60, duration: 100, delay: 100 }}
  on:click|stopPropagation
  >
  <!-- on:click|stopPropagation={() => console.log("hi, there !")} -->
  <div class="icon-arrow-wrapper">
    <ion-icon
      name="arrow-up-outline"
      class="icon-arrow-back"
      on:click|stopPropagation={() => ($showThemeModal = false)}
    />
  </div>
  <main>
    {#each themes as theme}
      <div class="theme-item" style:cursor="pointer" on:click={() => setBgColor(theme.background)}>
        <div class="theme-image" style:background={theme.background} />
        <span class="theme-title">{theme.title}</span>
      </div>
    {/each}
  </main>
</div>

<style>
  @import url("$lib/styles/theme-modal.css");
</style>
