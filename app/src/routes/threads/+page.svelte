<script>
  import SideLeft from "./SideLeft.svelte";
  //import SideRight from "./SideRight.svelte";
  //import Setting from "./Setting.svelte";
  //import SettingSlide from "./SettingSlide.svelte";
  //import NenoDetail from "$lib/components/threads/NenoDetail.svelte";
  //import ViewPicture from "$lib/components/threads/ViewPicture.svelte";
  //import Daily from "./Daily.svelte";
  //import Share from "$lib/components/threads/Share.svelte";
/*
  import { currentPage, settingStore } from "$lib/stores/store";
  $:{
    console.log($currentPage)
  }
  */
</script>

<div class=" overflow-visible">
  <div
    class="w-full  h-screen flex flex-col items-center justify-start  bg-gray-100 dark:bg-black   overflow-visible"
  >
    <div class="max-w-6xl min-w-0 w-full  flex   overflow-scroll ">
      <div
        class="hidden  sm:flex md:flex flex-col items-start dark:bg-black  overflow-visible"
        style="width:240px"
      >
        <SideLeft />
      </div>
       <!--{#if $currentPage === "neno"} -->
          <!-- <SideRight /> -->
       <!--{:else if $currentPage === "setting"} -->
         <!--  <Setting /> -->
       <!--{:else} -->
        <!--  <Daily /> -->
       <!--{/if} -->
    </div>
    <!--  <NenoDetail /> -->
    <!--  <SettingSlide /> -->
    <!--  <ViewPicture /> -->
    <!--  <Share /> -->
  </div>
</div>
