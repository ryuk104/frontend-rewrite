<script>
  import {
    showCameraPreviewModal,
    pictureURI,
    showCameraModal,
    showPhotoModal,
    pictureConfirmed,
    videoStream,
  } from "$lib/store";
  import themeStore from "svelte-themes"

  const handleConfirm = () => {
    $videoStream.getTracks().forEach((track) => {
      track.stop();
    });
    $showCameraPreviewModal = false;
    $showCameraModal = false;
    $showPhotoModal = true;
    $pictureConfirmed = true;
  };
</script>

<div
  class="cameraPreview-modal"
  style:background={$themeStore.theme === "dark" ? "#292F3F" : "#ebebeb"}
>
  <div class="cameraPreview-wrapper">
    <img src={$pictureURI} alt="" class="selfie" />
    <div class="menu-option">
      <ion-icon name="checkmark-outline" on:click={handleConfirm} />
      <ion-icon
        name="trash-outline"
        on:click={() => ($showCameraPreviewModal = false)}
      />
    </div>
  </div>
</div>

<style>
  ion-icon {
    /* font-size: clamp(2em, 3em, 4em); */
    font-size: 2em;
  }

  .menu-option {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 20px;
  }

  .cameraPreview-wrapper {
    position: relative;
    /* width: 100%;
    max-height: 100vh; */
  }

  img {
    width: 100vw;
  }

  .selfie {
    opacity: 1;
    width: 100%;
    object-fit: contain;
  }

  .cameraPreview-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 1920px;
    height: 100vh;
    z-index: 500;
    /* background: rgba(163, 156, 156, 0.8); */
    /* backdrop-filter: blur(30px); */
  }
</style>
