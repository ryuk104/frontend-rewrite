<script>
  import { fade } from "svelte/transition";
</script>

<!-- <div class="modal-loading" transition:fade> -->
<div class="modal-loading">
  <div class="lds-ring">
    <div />
    <div />
    <div />
    <div />
  </div>
</div>

<style>
  .modal-loading {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }  
</style>
