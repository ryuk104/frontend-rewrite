<script>
  import {
    keyword,
    allUsers,
    groupChat,
    publicChat,
    privateChat,
    showSettingsModal,
  } from "$lib/store";
  import { fade } from "svelte/transition";
  import { page } from "$app/stores";
  import { t } from '$lib/i18n';

  // components
  import User from "$lib/components/chatlist/User.svelte";
  import Skeleton from "$lib/components/skeleton/LeftSideSkeleton.svelte";

  let filteredUsers = [];

  $: filteredUsers =
    $allUsers &&
    $allUsers.filter((user) => {
      return (
        user.name.toUpperCase().includes($keyword) ||
        user.name.toLowerCase().includes($keyword)
      );
    });

  $: if ($page.url.pathname === "/login") $showSettingsModal = false;
</script>

<div class="chatlist" transition:fade={{ duration: 100 }}>  
  {#if $privateChat && $allUsers && $allUsers.length}  
    <h2>{$t('menu.messages')}</h2>
    {#each filteredUsers as user}
      <User {user} />
    {/each}
  {:else if $groupChat}
    <h2>{$t('menu.group_chat')}</h2>
  {:else if $publicChat}
    <h2>{$t('menu.chatroom')}</h2>
  {:else}
  <div class="headline-skeleton loading-animation" />
    <Skeleton />
  {/if}

  <!-- {#if $groupChat} -->
</div>

<style>
  h2 {
    height: 27.2px;
  }

  .headline-skeleton {
    height: 27px;
    width: 130px;
    margin-left: 15px;
    margin-bottom: 10px;
    border-radius: 4px;
  }

  h2 {
    margin-left: 15px;
    margin-bottom: 10px;
    color: rgb(77, 90, 95);
  }

  /* .group,
  .public {
    width: 100%;
    height: calc(100vh - 187px);
    display: flex;
    justify-content: center;
    padding-top: 200px;
  } */

  .chatlist {
    height: calc(100vh - 187px);
    overflow: auto;
    border-radius: 8px;
    padding-top: 10px;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: inherit;
  }

  @media (max-width: 800px) {
    .chatlist {
      height: calc(100vh - 160px);
    }
  }
</style>
