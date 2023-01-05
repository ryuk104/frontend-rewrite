<script>
  import themeStore from "svelte-themes";
  import {
    mobile,
    bgColor,
    keyword,
    showSidebarMenu,
    loggedinUser,
    showSearchBar,
    showSettingsModal,
    showAddFriendModal,
    showAddGroupModal,
    showAddRoomModal,
    // showSearchFriendModal,
    widthLessthan1200,
    showSettingsModalMobile,
    privateChat,
    groupChat,
    publicChat,
    allUsers,
  } from "$lib/store";

  const showModal = () => {
    if ($privateChat) $showAddFriendModal = true;
    if ($groupChat) $showAddGroupModal = true;
    if ($publicChat) $showAddRoomModal = true;
  };

  const closeSearchBar = () => {
    $keyword = "";
    $showSearchBar = false;
  };

  const getMsgCount = () => {};
</script>

<div class="header">
  <div class="left" style:cursor="pointer">
    <img
      src="https://miro.medium.com/max/1400/1*gr3kgm0McAm1eeJJog7jfg.png"
      height="30"
      alt=""
    />
  </div>

  <ul class="nav_icons">
    <!-- {#if $allUsers && $allUsers.length}
      <li
        class="icon-bell-wrapper"
        on:click|stopPropagation={() => ($showSearchBar = true)}
      >
        <div class="msg-count">
          <span class="count">6</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
          width="24"
          height="24"
          on:click={getMsgCount}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </li>
    {:else}
      <div class="icon-bell-wrapper loading-animation" />
    {/if} -->

    {#if $allUsers && $allUsers.length}
      <div class="icon-add-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon icon-add"
          viewBox="0 0 512 512"
          width="24"
          height="24"
          fill="currentColor"
          on:click|stopPropagation={showModal}
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M256 112v288M400 256H112"
          />
        </svg>
      </div>
    {:else}
      <div class="icon-add-wrapper-animation loading-animation" />
    {/if}
  </ul>


</div>

<style>
  .count {
    color: white;
    color: var(--theme-color);
    font-size: 10px;
    font-weight: 600;
  }

  .msg-count {
    width: 16px;
    height: 16px;
    border-radius: 50px;
    background: var(--theme-color);
    background: white;
    position: absolute;
    right: -5px;
    top: -5px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0.1em 0.1em 0.2em black;
  }

  .icon-add-wrapper-animation {
    width: 24px;
    height: 24px;
    border-radius: 50px;
  }

  .icon-bell-wrapper {
    position: relative;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    padding: 0 10px;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .nav_icons {
    cursor: pointer;
    display: flex;
    margin-right: 5px;
  }

  .nav_icons li {
    list-style: none;
    margin-left: 20px;
    display: flex;
    align-items: center;
  }

  @media (max-width: 800px) {
    .header {
      padding: 0 12px;
    }
  }
</style>
