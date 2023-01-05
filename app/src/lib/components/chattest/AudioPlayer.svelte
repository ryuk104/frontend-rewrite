<script>
  import { onMount } from "svelte";

  export let audioURL;

  let audio = null;
  let duration = 0;
  let isPlayed = false;

  const playAudio = () => {
    isPlayed = !isPlayed;
    if (isPlayed) {
      audio.play();
      audio.addEventListener("ended", () => (isPlayed = false));
    }
    if (!isPlayed) audio.pause();
  };

  onMount(() => {
    audio = new Audio(audioURL);
    audio.addEventListener("loadeddata", () => {
      audio.volume = 0.55;
    });
  });
</script>

<div class="audio-player">
  <div class="controls">
    <div class="play-container">
      <div
        class="toggle-play {isPlayed ? 'pause' : 'play'}"
        on:click={playAudio}
      />
    </div>
  </div>
</div>

<style>
  .audio-player {
    height: 100px;
    width: 100px;
    /* background-image: url("/radio.png"); */
    background-image: url("/radio-2.png");
    background-size: contain;
    /* border: 1px solid blue; */
  }

  .controls {
    display: flex;
    justify-content: center;
    height: 100px;
  }

  .controls .play-container {
    display: flex;
  }
  
  .toggle-play.play {
    cursor: pointer;
    position: relative;
    top: 55px;
    left: -12px;
    height: 0;
    width: 0;
    border: 7px solid #0000;
    border-left: 13px solid white;
  }
  
  .toggle-play.play:hover {
    transform: scale(1.1);
  }
  
  .toggle-play.pause {
    height: 15px;
    width: 20px;
    cursor: pointer;
    position: relative;
  }

  .toggle-play.pause:before {
    position: absolute;
    top: 55px;
    left: -12px;
    background: white;
    content: "";
    height: 15px;
    width: 3px;
  }

  .toggle-play.pause:after {
    position: absolute;
    top: 55px;
    left: -7px;
    background: white;
    content: "";
    height: 15px;
    width: 3px;
  }
</style>
