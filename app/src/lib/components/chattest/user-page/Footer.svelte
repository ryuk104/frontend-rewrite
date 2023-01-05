<script>
  import themeStore from "svelte-themes";
  import { db, storage } from "$lib/firebase/client";
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import {
    phone,
    mobile,
    isMobile,
    msgCount,
    showActionMenu,
    showCameraModal,
    showEmojiMenu,
    showAudioRecordingModal,
    message,
    selectedImg,
    loggedinUser,
    selectedUsername,
    selectedUserReady,
  } from "$lib/store";
  import {
    doc,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    Timestamp,
    collection,
  } from "firebase/firestore";
  import { t } from "$lib/i18n";
  import { onMount } from "svelte";
  import ActionMenu from "$lib/components/ActionMenu.svelte";
  import IconMenu from "$lib/components/icons/IconMenu.svelte";
  import IconCamera from "$lib/components/icons/IconCamera.svelte";
  import IconImage from "$lib/components/icons/IconImage.svelte";
  import IconEmoji from "$lib/components/icons/IconEmoji.svelte";
  import IconSubmit from "$lib/components/icons/IconSubmit.svelte";
  import IconMic from "$lib/components/icons/IconMic.svelte";

  let url = null;
  let file = null;
  let messageSent = "";
  let isMsgSent = false;

  const handleFileChange = async (e) => {
    file = e.target.files[0];
    console.log(file);
    console.log(`${file.name} is selected`);
    $selectedImg = file;

    let imgPath =
      $loggedinUser.displayName > $selectedUsername
        ? `${$loggedinUser.displayName} & ${$selectedUsername}`
        : `${$selectedUsername} & ${$loggedinUser.displayName}`;

    let imageRef = ref(
      storage,
      `letschat/messages/images/${imgPath}/${new Date().getTime()} - ${
        file.name
      }`
    );

    uploadBytes(imageRef, file).then(() => {
      console.log("image upload completed !");
      getDownloadURL(imageRef).then((_url) => {
        url = _url;
        let msgId =
          $loggedinUser.displayName > $selectedUsername
            ? `${$loggedinUser.displayName} & ${$selectedUsername}`
            : `${$selectedUsername} & ${$loggedinUser.displayName}`;
        let msgRef = collection(db, "messages", msgId, "chat");
        addDoc(msgRef, {
          from: $loggedinUser.displayName,
          to: $selectedUsername,
          createdAt: Timestamp.fromDate(new Date()),
          imageURL: url || "",
          text: `${$loggedinUser.displayName} has sent an image`,
          tag: "image",
        }).then(() => {
          console.log("document added successfully 😎");
        });
      });
    });
  };

  const handleSubmit = async () => {
    if (!$message) return;
    $showEmojiMenu = false;
    messageSent = $message;
    $message = "";

    // combined id of two users
    let msgId =
      $loggedinUser.displayName > $selectedUsername
        ? `${$loggedinUser.displayName} & ${$selectedUsername}`
        : `${$selectedUsername} & ${$loggedinUser.displayName}`;
    let msgRef = collection(db, "messages", msgId, "chat");

    try {
      await addDoc(msgRef, {
        text: messageSent,
        from: $loggedinUser.displayName,
        to: $selectedUsername,
        createdAt: Timestamp.fromDate(new Date()),
      });

      /* update selected user document */
      let selectedUserRef = doc(db, "users", $selectedUsername);
      let selectedUserSnap = await getDoc(selectedUserRef);

      await updateDoc(selectedUserRef, {
        lastMsg: selectedUserSnap
          .data()
          .lastMsg.map((msg) =>
            msg.split("=>")[0] === $loggedinUser.displayName
              ? `${$loggedinUser.displayName}=>You: ${messageSent}`
              : msg
          ),
        lastUpdated: selectedUserSnap
          .data()
          .lastUpdated.map((time) =>
            time.split("=>")[0] === $loggedinUser.displayName
              ? `${$loggedinUser.displayName}=>You: ${new Date()}`
              : time
          ),
        unread: selectedUserSnap.data().unread.map((state) =>
          state.split("=>")[0] === $loggedinUser.displayName
            ? `${$loggedinUser.displayName}=>unread`
            : state
        ),
      });

      // update login user document
      let loggedinUserRef = doc(db, "users", $loggedinUser.displayName);
      let loggedinUserSnap = await getDoc(loggedinUserRef);
      await updateDoc(loggedinUserRef, {
        lastMsg: loggedinUserSnap
          .data()
          .lastMsg.map((msg) =>
            msg.split("=>")[0] === $selectedUsername
              ? `${$selectedUsername}=>${messageSent}`
              : msg
          ),
        lastUpdated: loggedinUserSnap
          .data()
          .lastUpdated.map((time) =>
            time.split("=>")[0] === $selectedUsername
              ? `${$selectedUsername}=>${new Date()}`
              : time
          ),
        unread: loggedinUserSnap
          .data()
          .unread.map((state) =>
            state.split("=>")[0] === $selectedUsername
              ? `${$selectedUsername}=>new`
              : state
          ),
      });
      messageSent = "";
      isMsgSent = true;
      console.log("message created successfully 😁");
    } catch (error) {
      console.log("ooh, something went wrong 😥", error);
    }
  };
</script>

<div class="chatbox_input">
  <div class="menu-group">
    {#if $phone && $selectedUserReady}
      <div
        class="icon-menu-wrapper"
        on:click|stopPropagation={() => ($showActionMenu = true)}
      >
        <IconMenu />
      </div>
    {:else if $phone && !$selectedUserReady}
      <div class="icon-skeleton loading-animation" />
    {/if}

    {#if !$phone && $selectedUserReady}
      <div
        class="icon-camear-wrapper"
        on:click={() => ($showCameraModal = true)}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon icon-camera"
        viewBox="0 0 512 512"
        width="26"
        height="26"
        fill="currentColor"
      >
        <path
          d="M350.54 148.68l-26.62-42.06C318.31 100.08 310.62 96 302 96h-92c-8.62 0-16.31 4.08-21.92 10.62l-26.62 42.06C155.85 155.23 148.62 160 140 160H80a32 32 0 00-32 32v192a32 32 0 0032 32h352a32 32 0 0032-32V192a32 32 0 00-32-32h-59c-8.65 0-16.85-4.77-22.46-11.32z"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
        <circle
          cx="256"
          cy="272"
          r="80"
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
          d="M124 158v-22h-24v22"
        />
      </svg>
      <label>
        <input
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          on:change={handleFileChange}
        />
        <IconImage width="26" height="26" />
      </label>
    {:else if !$phone && !$selectedUserReady}
      <!-- <div class="icon-skeleton loading-animation" style:margin-right="15px" /> -->
      <div class="icon-skeleton loading-animation" style:margin-right="15px" />
      <div class="icon-skeleton loading-animation" style:margin-right="15px" />
    {/if}
  </div>

  <form on:submit|preventDefault={handleSubmit} class="messageBox">
    {#if $selectedUserReady}
      <div
        class="icon-emoji-wrapper"
        on:click|stopPropagation={() => ($showEmojiMenu = true)}
      >
        <IconEmoji />
      </div>
    {/if}

    {#if $selectedUserReady}
      <!-- <input type="text" placeholder="Say something" bind:value={$message} /> -->
      <input
        type="text"
        placeholder={$t("menu.say_something")}
        bind:value={$message}
      />
    {:else}
      <div class="input-skeleton loading-animation" />
    {/if}

    {#if $selectedUserReady}
      <div class="icon-submit-wrapper" on:click|preventDefault={handleSubmit}>
        <IconSubmit width="20" height="20" />
      </div>
    {/if}
  </form>

  {#if !$phone && $selectedUserReady}
    <div class="icon-mic" on:click={() => ($showAudioRecordingModal = true)}>
      <IconMic width="26" height="26" />
    </div>
  {:else if !$phone && !$selectedUserReady}
    <div class="icon-skeleton loading-animation" style:margin-left="15px" />
  {/if}
</div>

{#if $showActionMenu && $phone}
  <ActionMenu />
{/if}

<style>
  .input-skeleton {
    width: 100%;
    height: 40px;
    border-radius: 50px;
  }

  .icon-skeleton {
    width: 24px;
    height: 24px;
    border-radius: 50px;
  }

  ::placeholder {
    font-style: italic;
  }

  .chatbox_input {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    width: 100%;
    max-width: 800px;
    margin: auto;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 15px;
    backdrop-filter: blur(20px);
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding-right: 10px;
    background: rgba(235, 235, 235, 0.5);
  }

  .chatbox_input input {
    width: 100%;
    height: 100%;
    padding-left: 40px;
    padding-right: 35px;
    border: none;
    outline: none;
    font-size: 1em;
    background: #f8f8f8;
    border-radius: 50px;
  }

  .icon-mic,
  .menu-group,
  .icon-camera {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* .icon-plus { */
  .menu-group {
    margin-right: 8px;
    /* border: 1px solid; */
  }

  .messageBox {
    position: relative;
    width: 100%;
    height: 40px;
  }

  .icon-mic {
    margin-left: 10px;
    /* margin-right: 10px; */
  }

  .icon-camera {
    margin-right: 15px;
  }

  label {
    width: 26px;
    position: relative;
    margin-right: 10px;
    /* border: 1px solid red; */
  }

  label input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  @media (max-width: 1160px) {
    .chatbox_input {
      padding-left: 10px;
    }
  }

  @media (max-width: 800px) {
    .chatbox_input {
      bottom: 0;
      border-radius: 0;
    }
  }
</style>
