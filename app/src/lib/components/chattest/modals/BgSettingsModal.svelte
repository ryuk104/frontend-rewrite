<script>
  import {
    bgColor,
    showThemeModal
  } from "$lib/store";
  import { fly } from "svelte/transition";
  import Cookies from 'js-cookie';  
</script>

<ul
  class="menu-settings"
  transition:fly={{ x: 60, duration: 100, delay: 100 }}
>
  <li>
    <div class="content">
      <label>
        <input
          type="color"
          bind:value={$bgColor}
          on:input|stopPropagation={() => Cookies.set('bgColor', $bgColor)}
          style:height="0"
          style:width="0"
          style:opacity="0"
        />
        <ion-icon name="color-palette-outline" class="icon-palette" />
        <div class="title-wrapper" style:cursor='pointer'>
          <span class="menu-item">Color</span>
        </div>
      </label>
    </div>
  </li>
  <li>
    <div class="content">
      <ion-icon name="image-outline" />
      <div class="title-wrapper">
        <span
          class="menu-item"
          on:click|stopPropagation={() => ($showThemeModal = !$showThemeModal)}>Theme</span
        >
      </div>
    </div>
  </li> 
</ul>

<style>
  p {
    text-align: center;
  }

  .title-wrapper {
    width: 100%;
    text-align: center;
    /* border: 1px solid red; */
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    cursor: pointer;
    /* border: 1px solid; */
  }

  .icon-palette {
    margin-left: -3px;
    margin-right: 3px;
  }

  label {
    display: flex;
    align-items: center;
    width: 100px;
  }

  ul {
    list-style: none;
    padding: 10px;
    position: fixed;
    top: 60px;
    right: 20px;
    z-index: 200;
    border-radius: 8px;
    background: rgba(189, 202, 202, 0.5);
    backdrop-filter: blur(30px);
  }

  li {
    display: flex;
    align-items: baseline;
    justify-content: center;
    padding: 10px 10px;
  }
</style>
