<script>
  import { message } from '$lib/store'

  export let width = 24, height = 24
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  class="ionicon icon-submit"
  viewBox="0 0 512 512"
  width={width}
  height={height}
  fill="currentColor"
  style:color={$message ? "#FF4408" : "currentColor"}
  style:cursor={$message ? "pointer" : "none"}
>
  <path
    d="M470.3 271.15L43.16 447.31a7.83 7.83 0 01-11.16-7V327a8 8 0 016.51-7.86l247.62-47c17.36-3.29 17.36-28.15 0-31.44l-247.63-47a8 8 0 01-6.5-7.85V72.59c0-5.74 5.88-10.26 11.16-8L470.3 241.76a16 16 0 010 29.39z"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="32"
  />
</svg>

<style>
  .icon-submit {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 22px;
  }
</style>
