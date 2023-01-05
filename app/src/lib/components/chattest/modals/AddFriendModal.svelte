<script>
  import {
    myDoc,
    allUsers,
    msgCount,
    loggedinUser,
    showAddFriendModal,
    showSearchFriendModal,
  } from "$lib/store";
  import { getAllDocs } from "$lib/functions/getAllDocs";
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  import { onAuthStateChanged } from "firebase/auth";
  import { db, auth } from "$lib/firebase/client";
  import themeStore from "svelte-themes";
  import { onMount } from "svelte";
  import { quintOut } from "svelte/easing";
  import { scale } from "svelte/transition";

  let url = null;
  let user = null;
  let foundUsers = [];
  let username = null;
  let notFound = false;
  let sameUser = false;
  let matchedUser = false;
  let me = null;

  // onMount(async () => {
  //   let loggedinUserRef = doc(db, "users", $loggedinUser.displayName);

  //   const docSnap = await getDoc(loggedinUserRef);
  //   console.log("loggedinUser doc", docSnap.data());
  //   me = docSnap.data();
  // });

  const getUser = async () => {
    if (!username) {
      return;
    }
    const { docs } = await getAllDocs("users", ["name", "==", username]);
    foundUsers = docs;
    if (!foundUsers[0]) {
      notFound = true;
      sameUser = false;
    }
    if (foundUsers[0]) notFound = false;
  };

  // clear same user
  $: if (!username) sameUser = false;

  const handleSearch = (e) => {
    if (e.charCode === 13) getUser();
  };

  const addUser = async () => {
    $showSearchFriendModal = false;
    $showAddFriendModal = false;

    // add loggedin user to found usesr's contact list (ok)
    let userDoc = doc(db, "users", foundUsers[0].name);
    let userSnap = await getDoc(userDoc);
    await updateDoc(userDoc, {
      contactList: foundUsers[0].contactList.includes($loggedinUser.displayName)
        ? [...foundUsers[0].contactList]
        : [...foundUsers[0].contactList, $loggedinUser.displayName],
      lastMsg: [
        ...userSnap.data().lastMsg,
        $loggedinUser.displayName + "=>[NEW]",
      ],
      lastUpdated: [
        ...userSnap.data().lastUpdated,
        $loggedinUser.displayName + "=>" + new Date(),
      ],
      msgCount: [
        ...userSnap.data().msgCount,
        $loggedinUser.displayName + "=>0",
      ],
      unread: [
        ...userSnap.data().unread,
        $loggedinUser.displayName + "=>[NEW]",

      ],
    });
    console.log(
      `${$loggedinUser.displayName} is successfully added to ${foundUsers[0].name}'s contact list 😁}`
    );

    // add found user to loggedin user's contact list
    // let meRef = doc(db, "users", $loggedinUser.displayName);
    let meRef = doc(db, "users", $myDoc.name);
    let meSnap = await getDoc(meRef);
    await updateDoc(meRef, {
      contactList: $myDoc.contactList.includes(foundUsers[0].name)
        ? [...$myDoc.contactList]
        : [...$myDoc.contactList, foundUsers[0].name],
      lastMsg: [...meSnap.data().lastMsg, foundUsers[0].name + "=>[NEW]"],
      lastUpdated: [
        ...meSnap.data().lastUpdated,
        foundUsers[0].name + "=>" + new Date(),
      ],
      unread: [...meSnap.data().unread, foundUsers[0].name + "=>NEW"],
    });
    console.log(
      `${foundUsers[0].name} is successfully added to ${$myDoc.name}'s contact list 😁}`
    );
  };

  $: if (foundUsers && foundUsers.length) {
    url = foundUsers[0].avatar;
    if ($allUsers.find((user) => user.name === foundUsers[0].name)) {
      console.log("find matched user");
      matchedUser = true;
    } else {
      matchedUser = false;
    }
    if (foundUsers[0].name === $loggedinUser.displayName) {
      sameUser = true;
      foundUsers = [];
    } else {
      sameUser = false;
    }
  }

  $: if (!username) {
    foundUsers = null;
    notFound = false;
    sameUser = false;
  }
</script>

<div
  class="search-friend-modal"
  transition:scale={{ delay: 150, duration: 200, easing: quintOut }}
  style:background={$themeStore.theme === "dark" ? "#292F3F" : "#ebebeb"}
  on:click|stopPropagation
>
  <!-- transition:fly={{ y: 200, duration: 100, delay: 200 }} -->
  <div class="inner-wrapper">
    <div class="top">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon"
        viewBox="0 0 512 512"
        width="24"
        height="24"
        fill="currentColor"
        on:click|stopPropagation={() => ($showAddFriendModal = false)}
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="48"
          d="M112 184l144 144 144-144"
        />
      </svg>
      <span>Add a friend</span>
    </div>

    <div class="search_user">
      <div class="search-user-wrapper">
        <div class="clear-text" on:click={() => (username = "")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon icon-close"
            viewBox="0 0 512 512"
            width="18"
            height="18"
            fill="currentColor"
          >
            <path
              d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
              fill="none"
              stroke="currentColor"
              stroke-miterlimit="10"
              stroke-width="32"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M320 320L192 192M192 320l128-128"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search friend"
          bind:value={username}
          on:keypress={handleSearch}
          style:background={$themeStore.theme === "dark" ? "#3A3F50" : "white"}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon icon-finduser"
          viewBox="0 0 512 512"
          width="20"
          height="20"
          fill="currentColor"
          on:click={getUser}
        >
          <path
            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            stroke-width="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M338.29 338.29L448 448"
          />
        </svg>
      </div>
    </div>

    {#if foundUsers}
      {#each foundUsers as user}
        <div class="users">
          <div class="avatar-wrapper">
            {#if user.avatar}
              <img src={user.avatar} alt="" />
            {:else}
              <img src="/happy.png" alt="" width="120" height="120" />
            {/if}
            <div
              class={user.online ? "indicator online" : "indicator offline"}
            />
          </div>
          <div class="content">
            <h4 style:text-align="center">{user.name}</h4>
          </div>
          {#if matchedUser}
            <span style:margin-top="20px">
              <!-- This user is alreay in contact list -->
              {foundUsers[0].name} is already your friend
            </span>
          {:else}
            <div class="add-friend-wrapper" on:click={addUser}>
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
              <span>Add friend</span>
            </div>
          {/if}
        </div>
      {/each}
    {/if}

    {#if notFound}
      <div class="info">
        <img
          class="userimg"
          src="https://cdn.iconscout.com/icon/free/png-256/cry-face-sad-tear-emoji-37717.png"
          alt=""
          width="120"
          height="120"
        />
        <p class="info-message">This user could not be found</p>
      </div>
    {/if}

    {#if sameUser}
      <div class="info">
        <img class="userimg" src={url} alt="" width="120" height="120" />
        <p class="info-message" style:text-align="center">
          You can't add yourself to contact list !
        </p>
      </div>
    {/if}
  </div>
</div>

<style>
  .inner-wrapper {
    max-width: 600px;
    margin: auto;
    height: 100vh;
  }

  .indicator {
    position: absolute;
    bottom: -5px;
    right: -5px;
    border: 2px solid white;
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }

  .icon-close {
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: gray;
  }

  .add-friend-wrapper {
    display: flex;
    align-items: center;
    margin-top: 30px;
    cursor: pointer;
    /* border: 1px solid; */
  }

  .content {
    margin-top: 15px;
  }

  .avatar-wrapper img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border-radius: 8px;
    object-fit: cover;
  }

  .avatar-wrapper {
    position: relative;
    width: 120px;
    height: 120px;
  }

  .users {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    /* border: 1px solid; */
  }

  /* .icon-close {
    width: 100%;
    text-align: right;
    padding: 5px;
  } */

  .info-message {
    margin-top: 20px;
  }

  .userimg {
    margin-top: 30px;
  }

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* position: absolute; */
    /* border: 1px solid; */
  }

  span {
    margin-left: 10px;
    line-height: 0.7;
  }

  .top {
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    /* border: 1px solid; */
  }

  .icon-finduser {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  input {
    width: 100%;
    outline: none;
    border: none;
    padding: 10px;
    border-radius: 10px;
    font-size: 14px;
    padding-left: 30px;
  }

  .search-user-wrapper {
    position: relative;
    /* border: 1px solid; */
  }

  .search_user {
    position: relative;
    /* top: 0px; */
    width: 100%;
    padding: 15px;
    /* margin-top: 5px; */
    /* border: 1px solid; */
  }

  .search-friend-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    /* height: calc(100vh - 20px); */
    z-index: 200;
    /* border-radius: 8px; */
    /* border: 1px solid; */
  }
</style>
