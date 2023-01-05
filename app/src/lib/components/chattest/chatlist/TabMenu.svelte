<script>
  import { goto } from "$app/navigation";
  import {
    myDoc,
    mobile,
    allUsers,
    groupChat,
    publicChat,
    privateChat,
    currentContact,
    selectedUsername,
    widthLessthan1200,
    showSettingsModalMobile,
  } from "$lib/store";
  import TabmenuSkeleton from "../skeleton/TabmenuSkeleton.svelte";
  import IconMessage from "$lib/components/icons/IconMessage.svelte";
  import IconGroup from "$lib/components/icons/IconGroup.svelte";
  import IconChat from "$lib/components/icons/IconChat.svelte";

  const menuItems = ["Private", "Group", "Public"];
  let currentTab = menuItems[0];

  const selectTab = (selectedTab) => {
    currentTab = selectedTab;
    console.log("you clicked: " + currentTab + "tab");

    $selectedUsername = null;
    $currentContact = null;

    if (currentTab === "Private") {
      $privateChat = true;
      $groupChat = false;
      $publicChat = false;
      if ($selectedUsername) goto(`/${$selectedUsername}`);
      if (!$selectedUsername) goto("/");
    }

    if (currentTab === "Group") {
      // $privateChat = false;
      // $groupChat = true;
      // $publicChat = false;
      // goto("/");
    }

    if (currentTab === "Public") {
      // $privateChat = false;
      // $groupChat = false;
      // $publicChat = true;
      // goto("/");
    }
  };
</script>

<div class="tab-menu">
  {#if $allUsers && $allUsers.length}
    {#each menuItems as tab}
      <span
        on:click={() => selectTab(tab)}
        style:width={$mobile ? "25%" : "33.3%"}
      >
        {#if tab === "Private"}
          <!-- style:color={currentTab === tab ? "#FF4408" : ""}   -->
          <div class="msg" style:color="#FF4408">
            <IconMessage />
          </div>
        {/if}

        {#if tab === "Group"}
          <div class="group" style:color={currentTab === tab ? "#FF4408" : ""}>
            <IconGroup />
          </div>
        {/if}

        {#if tab === "Public"}
          <div class="room" style:color={currentTab === tab ? "#FF4408" : ""}>
            <IconChat />
          </div>
        {/if}
      </span>
    {/each}

    <!-- {#if $mobile} -->
    {#if $widthLessthan1200}
      <div class="icon-avatar">
        <img
          src={$myDoc?.avatar}
          alt="my avatar"
          on:click|stopPropagation={() => ($showSettingsModalMobile = true)}
        />
      </div>
    {/if}
  {:else}
    <TabmenuSkeleton />
  {/if}
</div>

<style>
  .msg,
  .group,
  .room {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid; */
  }

  .icon-avatar img {
    width: 24px;
    height: 24px;
    border-radius: 50px;
  }

  .icon-avatar {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    /* border: 1px solid; */
  }

  .tab-menu {
    position: relative;
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    height: 60px;
    border-top: 1px solid white;
  }

  span {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    /* cursor: pointer; */
  }
</style>
