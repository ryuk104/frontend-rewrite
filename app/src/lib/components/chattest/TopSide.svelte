<script>
  import { keyword, showModal } from '$lib/store'
</script>

<div class="topSide">
  <div class="header">
    <div class="userimg">
      <img
        class="cover"
        src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
        alt=""
      />
    </div>
    <div class="search_user">
      <div>
        <input type="text" placeholder="Search friend" bind:value={$keyword} />
        <span class="material-icons">search</span>
      </div>
    </div>
    <ul class="nav_icons" on:click={() => $showModal = !$showModal}>
      <li><span class="material-icons"> person_add_alt </span></li>
    </ul>
  </div>
</div>