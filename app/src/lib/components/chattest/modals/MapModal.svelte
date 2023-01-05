<script>
  import {
    showMapModal,
    latitude,
    longitude,
    myDoc,
    currentSelectedUser,
  } from "$lib/store";
  import { fly, fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { t } from "$lib/i18n";
  import { db } from "$lib/firebase/client";
  import { doc, getDoc } from "firebase/firestore";
  import IconClose from '$lib/components/icons/IconClose.svelte'

  let iconClose = false;
  let tempLocation = [];

  const closeMapModal = () => $showMapModal = false

  onMount(async () => {
    const myRef = doc(db, "users", $myDoc.name);
    const mySnap = await getDoc(myRef);
    const myGeoLocation = mySnap.data().geoLocation;
    console.log(`${$myDoc.name}'s geoLocation: ${myGeoLocation}`);

    const userRef = doc(db, "users", $currentSelectedUser.name);
    const userSnap = await getDoc(userRef);
    const userGeoLocation = userSnap.data().geoLocation;
    console.log(
      `${$currentSelectedUser.name}'s geoLocation: ${userGeoLocation}`
    );

    const leaflet = await import("leaflet");

    const map = leaflet.map("map").setView([$latitude, $longitude], 3);
    // const map = leaflet.map("map").setView([myGeoLocation[0], myGeoLocation[1]], 3);

    leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
      .addTo(map);

    leaflet
      .marker([myGeoLocation[0], myGeoLocation[1]])
      .addTo(map)
      .bindPopup(`${$t("menu.hi")}, ${$myDoc.name}`)
      .openPopup();

    leaflet
      .marker([userGeoLocation[0], userGeoLocation[1]])
      .addTo(map)
      .bindPopup(`${$currentSelectedUser.name} ${$t("menu.isHere")}`)
      .openPopup();

    // for (var i = 0; i < tempLocation.length; i++) {
    //   marker = new L.marker([tempLocation[i][0], tempLocation[i][1]])
    //     .bindPopup(tempLocation[i][0])
    //     .addTo(map)
    //     .openPopup();
    // }

    iconClose = true;
  });
</script>

<div class="map-modal" transition:fly={{ y: 100, duration: 100, delay: 100 }}>
  {#if iconClose}   
  <div class="icon-wrapper" on:click={() => $showMapModal = false}>
    <IconClose width="32" height="32" />
  </div>
  {/if}
  <div id="map" />
</div>

<style>
  @import "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";

  #map {
    width: 100%;
    /* width: 1920px; */
    height: 100vh;
  }

  .map-modal {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 1920px;
    height: 100vh;
    z-index: 300;
  }
</style>
