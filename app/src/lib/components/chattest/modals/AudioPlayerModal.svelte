<script>
  import {
    showAudioPlayerModal,
    showAudioRecordingModal,
    audioFile,
    audioURL,
    audioConfirmed,
  } from "$lib/store";
  import themeStore from "svelte-themes";
  import AudioPlayer from "$lib/components/AudioPlayer.svelte";

  const handleConfirm = () => {
    $audioConfirmed = true;
    $showAudioRecordingModal = false;
    $showAudioPlayerModal = false;
  };

  const handleDelete = () => {
    $audioFile = null;
    $showAudioPlayerModal = false;
    $showAudioRecordingModal = false;
  };
</script>

<div
  class="audioPlayer-modal"
  style:background={$themeStore.theme === "dark" ? "black" : "#ebebeb"}
>
  <div class="audioPlayer-wrapper">
    <audio controls>
      <source src={$audioURL} type="audio/wav" />
      <track kind="captions" />
    </audio>
    <!-- <AudioPlayer audioURL={$audioURL} /> -->
    <div class="menu-option">
      <div class="menu-item">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
          width="24"
          height="24"
          fill="currentColor"
          on:click={handleConfirm}
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M416 128L192 384l-96-96"
          />
        </svg> -->
        <span on:click={handleConfirm}>Keep</span>
      </div>

      <div class="menu-item">
        <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
          width="24"
          height="24"
          fill="currentColor"
          on:click={handleDelete}
        >
          <path
            d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="32"
            d="M80 112h352"
          />
          <path
            d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
          />
        </svg> -->
        <span on:click={handleDelete}>Discard</span>
      </div>
    </div>
  </div>
</div>

<style>
  audio {
    border-radius: 20px;
    /* border: 1px solid #FF4408; */
  }

  span {
    color: #FF4408;
  }

  .menu-item:hover span {
    color: white;
  }
  
  .menu-item:hover {
    background: #ff4408;
  }

  .menu-item {
    width: 40%;
    padding: 8px 0;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    /* background: yellowgreen; */
    cursor: pointer;
    border: 1px solid #FF4408;
  }

  .menu-option {
    /* width: 100%; */
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    /* border: 1px solid; */
  }

  .audioPlayer-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 1000px;
    height: 100vh;
    z-index: 500;
  }
</style>
