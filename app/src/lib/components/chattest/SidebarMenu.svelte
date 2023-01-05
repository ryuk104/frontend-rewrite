<script>
  import { auth } from "$lib/firebase/client";
  import { onAuthStateChanged } from "firebase/auth";
  import {
    mobile,
    bgColor,
    loggedinUser,
    loginFormShow,
    profileUpdated,
    showSidebarMenu,
    showCameraModal,
    showSettingsModal,
    showAudioPlayerModal,
    showAudioRecordingModal,
  } from "$lib/store";
  import { page } from "$app/stores";
  import themeStore, { setTheme } from "svelte-themes";

  let user = null;

  // onAuthStateChanged(auth, (_user) => (user = _user));

  $: if ($profileUpdated) {
    // user = auth.currentUser
    user = $loggedinUser.currentUser;
    console.log("user profile updated detected !");
    // $profileUpdated = false
  }
</script>

<div
  class="sidebar-menu"
  class:loginform-hide={$loginFormShow}
  style:background={$themeStore.theme === "dark" ? "#292F3F" : "transparent"}
  style:border-right={$themeStore.theme === "dark" ? '1px solid #3a3f50' : '#ebebeb'}
  style:display={$mobile
    ? "none"
    : $page.url.pathname === "/login"
    ? "none"
    : $showCameraModal || $showAudioRecordingModal || $showAudioPlayerModal
    ? "none"
    : "flex"}
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    class="ionicon" 
    viewBox="0 0 512 512"
    width="24"
    height="24"
    fill="currentColor"
    on:click={() => $showSidebarMenu = false}
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M368 368L144 144M368 144L144 368"
    />
  </svg>
  {#if $loggedinUser}
    <div
      class="userimg"
      on:click|stopPropagation={() =>
        ($showSettingsModal = !$showSettingsModal)}
    >
      {#if $loggedinUser.photoURL}
        <img src={$loggedinUser.photoURL} alt="" />
      {:else}
        <img src="/joke.png" alt="" />
      {/if}
      <ion-icon name="settings-outline" class="settings" />
    </div>
  {/if}
</div>

<style>
  .settings {
    position: absolute;
    bottom: -8px;
    right: -5px;
    font-size: 1.2em;
  }

  .userimg img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .userimg {
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    margin-top: auto;
  }

  .sidebar-menu {
    min-width: 60px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    /* background: #ededed; */
  }

  @media (max-width: 800px) {
    .sidebar-menu {
      flex-direction: row;
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 50px;
      z-index: 200;
      justify-content: space-around;
    }

    .userimg {
      display: none;
    }
  }
</style>
