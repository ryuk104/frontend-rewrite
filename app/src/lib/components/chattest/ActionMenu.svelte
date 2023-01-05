<script>
  import { showActionMenu, showAudioRecordingModal } from "$lib/store";
  import { fly } from "svelte/transition";
</script>

<div class="action-menu" transition:fly={{ y: 0, duration: 100, delay: 100 }}>
  <div class="icon-arrow">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon"
      viewBox="0 0 512 512"
      width="20"
      height="20"
      fill="currentColor"
      on:click={() => ($showActionMenu = false)}
    >
      <path
        d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M352 216l-96 96-96-96"
      />
    </svg>
  </div>

  <div class="icon-menu">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon icon-image"
      viewBox="0 0 512 512"
      width="35"
      height="35"
      fill="currentColor"
    >
      <rect
        x="48"
        y="80"
        width="416"
        height="352"
        rx="48"
        ry="48"
        fill="none"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-width="32"
      />
      <circle
        cx="336"
        cy="176"
        r="32"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
      />
      <path
        d="M304 335.79l-90.66-90.49a32 32 0 00-43.87-1.3L48 352M224 432l123.34-123.34a32 32 0 0143.11-2L464 368"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      />
    </svg>
    <span>Image</span>
  </div>

  <div class="icon-menu">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon icon-camera"
      viewBox="0 0 512 512"
      width="35"
      height="35"
      fill="currentColor"
    >
      <path
        d="M350.54 148.68l-26.62-42.06C318.31 100.08 310.62 96 302 96h-92c-8.62 0-16.31 4.08-21.92 10.62l-26.62 42.06C155.85 155.23 148.62 160 140 160H80a32 32 0 00-32 32v192a32 32 0 0032 32h352a32 32 0 0032-32V192a32 32 0 00-32-32h-59c-8.65 0-16.85-4.77-22.46-11.32z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      />
      <circle
        cx="256"
        cy="272"
        r="80"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
      />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M124 158v-22h-24v22"
      />
    </svg>
    <span>Snap</span>
  </div>

  <div class="icon-menu">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon icon-palette"
      viewBox="0 0 512 512"
      width="35"
      height="35"
      fill="currentColor"
    >
      <path
        d="M430.11 347.9c-6.6-6.1-16.3-7.6-24.6-9-11.5-1.9-15.9-4-22.6-10-14.3-12.7-14.3-31.1 0-43.8l30.3-26.9c46.4-41 46.4-108.2 0-149.2-34.2-30.1-80.1-45-127.8-45-55.7 0-113.9 20.3-158.8 60.1-83.5 73.8-83.5 194.7 0 268.5 41.5 36.7 97.5 55 152.9 55.4h1.7c55.4 0 110-17.9 148.8-52.4 14.4-12.7 11.99-36.6.1-47.7z"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
      />
      <circle cx="144" cy="208" r="32" />
      <circle
        cx="152"
        cy="311"
        r="32"
      />
      <circle cx="224" cy="144" r="32" />
      <circle
        cx="256"
        cy="367"
        r="48"
      />
      <circle cx="328" cy="144" r="32" />
    </svg>
    <span>Palette</span>
  </div>

  <div class="icon-menu">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon"
      viewBox="0 0 512 512"
      width="35"
      height="35"
      fill="currentColor"
      on:click={() => ($showAudioRecordingModal = true)}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M192 448h128M384 208v32c0 70.4-57.6 128-128 128h0c-70.4 0-128-57.6-128-128v-32M256 368v80"
      />
      <path
        d="M256 64a63.68 63.68 0 00-64 64v111c0 35.2 29 65 64 65s64-29 64-65V128c0-36-28-64-64-64z"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
      />
    </svg>
    <span>Voice</span>
  </div>  

  <div class="icon-menu">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon icon-game"
      viewBox="0 0 512 512"
      width="35"
      height="35"
      fill="currentColor"
    >
      <path
        d="M467.51 248.83c-18.4-83.18-45.69-136.24-89.43-149.17A91.5 91.5 0 00352 96c-26.89 0-48.11 16-96 16s-69.15-16-96-16a99.09 99.09 0 00-27.2 3.66C89 112.59 61.94 165.7 43.33 248.83c-19 84.91-15.56 152 21.58 164.88 26 9 49.25-9.61 71.27-37 25-31.2 55.79-40.8 119.82-40.8s93.62 9.6 118.66 40.8c22 27.41 46.11 45.79 71.42 37.16 41.02-14.01 40.44-79.13 21.43-165.04z"
        fill="none"
        stroke="currentColor"
        stroke-miterlimit="10"
        stroke-width="32"
      />
      <circle cx="292" cy="224" r="20" />
      <path d="M336 288a20 20 0 1120-19.95A20 20 0 01336 288z" />
      <circle cx="336" cy="180" r="20" />
      <circle cx="380" cy="224" r="20" />
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M160 176v96M208 224h-96"
      />
    </svg>
    <span>Game</span>
  </div>
</div>

<style>
  .icon-menu {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 20px 15px 15px 15px;
    /* border: 1px solid; */
  }

  .icon-arrow {
    position: absolute;
    top: -10px;
    background: #ebebeb;
    border-radius: 50px;
  }

  .action-menu {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10px;
    width: 100%;
    max-width: 800px;
    height: 80px;
    background: #ebebeb;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: center;
    /* min-width: 300px; */
  }

  @media (max-width: 800px) {
    .action-menu {
      bottom: 0px;
    }
  }

  @media (max-width: 360px) {
    .icon-menu {
      padding: 20px 9px 15px 9px;
    }
  }

  @media (max-width: 300px) {
    .icon-menu {
      padding: 20px 7px 15px 7px;
    }

    svg {
      width: 24px;
      height: 24px;
    }

    span {
      font-size: 14px;
    }
  }
</style>
