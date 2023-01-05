<script>
  import { fly } from "svelte/transition";
  import {
    showCameraModal,
    showCameraPreviewModal,
    videoStream,
    pictureURI,
    pictureBlob,
    pictureFile,
    bgColor,
  } from "$lib/store";
  import { onMount } from "svelte";
  import themeStore from "svelte-themes";

  let video = null;
  // let videoStream = null;
  let canvas = null;
  let videoReady = false;

  const closeCamera = () => {
    $showCameraModal = false;
    videoReady = false;
    $videoStream.getTracks().forEach((track) => {
      track.stop();
    });
  };

  const dataURLtoBlob = (dataURI) => {
    let byteString = atob(dataURI.split(",")[1]);
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const takePicture = () => {
    console.log("picture is taken");
    canvas.width = video.getBoundingClientRect().width;
    canvas.height = video.getBoundingClientRect().height;

    let context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    $pictureURI = canvas.toDataURL();
    console.log("picture url: ", pictureURI);

    $pictureBlob = dataURLtoBlob(canvas.toDataURL());
    const file = new File(
      [$pictureBlob],
      `${new Date().getTime()}-selfie.jpg`,
      {
        type: "image/jpg",
      }
    );
    $pictureFile = file;
    console.log("selfie", $pictureFile);

    $showCameraPreviewModal = true;
  };

  onMount(async () => {
    try {
      $videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      video.srcObject = $videoStream;
      videoReady = true;
      console.log("video is ready");
    } catch (err) {
      console.log(err.message);
    }
  });

  $: if ($showCameraModal)
    console.log("camera modal is ", $showCameraModal ? "opened" : "closed");
</script>

<div
  class="camera-modal"
  on:click|stopPropagation={() => console.log("camera modal clicked !")}
  style:background={$themeStore.theme === "dark" ? "#292F3F" : "#ebebeb"}
>

  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    class="ionicon icon-close" 
    viewBox="0 0 512 512"
    on:click={closeCamera}
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
  <div class="video-wrapper">
    <video bind:this={video} autoplay>
      <track kind="captions" />
    </video>
    <canvas bind:this={canvas} style:display="none" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon icon-shutter"
      viewBox="0 0 512 512"
      on:click={takePicture}
    >
      <path
        d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
      />
    </svg>
  </div>
</div>

<style>
  .video-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  video {
    max-width: 100vw;
    max-height: 100vh;
    /* width: 100%;
    height: 100vh; */
  }

  .icon-close {
    position: fixed;
    right: 5px;
    top: 5px;
    z-index: 600;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    padding: 3px;
    /* border: 1px solid; */
  }

  .icon-shutter {
    position: absolute;
    bottom: 20px;
    width: 50px;
    height: 50px;
    z-index: 500;
  }

  /* .icon-shutter:hover {
    transform: scale(1.1);
  } */

  .camera-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 300;
    /* width: 100%; */
    max-width: 1920px;
    /* margin: auto; */
    height: 100vh;
  }

  @media (max-width: 400px) {
    .video-wrapper {
      width: 360px;
    }
  }

  @media (max-width: 306px) {
    .icon-shutter {
      bottom: 20px;
    }
  }

  /* @media (orientation: landscape) { 
    video {
      height: 100vh;      
    }
  } */
</style>
