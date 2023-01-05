<script>
  import themeStore from "svelte-themes";
  import { showAddPeopleModal } from "$lib/store";

  let groupName = null;

  const addPeople = () => {}
</script>

<div
  class="add-people-modal"
  style:background={$themeStore.theme === "dark" ? "#292F3F" : "#ebebeb"}
>
  <div class="header">
    <h3 class="title">Add People</h3>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon icon-close"
      viewBox="0 0 512 512"
      width="24"
      height="24"
      fill="currentColor"
      on:click|stopPropagation={() => ($showAddPeopleModal = false)}
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
  </div>

  <section class="group-name-section">
    <p>Group Name</p>
    <input type="text" placeholder="Enter group name" bind:value={groupName} />
  </section>

  <section class="add-people-section">
    <p>Add People</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="ionicon icon-add"
      viewBox="0 0 512 512"
      width="32"
      height="32"
      fill="currentColor"
      on:click={addPeople}
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="32"
        d="M256 112v288M400 256H112"
      />
    </svg>
  </section>

  <div class="footer">
    <div class="btn btn-cancel">Cancel</div>
    <div class="btn btn-create">Create</div>
  </div>
</div>

<style>
  input {
    margin-top: 5px;
    /* width: 1px; */
    padding: 6px 10px;
    border-radius: 4px;
  }

  .icon-add {
    margin-top: 15px;
    padding: 3px;
    border-radius: 4px;
    border: 1px solid;
  }

  .btn-cancel {
    width: 30%;
  }

  .btn-create {
    width: 50%;
  }

  .btn {
    display: flex;
    justify-content: center;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid;
  }

  .footer {
    display: flex;
    justify-content: space-around;
    padding-top: 30px;
  }

  section {
    padding: 20px;
    border-bottom: 1px solid;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding: 35px 0;
    border-bottom: 1px solid;
  }

  .title {
    margin-left: 20px;
  }

  .icon-close {
    margin-right: 10px;
  }

  .add-people-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 20px);
    z-index: 300;
    padding: 10px;
    border-radius: 8px;
  }
</style>
