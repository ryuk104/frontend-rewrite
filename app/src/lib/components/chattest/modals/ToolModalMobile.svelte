<script>
  import { db } from "$lib/firebase/client";
  import { doc, updateDoc } from "firebase/firestore";
  import {
    file,
    mobile,
    bgColor,
    disabled,
    imageTitle,
    isMobile,
    imageURL,
    bgOpacity,
    background,
    showThemeMenu,
    selectedUsername,
    showGradientMenu,
    showMapModal,
    showToolModal,
    showToolModalMobile,
    currentSelectedUser,
    widthLessthan1000,
    selectedUserReady,
  } from "$lib/store";
  import Cookies from "js-cookie";
  import themes from "$lib/data/themes.json";
  import bgPics from "$lib/data/bgPics.json";
  import { fly, fade } from "svelte/transition";
  import { page } from "$app/stores";

  let colorVal = "#b69696";

  const handleFileChange = async (e) => {
    console.log("handle file change");
    $file = e.target.files[0];
    console.log($file);

    try {
      $imageURL = await readURL($file);
      console.log("image url: ", $imageURL);
    } catch (error) {
      console.log('convert error: ', error)
      alert('convert error: ', error)
      return
    }

    try {
      let userRef = doc(db, "users", $selectedUsername);
      await updateDoc(userRef, {
        bgColor: `url(${$imageURL})`,
      });
    } catch (error) {
      console.log('upload error: ', error)
      alert('upload error: ', error)
      return
    }

    $imageTitle = $file.name;
    console.log("file name: ", $imageTitle);
    alert("file name: ", $imageTitle);    
  };

  const readURL = (file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = (e) => res(e.target.result);
      reader.onerror = (e) => rej(e);
      reader.readAsDataURL(file);
    });
  };

  const uploadTheme = async (theme) => {
    console.log("theme: ", theme);
    console.log("selected user: ", $selectedUsername);

    let userRef = doc(db, "users", $selectedUsername);
    await updateDoc(userRef, {
      bgColor: `url(${theme.url})`,
    });
  };

  const uploadGradient = async (gradient) => {
    console.log("gradient: ", gradient);
    console.log("selected user: ", $selectedUsername);

    let userRef = doc(db, "users", $selectedUsername);
    await updateDoc(userRef, {
      bgColor: gradient.background,
    });
  };

  const uploadColor = async (color) => {
    console.log("color: ", color);
    console.log("selected user: ", $selectedUsername);

    let userRef = doc(db, "users", $selectedUsername);
    await updateDoc(userRef, {
      bgColor: color,
    });
  };

  const handleMapModal = () => {
    $showToolModalMobile = false
    $showMapModal = true
  }

  $: if ($page.url.pathname === "/") {
    $currentSelectedUser = {};
    $selectedUserReady = false;
  }
</script>

<div class="tool-modal" on:click|stopPropagation>
  <div class="top">
    {#if $selectedUserReady && $currentSelectedUser}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon icon-back"
        viewBox="0 0 512 512"
        width="24"
        height="24"
        fill="currentColor"
        on:click|stopPropagation={() => ($showToolModalMobile = false)}
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="48"
          d="M184 112l144 144-144 144"
        />
      </svg>
    {/if}
  </div>
  <div class="user-profile">
    <div class="avatar-section">
      <div class="image-wrapper">
        {#if $selectedUserReady && $currentSelectedUser}
          <img
            src={$currentSelectedUser.avatar}
            alt=""
            width="100"
            height="100"
          />
        {:else if $page.url.pathname === "/"}
          <span />
        {:else}
          <div class="user-avatar animation" />
        {/if}
      </div>
    </div>

    {#if $selectedUserReady && $currentSelectedUser}
      <li style:padding="0">
        <h3 style:width="120px">
          {$currentSelectedUser.name}
        </h3>
      </li>
      <li style:padding="0">
        <p>{$currentSelectedUser.email}</p>
      </li>
    {:else if $page.url.pathname === "/"}
      <span />
    {:else}
      <li style:padding="0">
        <h3 class="user-name">
          <span class="animation">maskman</span>
        </h3>
      </li>
      <li style:padding="0">
        <p class="user-email">
          <span class="animation">maskman@mail.com</span>
        </p>
      </li>
    {/if}
  </div>

  {#if $selectedUserReady && $currentSelectedUser}
    <ul>
      <li>
        <div
          class="option"
          on:click|stopPropagation={() => ($showThemeMenu = !$showThemeMenu)}
        >
          <div class="content">
            <div class="title-wrapper">
              <span class="menu-item">Image gallery</span>
            </div>
            {#if !$showThemeMenu}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ionicon"
                viewBox="0 0 512 512"
                width="15"
                height="15"
                fill="currentColor"
                style:margin-left="26px"
              >
                <path
                  d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"
                />
              </svg>
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ionicon"
                viewBox="0 0 512 512"
                width="15"
                height="15"
                fill="currentColor"
                style:margin-left="26px"
              >
                <path
                  d="M414 321.94L274.22 158.82a24 24 0 00-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"
                />
              </svg>
            {/if}
          </div>
        </div>
        {#if $showThemeMenu}
          <main>
            {#each bgPics as bgPic}
              <div
                class="theme-item"
                style:cursor="pointer"
                on:click={() => uploadTheme(bgPic)}
              >
                <div
                  class="theme-image"
                  style:background-image={`url(${bgPic.url})`}
                />
              </div>
            {/each}
          </main>
        {/if}
      </li>

      <!-- {#if !$disabled} -->
      <li>
        <div
          class="option"
          on:click={() => ($showGradientMenu = !$showGradientMenu)}
        >
          <div class="content">
            <div class="title-wrapper">
              <span class="menu-item">Gradient gallery</span>
            </div>
            {#if !$showGradientMenu}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ionicon"
                viewBox="0 0 512 512"
                width="15"
                height="15"
                fill="currentColor"
                style:margin-left="10px"
              >
                <path
                  d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"
                />
              </svg>
            {:else}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="ionicon"
                viewBox="0 0 512 512"
                width="15"
                height="15"
                fill="currentColor"
                style:margin-left="10px"
              >
                <path
                  d="M414 321.94L274.22 158.82a24 24 0 00-36.44 0L98 321.94c-13.34 15.57-2.28 39.62 18.22 39.62h279.6c20.5 0 31.56-24.05 18.18-39.62z"
                />
              </svg>
            {/if}
          </div>
        </div>
        {#if $showGradientMenu}
          <main>
            {#each themes as theme}
              <div
                class="theme-item"
                style:cursor="pointer"
                on:click={() => uploadGradient(theme)}
              >
                <div
                  class="theme-image"
                  style:background-image={theme.background}
                />
              </div>
            {/each}
          </main>
        {/if}
      </li>

      {#if !$isMobile}
        <li>
          <div class="content">
            <label>
              <div class="title-wrapper">
                <span class="menu-item">Select image</span>
              </div>
              <input
                type="file"
                on:change={handleFileChange}
                accept="image/png, image/jpg, image/jpeg, image/jfif, image/gif, image/tiff, image/bmp"
              />
            </label>
          </div>
        </li>
      {/if}

      <li>
        <div class="content">
          <div class="title-wrapper">
            <span class="menu-item">Set Color</span>
          </div>
          <input
            type="color"
            bind:value={colorVal}
            on:input|stopPropagation={() => uploadColor(colorVal)}
          />
        </div>
      </li>
      
      <li on:click={handleMapModal}>
        <div class="content">
          <div class="title-wrapper">
            <span class="menu-item">Show location</span>
          </div>
        </div>
      </li>
    </ul>
  {/if}
</div>

<style>
  @import url("$lib/styles/theme-modal.css");

  .icon-back {
    margin-right: 5px;
    /* border: 1px solid; */
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  main {
    width: 100%;
    /* border: 1px solid; */
  }

  .user-profile .avatar-section {
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    display: flex;
    /* border: 1px solid; */
  }

  .user-profile {
    margin-bottom: 30px;
  }

  .image-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
    /* border: 1px solid; */
  }

  .image-wrapper img {
    border-radius: 8px;
    object-fit: contain;
    object-fit: cover;
    height: 100px;
  }

  span.menu-item {
    font-size: 14px;
    letter-spacing: 0.8px;
  }

  h3.user-name {
    margin-bottom: 5px;
    margin-top: 10px;
  }

  h3,
  p {
    text-align: left;
    text-align: center;
    letter-spacing: 0.8px;
    font-size: 16px;
  }

  h3 span,
  p span {
    color: transparent;
    line-height: 0.7;
    border-radius: 4px;
  }

  .theme-item {
    padding: 0;
    /* border: 1px solid red; */
  }

  .top {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 10px;
    /* border: 1px solid; */
  }

  .content {
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* border: 1px solid; */
  }

  .option {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  label {
    margin-left: 0px;
    height: 18px;
    cursor: pointer;
  }

  label input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  ul {
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  li {
    margin: 0 10px;
    padding: 10px 0;
    list-style: none;
    cursor: pointer;
    margin-bottom: 5px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 1px solid; */
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: inherit;
  }

  .tool-modal {
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 0;
    width: 80%;
    border-radius: 8px;
    z-index: 500;
    overflow-y: auto;
    overflow-x: hidden;
    background: white;
    background: #ebebeb;
  }

  @media (max-width: 800px) {
    .tool-modal {
      top: 0px;
      bottom: 0px;
    }
  }
</style>
