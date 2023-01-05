<script>
  import { goto } from "$app/navigation";
  import themeStore from "svelte-themes";
  import { 
    allChat, 
    privateChat, 
    groupChat, 
    publicChat 
  } from "$lib/store";

  const setAllChat = () => {
    $allChat = true;
    $privateChat = false;
    $groupChat = false;
    $publicChat = false;
    goto("/");
  };

  const setPrivateChat = () => {
    $allChat = false;
    $privateChat = true
    $groupChat = false;
    $publicChat = false;
    goto("/private");
  };

  const setGroupChat = () => {
    $allChat = false
    $privateChat = false;
    $groupChat = true;
    $publicChat = false;
    goto("/group");
  };

  const setPublicChat = () => {
    $allChat = false;
    $privateChat = false
    $groupChat = false;
    $publicChat = true;
    goto("/public");
  };
</script>

<div
  class="navbar"
  style:background={$themeStore.theme === "dark" ? "#292F3F" : "white"}
>
  <div class="icon-wrapper" on:click={setAllChat}>
    <span>
      All <br />
      Chats
    </span>
  </div>
  <div class="icon-wrapper" on:click={setPrivateChat}>
    <span>
      Private <br />
      Chat
    </span>
  </div>
  <div class="icon-wrapper" on:click={setGroupChat}>
    <span>
      Group <br />
      Chat
    </span>
  </div>
  <div class="icon-wrapper" on:click={setPublicChat}>
    <span>
      Public <br />
      Chat
    </span>
  </div>
</div>

<style>
  span {
    font-size: 0.8em;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    padding: 5px;
    border-radius: 8px;
    /* border-bottom: 2px solid; */
    border: 1px solid;
  }

  .icon-wrapper {
    /* width: 50%; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 1px solid; */
  }

  .navbar {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    /* backdrop-filter: blur(20px); */
    /* border-top: 1px solid; */
  }
</style>
