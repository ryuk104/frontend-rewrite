<script>
  import { message } from "$lib/store";

  let emojis = [];
  let selectedSet = 0;
  let setIcons = [128512, 129313, 128074, 129417, 128664, 129504];
  let emojiSets = [
    { type: "faces", minVal: 128512, maxVal: 128580 },
    { type: "faces2", minVal: 129296, maxVal: 129327 },
    { type: "body", minVal: 128066, maxVal: 128080 },
    { type: "animals", minVal: 129408, maxVal: 129442 },
    { type: "transport", minVal: 128640, maxVal: 128676 },
    { type: "misc", minVal: 129494, maxVal: 129535 },
  ];

  const clearEmojiMenu = () => (emojis = []);

  const chooseEmojiSet = (e) => {
    selectedSet = Number(e.target.dataset.id);
    clearEmojiMenu();
  };

  const addEmoji = (e) => {
    $message += e.target.textContent;
  };

  $: for (let i = min; i <= max; i++) {
    emojis = [...emojis, String.fromCodePoint(i)];
  }

  $: min = emojiSets[selectedSet].minVal;
  $: max = emojiSets[selectedSet].maxVal;
</script>

<div class="emoji-menu" on:click|stopPropagation>
  <header>
    {#each setIcons as icon, i}
      <div data-id={i} on:click={chooseEmojiSet} class="menu-icon">
        {String.fromCodePoint(icon)}
      </div>
    {/each}
  </header>

  {#each emojis as emoji}
    <span on:click={addEmoji}>{emoji}</span>
  {/each}
</div>

<style>
  * {
    box-sizing: border-box;
  }

  .menu-icon {
    width: 42.56px;
    text-align: center;
  }

  .emoji-menu {
    position: absolute;
    bottom: 60px;
    width: 280px;
    height: 248px;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 10px;
    background: #eee;
    overflow-x: hidden;
  }

  .emoji-menu header {
    width: 300px;
    display: flex;
    align-items: center;
    background: #fff;
    margin: 3px 0;
  }

  .emoji-menu header div:hover {
    border-bottom: 1px solid gray;
  }

  .emoji-menu header div {
    cursor: pointer;
  }

  span {
    font-size: 1.5rem;
    padding: 0.3rem;
    background: #eee;
    cursor: pointer;
  }

  span:active {
    background: #fff;
  }
</style>
