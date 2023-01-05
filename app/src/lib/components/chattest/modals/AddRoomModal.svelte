<script>
  import { showAddRoomModal } from "$lib/store";
  import { quintOut } from "svelte/easing";
  import { scale } from "svelte/transition";

  let room = "";
  let description = "";
</script>

<div
  class="add-group-modal"
  transition:scale={{ delay: 150, duration: 200, easing: quintOut }}
>
  <div class="inner-wrapper">
    <div class="top">
      <!-- <svg
        xmlns="http://www.w3.org/2000/svg"
        class="ionicon icon-close"
        viewBox="0 0 512 512"
        width="24"
        height="24"
        fill="currentColor"
        on:click|stopPropagation={() => ($showAddRoomModal = false)}
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
          d="M368 368L144 144M368 144L144 368"
        />
      </svg> -->
      <span>Create a chatroom</span>
    </div>

    <div class="avatar-section">
      <div class="image">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon icon-image"
          viewBox="0 0 512 512"
          width="200"
          height="200"
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon icon-camera"
          viewBox="0 0 512 512"
          width="40"
          height="40"
          fill="currentColor"
        >
          <circle cx="256" cy="272" r="64" />
          <path
            d="M432 144h-59c-3 0-6.72-1.94-9.62-5l-25.94-40.94a15.52 15.52 0 00-1.37-1.85C327.11 85.76 315 80 302 80h-92c-13 0-25.11 5.76-34.07 16.21a15.52 15.52 0 00-1.37 1.85l-25.94 41c-2.22 2.42-5.34 5-8.62 5v-8a16 16 0 00-16-16h-24a16 16 0 00-16 16v8h-4a48.05 48.05 0 00-48 48V384a48.05 48.05 0 0048 48h352a48.05 48.05 0 0048-48V192a48.05 48.05 0 00-48-48zM256 368a96 96 0 1196-96 96.11 96.11 0 01-96 96z"
          />
        </svg>
      </div>

      <div class="input-group">
        <input
          type="text"
          class="input-group-name"
          placeholder="Enter a name for chatroom"
          bind:value={room}
        /><br />
        <input
          type="text"
          class="input-description"
          placeholder="Describe this chatroom"
          bind:value={description}
        />
      </div>
      
      <div class="btn-group">
        <div class="btn btn-create" on:click={() => alert('Confirm to create chatroom ?')}>Confirm</div>
        <div class="btn btn-cancel" on:click|stopPropagation={() => ($showAddRoomModal = false)}>Cancel</div>
      </div>
    </div>
  </div>
</div>

<style>
  .btn-cancel {
    background: white;
    color: gray;
    border: 1px solid lightgray;
  }

  .btn-create {
    color: white;
    background: var(--theme-color);
    background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);
  }

  .btn {
    width: 40%;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    cursor: pointer;
    /* border: 1px solid; */
  }

  .btn-group {
    display: flex;
    justify-content: space-between;
    width: 300px;
    margin-top: 30px;
    /* border: 1px solid; */
  }

  input {
    padding: 6px 10px;
    border: none;
    outline: none;
    border-bottom: 1px solid lightgray;
    background: transparent;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    margin-bottom: 10px;
    width: 300px;
    /* border: 1px solid; */
  }

  .icon-camera {
    position: absolute;
    right: 0px;
    bottom: 20px;
    border-radius: 50%;
    padding: 5px;
    background: white;
    /* border: 1px solid; */
  }

  .icon-image {
    color: lightgray;
  }

  .image {
    position: relative;
    width: 200px;
    /* border: 1px solid; */
  }

  .avatar-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 40px;
    align-items: center;
  }

  /* .icon-close {
    margin: 0 10px;
  } */

  .inner-wrapper {
    max-width: 600px;
    margin: auto;
    height: 100vh;
    padding: 0;
    border-left: 1px solid darkgray;
    border-right: 1px solid darkgray;
    overflow-y: auto;
  }

  .top {
    height: 60px;
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 15px;
    color: white;
    background: blue;
    background: linear-gradient(90deg, #fdbb2d 0%, #3a1c71 100%);
    background: linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);
    background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
    background: linear-gradient(90deg, #9ebd13 0%, #008552 100%); /* good */
    background: linear-gradient(90deg, #0700b8 0%, #00ff88 100%);
    background: linear-gradient(90deg, #d53369 0%, #daae51 100%);
    background: linear-gradient(90deg, #515ada 0%, #efd5ff 100%);
  }

  .add-group-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 200;
    background: #ebebeb;
  }
</style>
