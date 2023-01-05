<script>
  import {
    myDoc,
    mobile,
    bgColor,
    initial,
    imageURL,
    isMobile,
    userAvatar,
    imageTitle,
    loggedinUser,
    selectedFile,
    profileUpdated,
    showThemeMenu,
    showThemeModal,
    showCameraModal,
    showGradientMenu,
    selectedUsername,
    showSettingsModalMobile,
  } from "$lib/store";
  import { fly } from "svelte/transition";
  import { auth, db, storage } from "$lib/firebase/client";
  import { onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
  import { doc, updateDoc, getDoc } from "firebase/firestore";
  import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
  import { signout } from "$lib/functions/auth/signout";
  import themes from "$lib/data/themes.json";
  import bgPics from "$lib/data/bgPics.json";
  import { t, locales, locale } from "$lib/i18n";
  import IconCamera from "$lib/components/icons/IconCamera.svelte";

  let url = null;
  let file = null;
  let colorVal = "#b69696";
  let fileError = null;
  let fileUploaded = false;

  const logout = async () => {
    $initial = false;
    $showSettingsModalMobile = false;

    let userRef = doc(db, "users", $myDoc.name);
    await updateDoc(userRef, {
      online: false,
    });

    $myDoc = null;

    await signout();
  };

  const handleAvatarChange = (e) => {
    const types = ["image/png", "image/jpg", "image/jpeg"];

    let selectedFile = e.target.files[0];
    console.log(selectedFile);

    if (selectedFile && types.includes(selectedFile.type)) {
      file = selectedFile;
      console.log(`>>> ${file.name} selected <<<`);
      fileError = null;
    } else {
      file = null;
      fileError = "Please select an image file (png or jpg)";
    }
  };

  const handleFileChange = async (e) => {
    console.log("handle file change");
    $selectedFile = e.target.files[0];
    console.log($selectedFile);

    $imageURL = await readURL($selectedFile);
    console.log("image url: ", $imageURL);

    let userRef = doc(db, "users", $myDoc.name);
    await updateDoc(userRef, {
      bgColor: `url(${$imageURL})`,
    });

    $imageTitle = $file.name;
    console.log("image title: ", $imageTitle);
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

    let userRef = doc(db, "users", $myDoc.name);
    await updateDoc(userRef, {
      bgColor: `url(${theme.url})`,
    });
  };

  const uploadGradient = async (gradient) => {
    console.log("gradient: ", gradient);
    console.log("selected user: ", $selectedUsername);

    let userRef = doc(db, "users", $myDoc.name);
    await updateDoc(userRef, {
      bgColor: gradient.background,
    });
  };

  const uploadColor = async (color) => {
    console.log("color: ", color);
    console.log("selected user: ", $selectedUsername);

    let userRef = doc(db, "users", $myDoc.name);
    await updateDoc(userRef, {
      bgColor: color,
    });
  };

  $: if (file) {
    /* change file type to .png */
    let blob = file.slice(0, file.size, "image/png");
    let newFile = new File([blob], "avatar.png", { type: "image/png" });
    let imageRef = ref(
      storage,
      `letschat/profile/${$loggedinUser.displayName}/${newFile.name}`
    );

    /* upload image */
    fileUploaded = true;
    uploadBytes(imageRef, file).then(() => {
      console.log(">>> image uploaded <<<");
      getDownloadURL(imageRef).then((_url) => {
        url = _url;
      });
    });
  }

  $: if (url) {
    /* update user profile */
    updateProfile($loggedinUser, {
      photoURL: url,
    }).then(() => {
      console.log(">>> user profile uupdated <<<");
    });

    /* update user document */
    let userRef = doc(db, "users", $loggedinUser.displayName);
    updateDoc(userRef, {
      avatar: url,
    }).then(() => {
      console.log(">>> user document updated <<<");
      fileUploaded = false;
    });
  }
</script>

<ul
  class="modal-settings"
  on:click|stopPropagation
  transition:fly={{ x: -60, duration: 100, delay: 100 }}
>
  <!-- style:width={$mobile ? "80%" : "100%"} -->
  <div class="top">
    {#if $myDoc}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon icon-back-arrow"
        viewBox="0 0 512 512"
        width="24"
        height="24"
        fill="currentColor"
        style:margin-left="5px"
        on:click|stopPropagation={() => ($showSettingsModalMobile = false)}
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="48"
          d="M244 400L100 256l144-144M120 256h292"
        />
      </svg>
    {:else}
      <div class="icon-back-arrow-loading loading-animation" />
    {/if}
  </div>

  <div class="main">
    <div class="user-profile">
      <div class="avatar-section">
        <div class="image-wrapper">
          {#if $myDoc}
            {#if $myDoc.avatar && !fileUploaded}
              <img class="image" src={$myDoc.avatar} alt="" />
              <label>
                <input
                  type="file"
                  on:change={handleAvatarChange}
                  accept="image/png, image/jpg, image/jpeg"
                />
                <IconCamera width="24" height="24" />
              </label>
            {/if}
            {#if fileUploaded}
              <div class="loading">
                <img
                  class="loading-gif"
                  src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif"
                  alt=""
                  width="20"
                  height="20"
                />
              </div>
            {/if}
          {:else}
            <div class="user-avatar loading-animation" />
          {/if}
        </div>
      </div>

      {#if $myDoc}
        <li style:padding="0">
          <h3 style:width="120px">
            {$myDoc.name}
          </h3>
        </li>
        <li style:padding="0">
          <p>{$myDoc.email}</p>
        </li>
      {:else}
        <li style:padding="0">
          <h3 class="user-name" style:width="120px">
            <span class="loading-animation">maskman</span>
          </h3>
        </li>
        <li style:padding="0">
          <p class="user-email">
            <span class="loading-animation">maskman@mail.com</span>
          </p>
        </li>
      {/if}
    </div>

    {#if $myDoc}
      <div class="menu-wrapper">
        <li>
          <div
            class="option"
            on:click|stopPropagation={() => ($showThemeMenu = !$showThemeMenu)}
          >
            <div class="content">
              <div class="title-wrapper">
                <span class="menu-item">{$t("menu.image_gallery")}</span>
              </div>
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

        <li>
          <div
            class="option"
            on:click={() => ($showGradientMenu = !$showGradientMenu)}
          >
            <div class="content">
              <div class="title-wrapper">
                <span class="menu-item">{$t("menu.gradient_gallery")}</span>
              </div>
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

        <li>
          <div class="content" style:cursor="auto">
            <div class="title-wrapper">
              <span class="menu-item color-menu">{$t("menu.color")}</span>
              <input
                class="color-input"
                type="color"
                bind:value={colorVal}
                on:input|stopPropagation={() => uploadColor(colorVal)}
                style:cursor="pointer"
              />
            </div>
          </div>
        </li>

        <li>
          <div class="content">
            {#if $locale === "en"}
              <span class="menu-item" on:click={() => ($locale = "zh-TW")}
                >{$t("menu.language")}- CHN/中文</span
              >
            {/if}
            {#if $locale === "zh-TW"}
              <span class="menu-item" on:click={() => ($locale = "en")}
                >{$t("menu.language")}- 英文/ENG</span
              >
            {/if}
          </div>
        </li>

        <li on:click={logout}>
          <div class="content">
            <span class="menu-item">{$t("menu.logout")}</span>
          </div>
        </li>
      </div>
    {:else}
      <div class="loading-skeleton">
        <div class="loading-menu-item loading-animation" />
        <div class="loading-menu-item loading-animation" />
        <div class="loading-menu-item loading-animation" />
        <div class="loading-menu-item loading-animation" />
        <div class="loading-menu-item loading-animation" />
        <div class="loading-menu-item loading-animation" />
      </div>
    {/if}
  </div>
</ul>

<style>
  .icon-back-arrow-loading {
    width: 24px;
    height: 24px;
    border-radius: 50px;
    margin-left: 10px;
  }

  .top {
    height: 50px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .loading-skeleton {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .loading-menu-item {
    height: 20px;
    width: 150px;
    margin-bottom: 22px;
  }

  .option {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  main {
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto;
    max-height: 400px;
  }

  .theme-item {
    padding: 0;
  }

  .loading {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .color-menu {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .color-input {
    width: 92px;
    opacity: 0;
  }

  span.menu-item {
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.8px;
    color: rgb(55, 63, 80);
    text-transform: uppercase;
  }

  h3.user-name,
  p.user-email {
    margin-bottom: 5px;
    margin-top: 10px;
  }

  p {
    text-align: left;
    letter-spacing: 0.8px;
    font-size: 16px;
  }

  h3 span,
  p span {
    color: transparent;
    line-height: 0.7;
    border-radius: 4px;
  }

  .user-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }

  label input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  .image-wrapper .image {
    border-radius: 8px;
    object-fit: cover;
    height: 100px;
  }

  .image-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
  }

  .user-profile .avatar-section {
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    display: flex;
  }

  .user-profile {
    margin-bottom: 30px;
  }

  .title-wrapper {
    position: relative;
    width: 100%;
  }

  .content {
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    height: 36px;
  }

  .top {
    height: 50px;
    margin-bottom: 10px;
  }

  label {
    display: flex;
    align-items: center;
    width: 100px;
  }

  li {
    margin: 0 10px;
    padding: 0px 0;
    list-style: none;
    margin-bottom: 5px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  li h3 {
    text-align: center;
    margin-top: 10px;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-thumb {
    background: inherit;
  }

  ul {
    position: absolute;
    top: 0px;
    left: 0;
    width: 100%;
    z-index: 100;
    height: calc(100vh - 20px);
    border-radius: 8px;
    overflow-y: auto;
    padding-bottom: 30px;
    background: #ebebeb;
  }

  @media (max-width: 800px) {
    .modal-settings {
      margin: 0;
      border-radius: 0;
      height: 100vh;
    }
  }
</style>
