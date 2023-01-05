<script>
  import {
    loggedinUser
  } from "$lib/store"
  import themeStore from "svelte-themes";
  import moment from "moment";

  export let msg
</script>

<div
  class="message"
  class:my_message={msg.from === $loggedinUser.displayName}
  class:friend_message={msg.from != $loggedinUser.displayName}
>
  <p
    class="message-content"
    style:background={msg.pictureURL || msg.imageURL || msg.audioURL
      ? "none"
      : msg.from === $loggedinUser.displayName && $themeStore.theme === "dark"
      ? "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)"
      : msg.from === $loggedinUser.displayName && $themeStore.theme === "light"
      ? "#dcf8c6"
      : msg.from != $loggedinUser.displayName && $themeStore.theme === "dark"
      ? "linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%)"
      : "white"}
    style:padding={msg.pictureURL || msg.imageURL || msg.audioURL
      ? "0"
      : "8px 12px 6px 12px"}
  >
    <span
      class="showtime"
      style:color={$themeStore.theme === "dark" ? "#ebebeb" : "#292f3f"}
    >
      <!-- style:text-align={msg.audioURL ? "center" : ""} -->
      {moment(msg.createdAt.toDate()).format("LT")}
    </span>

    <!-- <svg
    xmlns="http://www.w3.org/2000/svg"
    class="ionicon icon-expand"
    viewBox="0 0 512 512"
    width="20"
    height="20"
    fill="currentColor"
    style:position="absolute"
    style:top={msg.pictureURL || msg.imageURL ? "22px" : ""}
    style:left={(msg.pictureURL || msg.imageURL) &&
    msg.from === $loggedinUser.displayName
      ? "12px"
      : ""}
    style:right={(msg.pictureURL || msg.imageURL) &&
    msg.from !== $loggedinUser.displayName
      ? "12px"
      : ""}
    style:display={msg.pictureURL || msg.imageURL ? "block" : "none"}
    on:click={() => showImagePreview(msg.pictureURL, msg.imageURL)}
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M432 320v112H320M421.8 421.77L304 304M80 192V80h112M90.2 90.23L208 208M320 80h112v112M421.77 90.2L304 208M192 432H80V320M90.23 421.8L208 304"
    />
  </svg> -->

    {#if msg.audioURL}
      <div class="audio-player" style:padding="3px 0">
        <!-- <div class="btn-play" on:click={() => playAudio(msg.audioURL)}>
        <span />
      </div> -->
        <audio controls>
          <source src={msg.audioURL} type="audio/wav" />
        </audio>
      </div>
    {/if}

    {#if !msg.audioURL && !msg.pictureURL && !msg.imageURL}
      <span
        class="message-text"
        style:color={$themeStore.theme === "dark" ? "white" : "#292f3f"}
        >{msg.text}
      </span>
    {/if}

    {#if msg.pictureURL}
      <img
        src={msg.pictureURL}
        alt=""
        />
        <!-- on:click={() => showImagePreview(msg.pictureURL, msg.imageURL)} -->
    {/if}

    {#if msg.imageURL}
      <img
        src={msg.imageURL}
        alt=""
        />
        <!-- on:click={() => showImagePreview(msg.pictureURL, msg.imageURL)} -->
        {/if}
  </p>
</div>

<style>
  img:hover {
    cursor: pointer;
  }

  .audio-player {
    display: flex;
    border-radius: 4px;
    padding: 3px 5px;
  }

  .message {
    position: relative;
    display: flex;
    max-width: 800px;
    margin: 10px auto;
  }

  .message-content {
    display: flex;
    flex-direction: column;
  }

  .message.friend_message p {
    background: #f5f5f5;
    justify-content: flex-start;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .message.my_message .showtime {
    text-align: right;
  }

  .message.friend_message .showtime {
    text-align: left;
  }

  .message.my_message {
    justify-content: flex-end;
    text-align: right;
  }

  .message p {
    position: relative;
    right: 0;
    max-width: 65%;
    border-radius: 8px;
    background: var(--lemon-green);
    color: var(--icon-add-color);
  }

  .message p .message-text {
    width: 100%;
    min-width: 40px;
    font-size: 18px;
    font-weight: 400;
  }

  .message img {
    max-width: 150px;
    max-height: 150px;
    object-fit: cover;
    border-radius: 10px;
  }

  .showtime {
    font-size: 12px;
    font-weight: 400;
  }

  .icon-expand {
    background: rgba(0, 0, 0, 0.5);
    color: rgba(255, 255, 255, 0.5);
    color: white;
    border-radius: 2px;
  }

</style>
