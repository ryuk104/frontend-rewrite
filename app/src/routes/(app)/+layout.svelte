<script lang="ts">
  	/** @type {import('./$types').LayoutData} */
	export const ssr = false;

	export let data;

  	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { auth } from "$lib/stores/auth";

	interface $$Slots {
		default: {}
		secound: {}

	}

	import { socket } from "$lib/utils/socket"




    //import Topnavbutton from "$lib/components/Nav/Topnavbutton.svelte";
    import Leftnavbar from "$lib/components/Nav/leftnavbar.svelte";
    import Chatchannel from "$lib/components/Nav/chatchannel/chatchannel.svelte";
	import Tabbar from "$lib/components/Nav/tabbar/tabbar.svelte"
    //import CustomeMenu from "$lib/components/Nav/customeMenu/CustomeMenu.svelte";


	import Createmediaselection from "$lib/components/createmedia/createmediaselection.svelte"
	import { openmodal } from "$lib/stores/modal.js"


	import { redirect } from '@sveltejs/kit';

	import Nav from "$components/Music/Nav/Nav.svelte";
	import Player from "$lib/components/Music/Player/Player.svelte";
	import Wrapper from "$lib/components/Music/Wrapper/Wrapper.svelte";
	import { Popper } from "$lib/components/Music/Popper";
	import PlaylistPopper from "$lib/components/Music/PlaylistPopper";
	import { showAddToPlaylistPopper } from "$stores/stores";
	import { queue } from "$lib/stores/list";
	import Fullscreen from "$lib/components/Music/Player/Fullscreen.svelte";
	import GroupSessionCreator from "$lib/components/Music/GroupSessionCreator";
	import { fullscreenStore } from "$lib/components/Music/Player/channel";
	import { groupSession } from "$lib/stores";
	import { AudioPlayer } from "$lib/player";
	import { page } from "$app/stores";
	import { afterNavigate } from "$app/navigation";
	import SessionListService from "$stores/list/sessionList";

	$: key = $page.data.key;
	let main: HTMLElement;

	let isFullscreen = false;
	$: $fullscreenStore === "open"
		? setTimeout(() => {
				isFullscreen = true;
		  }, 425)
		: setTimeout(() => {
				isFullscreen = false;
		  }, 0);
	$: hasplayer = $queue.length !== 0;
	afterNavigate(() => {
		if (import.meta.env.SSR) return;
		if (main) main.scrollTop = 0;
	});
	// $: console.log($queue, $SessionListService);

	
	onMount(async () => {
    try {
      const token = localStorage.getItem("token");
      socket.emit("authentication", {
        token: token,
      })		   
    } catch {
      console.log("error")
    }

  });

  try {
      const token = localStorage.getItem("token");
      socket.emit("authentication", {
        token: token,
      })		   
    } catch {
      console.log("error")
    } 
  /*
	onMount(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch(`http://localhost:4000/api/auth/me`, { 
            method: 'GET',
            headers: {
                'content-type': 'application/json',
				'Authorization': `Bearer ${localStorage.token}`
            }
        });
		const data = await res.json();
		 
		  if (res.status === 200) {
            auth.setUser({ user: data.data.user, token });
			return data;
          }
          if (res.status === 500) {
            //snackbar.showSnackbar({ ...res.data });
            goto("/login");
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  });
*/

    //import '../app.css';

	/*
	import { fade } from 'svelte/transition';
	import DownloadPanel from '$lib/components/asset-viewer/download-panel.svelte';
	import AnnouncementBox from '$lib/components/shared-components/announcement-box.svelte';
	import UploadPanel from '$lib/components/shared-components/upload-panel.svelte';
	import { onMount } from 'svelte';
	import { checkAppVersion } from '$lib/utils/check-app-version';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import NavigationLoadingBar from '$lib/components/shared-components/navigation-loading-bar.svelte';
	import NotificationList from '$lib/components/shared-components/notification/notification-list.svelte';

	let shouldShowAnnouncement: boolean;
	let localVersion: string;
	let remoteVersion: string;
	let showNavigationLoadingBar = false;

	onMount(async () => {
		const res = await checkAppVersion();

		shouldShowAnnouncement = res.shouldShowAnnouncement;
		localVersion = res.localVersion ?? 'unknown';
		remoteVersion = res.remoteVersion ?? 'unknown';
	});

	beforeNavigate(() => {
		showNavigationLoadingBar = true;
	});

	afterNavigate(() => {
		showNavigationLoadingBar = false;
	});
	*/

	
	
</script>



<!--<Topnavbutton></Topnavbutton>-->
<Leftnavbar></Leftnavbar>
<Chatchannel></Chatchannel>
<Tabbar/>
<!--<CustomeMenu></CustomeMenu>-->

<main>
	<!-- {#key $page.url} -->
	<!-- 
	<div in:fade={{ duration: 100 }}>
		{#if showNavigationLoadingBar}
			<NavigationLoadingBar />
		{/if}

		<slot />

		<DownloadPanel />
		<UploadPanel />
		<NotificationList />
		{#if shouldShowAnnouncement}
			<AnnouncementBox
				{localVersion}
				{remoteVersion}
				on:close={() => (shouldShowAnnouncement = false)}
			/>
		{/if}
	</div>
-->
	<!-- {/key} -->
</main>

<!-- 
{#if $openmodal == open}
  <Createmediaselection title="Our company" buttonOptions={false}>
    <AboutUs />
  </Createmediaselection>
{/if}
-->

<slot></slot>
<slot name="second"></slot>


