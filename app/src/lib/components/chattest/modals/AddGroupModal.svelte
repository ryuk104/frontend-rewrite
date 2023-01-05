<script>
  import {
    showAddGroupModal,
    allUsers,
    keyword,
    selectedMembers,
    currentSelectedUser,
  } from "$lib/store";
  import { db } from "$lib/firebase/client";
  import {
    doc,
    updateDoc,
    collection,
    setDoc,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import { quintOut } from "svelte/easing";
  import { scale } from "svelte/transition";

  let groupName = null;
  let description = null;
  let membersEmail = [];

  const addMember = async (user) => {
    if (user.checked) {
      console.log(`${user.name} is selected`);
      // $selectedMembers.push(user)
      $selectedMembers = [...$selectedMembers, user];
    }

    if (!user.checked) {
      console.log(`${user.name} is unselected`);
      $selectedMembers = $selectedMembers.filter((member) => {
        return member.name !== user.name;
      });
    }
    // $selectedMembers = [...$selectedMembers, $currentSelectedUser];
  };

  const removeMember = async (member) => {
    console.log(`${member.name} is removed`);

    $selectedMembers = $selectedMembers.filter((item) => {
      return item.name != member.name;
    });

    $allUsers.forEach((user) => {
      if (user.name === member.name) user.checked = false;
    });
  };

  const create = async () => {
    console.log("group name: ", groupName);
    console.log("description: ", description);
    console.log("members email: ", membersEmail);
    console.log("current time: ", Date.now());
    try {
      let groupRef = doc(db, "groups", groupName);
      await setDoc(groupRef, {
        groupAvatar: null,
        groupName,
        description,
        groupMembers: membersEmail,
        createdAt: Date.now(),
        editedAt: Date.now(),
      });
    } catch (error) {
      console.log(`Error message: ${error.message}`);
    }
  };

  const cancel = () => {
    $selectedMembers = [];
    $allUsers.forEach((user) => {
      if (user.checked) user.checked = false;
    });
    $showAddGroupModal = false;
  };

  $: if ($currentSelectedUser) {
    console.log("current selected user: ", $currentSelectedUser);
    $selectedMembers = [...$selectedMembers, $currentSelectedUser];
  }

  $: if ($selectedMembers) {
    console.log("selected members", $selectedMembers);
    let tempMembersEmail = [];
    $selectedMembers.forEach((member) => {
      tempMembersEmail.push(member.email);
    });
    membersEmail = tempMembersEmail;
    console.log("member emails", membersEmail);
  }

  // $: if ($currentSelectedUser) membersEmail = [...membersEmail, $currentSelectedUser.email]

  $: filteredUsers = $allUsers.filter((user) => {
    return (
      user.name.toUpperCase().includes($keyword) ||
      user.name.toLowerCase().includes($keyword)
    );
  });
</script>

<div
  class="add-group-modal"
  transition:scale={{ delay: 150, duration: 200, easing: quintOut }}
  on:click|stopPropagation={() => console.log("clicked")}
>
  <div class="body">
    <div class="top">
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon icon-arrow-back"
        viewBox="0 0 512 512"
        width="24"
        height="24"
        fill="currentColor"
        on:click={() => ($showAddGroupModal = false)}
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M368 368L144 144M368 144L144 368"
        />
      </svg> -->
      <p class="title">Add a group</p>
    </div>

    <section>
      <div class="section-left">
        <div class="search-section">
          <input
            type="text"
            class="search-input"
            bind:value={$keyword}
            placeholder="Search by name"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="ionicon icon-search"
            viewBox="0 0 512 512"
            width="16"
            heiht="16"
            fill="currentColor"
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

          {#if $keyword}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon icon-reset"
              viewBox="0 0 512 512"
              width="18"
              heiht="18"
              fill="currentColor"
              on:click={() => ($keyword = "")}
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
          {/if}
        </div>
        <div class="friend-list">
          {#each filteredUsers as user}
            <div
              class="block"
              style:background={user.checked ? "#ebebeb" : "white"}
            >
              <div class="imgbx">
                <img src={user.avatar} alt="" class="cover" />
                <div
                  class={user.isOnline ? "status online" : "status offline"}
                />
              </div>
              <div class="details">
                <div class="listHead">
                  <span class="user-title">{user.name}</span>
                </div>
                <div class="check-section">
                  <input
                    type="checkbox"
                    class="checkbox"
                    bind:checked={user.checked}
                    on:change={() => addMember(user)}
                  />
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="section-right">
        <div class="avatar-section">
          <div class="image">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon icon-image"
              viewBox="0 0 512 512"
              width="200"
              height="200"
              fill="currentColor"
            >
              <rect
                x="48"
                y="80"
                width="416"
                height="352"
                rx="48"
                ry="48"
                fill="none"
                stroke="currentColor"
                stroke-linejoin="round"
                stroke-width="32"
              />
              <circle
                cx="336"
                cy="176"
                r="32"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="32"
              />
              <path
                d="M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0143.11-2L464 368"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon icon-camera"
              viewBox="0 0 512 512"
              width="40"
              height="40"
              fill="currentColor"
            >
              <circle cx="256" cy="272" r="64" />
              <path
                d="M432 144h-59c-3 0-6.72-1.94-9.62-5l-25.94-40.94a15.52 15.52 0 00-1.37-1.85C327.11 85.76 315 80 302 80h-92c-13 0-25.11 5.76-34.07 16.21a15.52 15.52 0 00-1.37 1.85l-25.94 41c-2.22 2.42-5.34 5-8.62 5v-8a16 16 0 00-16-16h-24a16 16 0 00-16 16v8h-4a48.05 48.05 0 00-48 48V384a48.05 48.05 0 0048 48h352a48.05 48.05 0 0048-48V192a48.05 48.05 0 00-48-48zM256 368a96 96 0 1196-96 96.11 96.11 0 01-96 96z"
              />
            </svg>
          </div>
          <div class="input-group">
            <div class="input-group-innerWrapper">
              <input
                type="text"
                class="input-group-name"
                placeholder="Group name"
                bind:value={groupName}
              />
              <input
                type="text"
                class="input-description"
                placeholder="description"
                bind:value={description}
              />
            </div>
          </div>
        </div>

        <div class="group-members">
          {#each $selectedMembers as member}
            <!-- <p>{member.name}</p> -->
            <div class="member">
              <img src={member.avatar} alt="" class="member-avatar" />
              <p class="member-name">{member.name}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ionicon icon-remove"
                viewBox="0 0 512 512"
                width="16"
                height="16"
                fill="currentColor"
                on:click={() => removeMember(member)}
              >
                <path
                  d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
                />
              </svg>
            </div>
          {/each}
        </div>

        <div class="bottom-section">
          <div class="btn btn-create" on:click={create}>Create</div>
          <div class="btn btn-cancel" on:click={cancel}>Cancel</div>
        </div>
      </div>
    </section>
  </div>
</div>

<style>
  .icon-image {
    color: lightgray;
  }

  .member-name {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    /* margin-left: -10px; */
  }

  .member-avatar {
    border-radius: 50%;
  }

  .member {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* max-width: 150px; */
    /* width: auto; */
    height: 40px;
    max-width: 200px;
    padding: 0px 10px 0px 0px;
    border-radius: 20px;
    background: rgb(236, 235, 235);
    /* border: 1px solid; */
  }

  .member-avatar {
    width: 35px;
    height: 35px;
  }

  .group-members {
    /* height: calc(100% - 316px); */
    padding: 10px;

    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(120px, 150px));
    /* grid-template-rows: repeat(auto-fill, 50px); */

    overflow-y: auto;
    border-radius: 20px;
    margin: 20px 50px 50px 50px;
    border: 1px dashed darkgray;
  }

  .btn-cancel {
    background: #ebebeb;
    color: gray;
    border: 1px solid lightgray;
  }

  .btn-create {
    color: white;
    background: var(--theme-color);
  }

  .btn {
    width: 40%;
    text-align: center;
    padding: 10px;
    /* color: white; */
    border-radius: 4px;
    cursor: pointer;
    /* border: 1px solid; */
  }

  .bottom-section {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding: 20px 0;
    /* border: 1px solid; */
  }

  .input-description {
    margin-top: 5px;
  }

  input {
    /* width: 100%; */
    padding: 6px 10px;
    border: none;
    outline: none;
    border-bottom: 1px solid lightgray;
  }

  .input-group-innerWrapper {
    display: flex;
    flex-direction: column;
    /* padding: 0 20px; */
    min-width: 250px;
    max-width: 600px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    margin-bottom: 10px;
    /* width: 100%; */
    /* border: 1px solid; */
  }

  .icon-camera {
    position: absolute;
    right: 0px;
    bottom: 20px;
    border-radius: 50%;
    padding: 5px;
    background: white;
    border: 1px solid darkgray;
  }

  .image {
    position: relative;
    width: 200px;
    /* border: 1px solid; */
  }

  .avatar-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 40px;
    align-items: center;
  }

  .checkbox:hover {
    cursor: pointer;
  }

  .details {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
    /* border: 1px solid; */
  }

  .imgbx img {
    width: 45px;
    height: 45px;
    overflow: hidden;
    object-fit: cover;
    border-radius: 50%;
  }

  .block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 65px;
  }

  .imgbx {
    width: 20%;
    height: 40px;
    cursor: pointer;
    margin-right: 10px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* border: 1px solid; */
  }

  .friend-list {
    margin-top: 10px;
    max-height: 100vh;
  }

  .icon-reset {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: darkgray;
  }

  .icon-search {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .search-section {
    position: relative;
  }

  .search-input {
    padding: 12px 12px 12px 28px;
    width: 100%;
  }

  section {
    display: flex;
  }

  .section-left {
    width: 330px;
    width: 30%;
    border-left: 1px solid darkgray;
    border-right: 1px solid darkgray;
  }

  .section-right {
    position: relative;
    width: calc(100% - 330px);
    width: 70%;
    border-right: 1px solid darkgray;
  }

  /* .icon-arrow-back, */
  .title {
    color: white;
  }

  section {
    height: 100%;
    /* border: 1px solid; */
  }

  /* .icon-arrow-back {
    margin-left: 10px;
  } */

  .body {
    max-width: 1020px;
    margin: auto;
    height: 100vh;
    padding: 0;
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
  }

  .title {
    margin-left: 15px;
  }

  .top {
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    background: #ff4408;
    background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);
    background: linear-gradient(90deg, #FDBB2D 0%, #22C1C3 100%);
    background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
    /* background: var(--light-dark); */
  }

  .add-group-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 200;
    /* border-radius: 8px; */
    background: white;
    overflow-y: auto;
  }

  @media (max-width: 601px) {
    section {
      flex-direction: column;
      overflow-x: hidden;
    }

    .section-left {
      width: 100%;
      height: auto;
      /* height: 100vh; */
      padding-bottom: 10px;
      border: 1px dashed darkgray;
      border-top: none;
      border-left: none;
      border-right: none;
      /* overflow: auto; */
    }

    .section-right {
      width: 100%;
      overflow-y: auto;
      border-right: none;
      /* height: 100vh; */
    }

    .bottom-section {
      position: relative;
    }
  }
</style>
