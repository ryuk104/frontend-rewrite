<script>
  import { onMount } from 'svelte'
  import { selectedImg, showPicModal, pictureURI, pictureFile } from "$lib/store";
  console.log("selected image", $selectedImg);

  let image = null

  const closePicModal = () => {
    $showPicModal = false
    $selectedImg = null
    $pictureURI = null
    $pictureFile = null
  }

  onMount(() => {
    image.src = window.URL.createObjectURL($selectedImg)
    console.log('image source: ', image.src)
  })
</script>

<div class="pic-modal" on:click={closePicModal}>
  <div class="image-wrapper">
    <ion-icon
      name="close-outline"
      class="icon-close"
      on:click={() => ($showPicModal = false)}
    />
    <img bind:this={image} alt="" />
  </div>
</div>

<style>
  /* .image-title {
    font-size: 0.8rem;
  } */

  .image-wrapper {
    position: relative;
    display: flex;
    height: 120px;
    width: 100%;
    justify-content: center;
    align-items: center;
    /* background: repeat center url('https://png.pngtree.com/thumb_back/fh260/back_our/20190619/ourmid/pngtree-minimalistic-gallery-grey-wooden-planks-background-image_135297.jpg');  */
    background: repeat center url('data:image/png;base64,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'); 
    /* background-size: contain; */
  }
  
  .icon-close {
    position: absolute;
    right: 0;
    top: 0;
    color: black;
  }

  .image-wrapper img {
    height: 100px;
    /* width: 82px; */
    /* width: 72px; */
    /* margin-left: -2px; */
    object-fit: contain;
    opacity: 1;
    /* border: 1px solid; */
  }

  .pic-modal {
    display: flex;
    align-items: end;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 400;
    width: 100%;
    height: calc(100vh - 60px);
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(24px);
  }
</style>
