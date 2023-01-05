<script>
  import {
    phone,
    mobile,
    bgColor,
    loggedinUser,
    showMapModal,
    showToolModal,
    selectedUsername,
    widthLessthan1000,
    selectedUserReady,
    currentSelectedUser,
    showToolModalMobile,
    showVideoChatModal,
  } from "$lib/store";
  import {
    doc,
    addDoc,
    setDoc,
    updateDoc,
    query,
    where,
    orderBy,
    Timestamp,
    collection,
    onSnapshot,
  } from "firebase/firestore";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { db } from "$lib/firebase/client";
  import IconBackArrow from '$lib/components/icons/IconBackArrow.svelte'
  import IconPalette from '$lib/components/icons/IconPalette.svelte'
  import IconGame from '$lib/components/icons/IconGame.svelte'
  import IconVideoCam from '$lib/components/icons/IconVideoCam.svelte'
  import IconGeo from '$lib/components/icons/IconGeo.svelte'

  let q = null;
  let matched = false;
  let selectedUser = {};
  let colRef = collection(db, "users");

  $: if ($page.params.userId === $selectedUsername) matched = true;

  $: if (matched) {
    q = query(colRef, where("name", "==", $selectedUsername));
    const unsub = onSnapshot(q, (snapshot) => {
      let tempUsers = [];
      snapshot.docs.forEach((doc) => {
        tempUsers.push({ ...doc.data() });
      });
      selectedUser = tempUsers[0];
      $currentSelectedUser = tempUsers[0];
      $selectedUserReady = true;
      console.log("current contact:", selectedUser.name);
      return () => unsub();
    });
    matched = false;
  }
</script>

<div class="header">
  <div class="left-part">
    {#if $mobile && $selectedUserReady}
      <div class="icon-arrow-back-wrapper" on:click={() => goto("/")}>
        <IconBackArrow />
      </div>
    {:else if $mobile && !$selectedUserReady}
      <div
        class="icon-arrow-skeleton loading-animation"
        style:margin-right="15px"
      />
    {/if}

    {#if $selectedUserReady}
      <div class="user-info">
        <div class="image-wrapper">
        </div>
        <div class="details">
          <h4>{selectedUser.name}</h4>
        </div>
      </div>
    {:else}
      <div class="user-info">
        <div class="details">
          <h4 class="user-name loading-animation">antman</h4>
        </div>
      </div>
    {/if}
  </div>

  <div class="right-part">
    {#if !$phone && $selectedUserReady}
      <IconPalette marginRight="15" />

      <div class="icon-menu icon-game" style:margin-right="15px">
        <IconGame />
      </div>
    {:else if !$phone && !$selectedUserReady}
      <div
        class="icon-arrow-skeleton loading-animation"
        style:margin-right="15px"
      />
      <div
        class="icon-arrow-skeleton loading-animation"
        style:margin-right="15px"
      />
    {/if}

    {#if $selectedUserReady}
      <div 
        class="icon-videocam-wrapper" 
        on:click={() => $showVideoChatModal = true}
      >
        <IconVideoCam />
      </div>

      <div class="icon-menu icon-geo" on:click={() => ($showMapModal = true)}>
        <IconGeo />
      </div>
    {:else}
      <div
        class="icon-arrow-skeleton loading-animation"
        style:margin-right="15px"
      />
      <div class="icon-arrow-skeleton loading-animation" />
    {/if}
  </div>
</div>

<style>
  .icon-arrow-back-wrapper {
    display: flex;
    align-items: center;
    margin-right: 5px;
  }

  .icon-videocam-wrapper {
    display: flex;
    align-items: center;
    padding-right: 10px;
  }

  .icon-arrow-skeleton {
    width: 24px;
    height: 24px;
    border-radius: 50px;
  }

  .icon-menu {
    display: flex;
    align-items: center;
    /* border: 1px solid; */
  }

  .header {
    position: absolute;
    margin-top: 10px;
    left: 50%;
    transform: translateX(-50%);
    height: 50px;
    display: flex;
    align-items: center;
    max-width: 800px;
    padding: 15px 10px 15px 10px;
    backdrop-filter: blur(20px);
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: rgba(235, 235, 235, 0.5);
  }

  .left-part {
    display: flex;
    align-items: center;
    margin-right: auto;
    cursor: pointer;
  }

  .user-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-info .image-wrapper {
    position: relative;
    display: flex;
  }

  /* .user-info .image-wrapper img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    object-fit: cover;
  } */

  .details {
    padding-left: 15px;
    padding-left: 5px;
  }

  .details h4 {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2em;
  }

  .user-name {
    width: 60px;
    color: #51585c;
    color: transparent;
    border-radius: 4px;
  }

  /* .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  } */

  .right-part {
    display: flex;
    align-items: center;
    /* border: 1px solid red; */
  }

  @media (max-width: 800px) {
    .header {
      margin-top: 0px;
      border-radius: 0px;
    }

    /* .icon-arrow-back {
      margin-right: 10px;
      margin-left: 0px;
    } */
  }

  @media (max-width: 360px) {
    .details h4 {
      font-size: 17px;
    }
  }
</style>
