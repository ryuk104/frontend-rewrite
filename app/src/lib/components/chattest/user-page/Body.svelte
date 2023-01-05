<script>
  import {
    query,
    where,
    orderBy,
    collection,
    onSnapshot,
  } from "firebase/firestore";
  import { db } from "$lib/firebase/client";
  import {
    myDoc,
    loggedinUser,
    storedImageURL,
    storedPictureURL,
    selectedUsername,
    currentSelectedUser,
    showImagePreviewModal,
  } from "$lib/store";
  import { page } from "$app/stores";
  import { beforeUpdate, afterUpdate } from "svelte";
  import AudioPlayer from "$lib/components/AudioPlayer.svelte";
  import moment from "moment";
  import { quintOut } from "svelte/easing";
  import { scale, fly, fade } from "svelte/transition";

  let q = null;
  let chat = null;
  let autoscroll = null;
  let messages = [];
  let matched = false;

  const showImagePreview = (pictureURL, imageURL) => {
    $showImagePreviewModal = true;
    $storedImageURL = imageURL;
    $storedPictureURL = pictureURL;
  };

  $: if ($page.params.userId === $selectedUsername) matched = true;

  $: if (matched) {
    let msgId =
      $loggedinUser.displayName > $selectedUsername
        ? `${$loggedinUser.displayName} & ${$selectedUsername}`
        : `${$selectedUsername} & ${$loggedinUser.displayName}`;
    let msgRef = collection(db, "messages", msgId, "chat");
    q = query(msgRef, orderBy("createdAt", "asc"));
    const unsubMsgs = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      messages = msgs;
      chat?.scrollTo(0, chat.scrollHeight);
      console.log("chat messages", messages);
      return () => unsubMsgs();
    });
    matched = false;
  }

  beforeUpdate(() => {
    autoscroll =
      chat && chat.offsetHeight + chat.scrollTop > chat.scrollHeight - 20;
  });

  afterUpdate(() => {
    if (autoscroll) chat.scrollTo(0, chat.scrollHeight);
  });
</script>

<div class="chatBox" bind:this={chat}>
  {#if messages && $loggedinUser}
    {#each messages as msg}
      <div
        class="message"
        class:my_message={msg.from === $loggedinUser.displayName}
        class:friend_message={msg.from != $loggedinUser.displayName}
        in:fly={msg.from === $loggedinUser.displayName ? { x: 30, y:30, duration: 300, delay: 300 } : { x: -30, y:30, duration: 300, delay: 300 }}        
        >
        {#if $myDoc && $currentSelectedUser}
          <div class="avatar">
            <img
              src={msg.from === $loggedinUser.displayName
                ? $myDoc?.avatar
                : $currentSelectedUser.avatar}
              alt="user-avatar"
              class="image"
            />
          </div>
        {/if}
        <p
          class="message-content"
          style:padding={msg.pictureURL || msg.imageURL || msg.audioURL
            ? "0px"
            : "6px 10px 6px 10px"}
          style:background={msg.pictureURL || msg.imageURL || msg.audioURL
            ? "none"
            : msg.from === $loggedinUser.displayName
            ? "#dcf8c6"
            : msg.from != $loggedinUser.displayName
            ? "white"
            : "none"}
          style:box-shadow={msg.from === $loggedinUser.displayName &&
          $currentSelectedUser?.bgColor === "#dcf8c6"
            ? "0.1em 0.1em 0.2em darkgray"
            : msg.from !== $loggedinUser.displayName &&
              $currentSelectedUser?.bgColor === "#ffffff"
            ? "0.1em 0.1em 0.2em darkgray"
            : "none"}
          style:right={msg.from === $loggedinUser.displayName ? "30px" : ""}
          style:left={msg.from !== $loggedinUser.displayName ? "30px" : ""}
        >
          <span class="showtime">
            {moment(new Date(msg.createdAt.toDate()), ["h:mm:ss A"]).format(
              "HH:mm:ss"
            )}<br />
            {moment(new Date(msg.createdAt.toDate()), ["h:mm A"]).format("L")}
          </span>

          {#if msg.audioURL}
            <AudioPlayer audioURL={msg.audioURL} />
          {/if}

          {#if !msg.audioURL && !msg.pictureURL && !msg.imageURL}
            <span class="message-text"
              >{msg.text}
              <!-- style:color={$themeStore.theme === "dark" ? "white" : "#292f3f"} -->
            </span>
          {/if}

          {#if msg.pictureURL}
            <img
              src={msg.pictureURL}
              alt=""
              on:click={() => showImagePreview(msg.pictureURL, msg.imageURL)}
            />
          {/if}

          {#if msg.imageURL}
            <img
              src={msg.imageURL}
              alt=""
              on:click={() => showImagePreview(msg.pictureURL, msg.imageURL)}
            />
          {/if}
        </p>
      </div>
    {/each}
  {/if}
</div>

<style>
  @import url("$lib/styles/audio-player.css");

  .message.my_message .avatar {
    position: absolute;
    right: 0px;
    bottom: -2px;
    width: 25px;
    height: 25px;
  }

  .message.friend_message .avatar {
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 25px;
    height: 25px;
    /* border: 1px solid red; */
  }

  .avatar .image {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }

  img:hover {
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background: inherit;
    background: rgb(216, 216, 216);
    border-radius: 10px;
  }

  .message {
    position: relative;
    display: flex;
    max-width: 800px;
    margin: 25px auto;
  }

  .showtime {
    text-shadow: 0.1em 0.1em 0.2em black;
    font-size: 10px;
    font-weight: 400;
    color: white;
  }

  .message.my_message .showtime {
    position: absolute;
    left: -105px;
    bottom: 3px;
    width: 55px;
    width: 100px;
    text-align: right;
  }

  .message.friend_message .showtime {
    position: absolute;
    right: -105px;
    bottom: 3px;
    width: 55px;
    width: 100px;
    text-align: left;
  }

  .message.my_message {
    justify-content: flex-end;
    text-align: left;
    position: relative;
  }

  .message.friend_message .message-content {
    background: #f5f5f5;
    justify-content: flex-start;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 0px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .message-content {
    position: relative;
    max-width: 65%;
    border-radius: 10px;
    border-bottom-right-radius: 0px;
    background: var(--lemon-green);
    color: var(--icon-add-color);
  }

  .message-content .message-text {
    word-wrap: break-word;
  }

  .message img {
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }

  .chatBox {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 60px;
    bottom: 60px;
    width: 100%;
    padding: 0px 10px;
    overflow-y: auto;
    overflow-x: hidden;
    border-left: 5px solid rgba(235, 235, 235, 0.5);
    border-right: 5px solid rgba(235, 235, 235, 0.5);
  }

  @media (max-width: 800px) {
    .chatBox {
      top: 60px;
      border: none;
    }
  }
</style>
