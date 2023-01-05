<script lang='ts'>

	//import '../app.css';
	import { onMount } from 'svelte';
	//import { Spinner } from '$components/core';
	import ToastContainer from '$lib/components/chattest/core/Toast/ToastContainer.svelte';
	//import 'bootstrap-icons/font/bootstrap-icons.css';


	const darkModeToggle = () => {
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	};

	//new
	import {
    phone,
    myDoc,
    mobile,
    bgColor,
    allUsers,
    initial,
    userEmail,
    connection,
    widthLessthan1200,
    widthLessthan1000,
    currentSelectedUser,
    loggedinUser,
    loginUserEmail,
    showToolModal,
    showEmojiMenu,
    showActionMenu,
    showSearchBar,
    showImagePreviewModal,
    showCameraPreviewModal,
    showThemeModal,
    showToolModalMobile,
    showCameraModal,
    showVideoChatModal,
    showMapModal,
    showThemeMenu,
    showGradientMenu,
    showSettingsModalMobile,
    showAddFriendModal,
    showAddGroupModal,
    showAddRoomModal,
    showAudioPlayerModal,
    showAudioRecordingModal,
    latitude,
    longitude,
  } from "$lib/stores/chat";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";

  //import ChatList from "$lib/components/chattest/ChatList.svelte";
  //import SvelteTheme from "svelte-themes/SvelteTheme.svelte";
  //import SidebarMenu from "$lib/components/chattest/SidebarMenu.svelte";
  //import themeStore, { setTheme } from "svelte-themes";
  //import ToolModal from "$lib/components/chattest/modals/ToolModal.svelte";
  //import ImagePreviewModal from "$lib/components/chattest/modals/ImagePreviewModal.svelte";
  //import CameraModal from "$lib/components/chattest/modals/CameraModal.svelte";
  //import CameraPreviewModal from "$lib/components/chattest/modals/CameraPreviewModal.svelte";
 //import ActionMenu from "$lib/components/chattest/ActionMenu.svelte";
  //import AudioPlayerModal from "$lib/components/chattest/modals/AudioPlayerModal.svelte";
  //import AudioRecordingModal from "$lib/components/chattest/modals/AudioRecordingModal.svelte";
  //import SettingsModal from "$lib/components/chattest/modals/SettingsModal.svelte";
  //import MapModal from "$lib/components/chattest/modals/MapModal.svelte";
  //import AddFriendModal from "$lib/components/chattest/modals/AddFriendModal.svelte";
  //import AddGroupModal from "$lib/components/chattest/modals/AddGroupModal.svelte";
  //import AddRoomModal from "$lib/components/chattest/modals/AddRoomModal.svelte";
  // import VideoChatModal from "$lib/components/chattest/modals/VideoChatModal.svelte";
  //import LoadingModal from "$lib/components/chattest/modals/LoadingModal.svelte";
 //import { scale, fly, fade } from "svelte/transition";

  let user = null;
  let userDocReady = false;

  const geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000,
  };

  const desktopOrMobile = () => {
    if (window.innerWidth <= 1200) $widthLessthan1200 = true;
    if (window.innerWidth > 1200) $widthLessthan1200 = false;

    if (window.innerWidth <= 1000) $widthLessthan1000 = true;
    if (window.innerWidth > 1000) $widthLessthan1000 = false;

    if (window.innerWidth <= 800) $mobile = true;
    if (window.innerWidth > 800) $mobile = false;

    if (window.innerWidth <= 330) $phone = true;
    if (window.innerWidth > 330) $phone = false;
  };

  const closeModal = () => {
    $showEmojiMenu = false;
    $showToolModal = false;
  };

  const success = async (position) => {
    $latitude = position.coords.latitude;
    $longitude = position.coords.longitude;

    console.log(`${$loggedinUser.displayName}'s latitude: `, $latitude);
    console.log(`${$loggedinUser.displayName}'s longitude: `, $longitude);

    const userRef = doc(db, "users", $loggedinUser.displayName);
    await updateDoc(userRef, {
      geoLocation: [$latitude, $longitude],
    });
  };

  // $: if ($loggedin)

  // $: if ($myDoc) {
  //   const userRef = doc(db, 'users', $myDoc?.name)
  //   updateDoc(userRef, {
  //     geoLocation: [$latitude, $longitude]
  //   }).then(() => {
  //     console.log('geoLocation updated successfully')
  //   })
  // }

  const error = () => {
    console.log("no position available !");
  };

  onMount(async () => {
    desktopOrMobile();
    onAuthStateChanged(auth, (_user) => {
      if (!_user) {
        $loggedinUser = null;
        $allUsers = null;
        console.log("signout, user: ", $loggedinUser);
        goto("/login");
      } else {
        // signout()
        $loggedinUser = _user;
        console.log("login user: ", _user);
        console.log("signin, user: ", $loggedinUser.displayName);

        let usersRef = collection(db, "users");
        let userQuery = query(
          usersRef,
          where("contactList", "array-contains", $loggedinUser.displayName)
        );
        const unsubUsers = onSnapshot(userQuery, (snapshot) => {
          let tempUsers = [];
          snapshot.forEach((doc) => {
            tempUsers.push(doc.data());
          });
          $allUsers = tempUsers;
          console.log(`${$loggedinUser.displayName}'s contact list`, $allUsers);
          return () => unsubUsers();
        });

        /* this block of codes cause sveltechat login failure !!!*/
        let userRef = doc(db, "users", $loggedinUser.displayName);
        updateDoc(userRef, {
          online: true,
        });
        const unsubUser = onSnapshot(userRef, (userSnap) => {
          $myDoc = userSnap.data();
          return () => unsubUser;
        });

        navigator.geolocation.getCurrentPosition(success, error, geoOptions);
      }
    });
    $currentSelectedUser = null;

    // Get current position
    // try {
    //   const position = await navigator.geolocation.getCurrentPosition(geoOptions);
    //   console.log("position", position);
    // } catch (error) {
    //   console.log(error.message);
    // }
  });

  // $: if ($loggedinUser) userDocReady = true;

  /* This block of codes messed up when a user sign up !!! */
  // $: if (userDocReady) {
  //   let userRef = doc(db, "users", $loggedinUser.displayName);
  //   const unsubUser = onSnapshot(userRef, (userSnap) => {
  //     $myDoc = userSnap.data();
  //     return () => unsubUser;
  //   });
  //   userDocReady = false;
  // }

  $: {
    if (browser) {
      window.addEventListener("online", () => {
        $connection = true;
        console.log("internet is connected 😀");
      });

      window.addEventListener("offline", () => {
        $connection = false;
        console.log("OOh, internet is disconnected 😮");
      });

      window.addEventListener("click", (e) => {
        $showSettingsModalMobile = false;
        $showToolModalMobile = false;
        $showAddFriendModal = false;
        $showAddGroupModal = false;
        $showAddRoomModal = false;
        $showThemeModal = false;
        $showThemeMenu = false;
        $showGradientMenu = false;
        $showActionMenu = false;
        // $showSearchBar = false
      });

      window.addEventListener("resize", () => desktopOrMobile());
    }
  }
</script>

<div class='wwrap dark:bg-dark-2 flex flex-col'>
	<div class='app-height app-wrapper-layout'>
			<slot />
	</div>
	<ToastContainer />
	<div class="wrapper" on:click={closeModal}>
		<div
		  class="inner-wrapper"
		  style:display={$page.url.pathname === "/login" ? "block" : "flex"}
		  style:background={$page.url.pathname === "/"
			? `${$myDoc && $myDoc.bgColor} center / cover`
			: $page.url.pathname !== "/" && $page.url.pathname !== "/login"
			? `${$currentSelectedUser?.bgColor} center / cover`
			: "#ebebeb"}
		  style:-o-transition="background 300ms linear"
		>
		  <!-- style:transition="background 300ms linear" -->
		  <!-- <SettingsModal />-->
		  <div
			class="leftSide"
			style:display={$mobile && $page.url.pathname === "/"
			  ? "block"
			  : $mobile && $page.url.pathname != "/"
			  ? "none"
			  : !$mobile && $page.url.pathname != "/login"
			  ? "block"
			  : "none"}
			style:width={$mobile && $page.url.pathname === "/"
			  ? "100%"
			  : $mobile && $page.url.pathname != "/"
			  ? "0"
			  : $showCameraModal || $showAudioRecordingModal || $showAudioPlayerModal
			  ? "0%"
			  : !$mobile && $page.url.pathname != "/login"
			  ? "350px"
			  : "0%"}
		  >
			<!--<ChatList />-->
		  </div>
		  <div
			class="rightSide"
			style:display={$mobile && $page.url.pathname === "/" ? "none" : "block"}
			style:width={$mobile && $page.url.pathname === "/"
			  ? "0%"
			  : $mobile && $page.url.pathname != "/"
			  ? "100%"
			  : "100%"}
		  >
			<!-- <slot />-->
		  </div>
	  
		  {#if $showAddFriendModal}/
			<AddFriendModal />
		  {/if}
	  
		  {#if $showAddGroupModal}
			<AddGroupModal />
		  {/if}
	  
		  {#if $showAddRoomModal}
			<AddRoomModal />
		  {/if}
	  
		  {#if $showImagePreviewModal}
			<ImagePreviewModal />
		  {/if}
	  
		  {#if $showCameraModal}
			<CameraModal />
		  {/if}
	  
		  {#if $showCameraPreviewModal}
			<CameraPreviewModal />
		  {/if}
	  
		  {#if $showAudioRecordingModal}
			<AudioRecordingModal />
		  {/if}
	  
		  {#if $showAudioPlayerModal}
			<AudioPlayerModal />
		  {/if}
	  
		  {#if $showVideoChatModal}
			<VideoChatModal />
		  {/if}
	  
		  {#if $showMapModal}
			<MapModal />
		  {/if}
		</div>
	  </div>
</div>


<style>
	.wwrap {
		margin: 0;
        padding: 0;
        display: flex;
        position: fixed;
        top:4%;
        left: 300px;
        height: 96%;
        width: 100%;    
	}
</style>


