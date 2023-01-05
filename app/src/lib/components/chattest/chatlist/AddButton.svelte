<script>
  import {
    allUsers,
    privateChat,
    groupChat,
    publicChat,
    showAddFriendModal,
    showAddGroupModal,
    showAddRoomModal,
  } from "$lib/store";

  const showModal = () => {
    if ($privateChat) $showAddFriendModal = true;
    if ($groupChat) $showAddGroupModal = true;
    if ($publicChat) $showAddRoomModal = true;
  };
</script>

{#if $allUsers && $allUsers.length}
  <div class="icon-add-wrapper" on:click|stopPropagation={showModal}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon icon-add"
      viewBox="0 0 512 512"
      width="24"
      height="24"
      fill="currentColor"
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

<style>
  .icon-add {
    color: white;
  }
  
  .icon-add-wrapper-animation {
    position: absolute;
    bottom: 80px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  .icon-add-wrapper {
    position: absolute;
    bottom: 80px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background: rgb(78, 170, 78);
    background: var(--theme-color);
    background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
    /* background: linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%); */
    /* background: linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%); */
    /* background: linear-gradient(90deg, #9ebd13 0%, #008552 100%); */
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
