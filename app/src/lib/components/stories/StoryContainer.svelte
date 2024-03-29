<script>
  import Storytemp from './storytemp.svelte';
  import User from './User.svelte';
  import { users } from './mockData.js';
  import swipe from './swipe';
  

  async function loadstories() {
    try {
      const res = await fetch(`http://localhost:4000/api/stories/:storyId`, { 
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            
        });
      const data = await res.json();
      const storyData = data.stories;


      if (res.status === 201) {
        console.log(storyData)
        return storyData
      }
      if (res.type === "error") {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  loadstories()

  let currentUserIndex = 0;
  let currentImageIndex = 0;
  let offset = 0;
  let swiping = false;
  let stories;

  const SWIPE_THRESHOLD = 100;

  function handleClick(e) {
    if (swiping) return;
    const median = stories.offsetLeft + stories.clientWidth / 2;
    const forward = e.clientX > median;
    if (e.ctrlKey) {
      forward ? nextUser() : previousUser(true);
    } else {
      changeImage(forward);
    }
  }

  let swipeTimeout;
  function handleSwipe(e) {
    const { complete, direction, dx } = e.detail;
    swiping = true;
    // prevent clicks from triggering on a swipe
    clearTimeout(swipeTimeout);
    swipeTimeout = setTimeout(() => (swiping = false), 100);
    if (complete) {
      if (Math.abs(dx) < SWIPE_THRESHOLD) {
        offset = 0;
        return;
      }
      switch (direction) {
        case 'right':
          previousUser(true);
          break;
        case 'left':
          nextUser();
          break;
      }
    } else {
      offset = direction === 'left' && dx / 3;
    }
  }

  function changeImage(forward) {
    if (forward) {
      if (currentImageIndex < getLastImageIndexForCurrentUser()) {
        currentImageIndex++;
      } else {
        nextUser();
      }
    } else {
      if (currentImageIndex > 0) {
        currentImageIndex--;
      } else {
        previousUser();
      }
    }
  }

  function handleKeydown({ key, ctrlKey }) {
    switch (key) {
      case 'ArrowLeft':
        ctrlKey ? previousUser(true) : changeImage(false);
        break;
      case 'ArrowRight':
        ctrlKey ? nextUser() : changeImage(true);
        break;
    }
  }

  function nextUser() {
    offset = 0;
    if (currentUserIndex < users.length) {
      currentUserIndex++;
      currentImageIndex = 0;
    }
  }

  function previousUser(goToFirstImage = false) {
    offset = 0;
    if (currentUserIndex > 0) {
      currentUserIndex--;
      currentImageIndex = goToFirstImage
        ? 0
        : getLastImageIndexForCurrentUser();
    } else {
      currentImageIndex = 0;
    }
  }

  function getLastImageIndexForCurrentUser() {
    return users[currentUserIndex]
      ? users[currentUserIndex].images.length - 1
      : 0;
  }
</script>

<style>
  .stories {
    --story-border-radius: 3ch;

    max-width: 480px;
    max-height: 848px;

    width: 100vw;
    height: 100vh;
    margin: 0 auto;

    position: relative;
    user-select: none;

    background: lightblue;
    border-radius: var(--story-border-radius);
  }

  @media (max-width: 480px) {
    .stories {
      --story-border-radius: 0;
    }
  }

  :global(.stories.focus-visible:focus) {
    outline: 5px solid red;
  }

  .end {
    position: absolute;
    top: 45%;
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    padding: 0 1rem;
  }

  #hover,
  #focus {
    display: none;
    padding: 0.5rem 1rem 1rem 1rem;
  }

  .instructions {
    z-index: var(--stack-order);
    position: absolute;
    background: black;
    color: white;
    bottom: 0;
    width: 100%;
    text-align: center;
    border-radius: 0 0 var(--story-border-radius) var(--story-border-radius);
  }

  /* Show relevant instructions on hover/focus 
    Adapted from Inclusive Components */
  :global(.stories:hover:not(.focus-visible)) #hover,
  :global(.stories.focus-visible:focus #focus) {
    display: block;
  }
</style>

<!-- Add to window instead of container to capture swipes outside the window -->
<svelte:window use:swipe on:swipe={handleSwipe} />

<div
  class="stories"
  bind:this={stories}
  role="region"
  aria-label="stories"
  tabindex="0"
  aria-describedby="focus"
  on:click={handleClick}
  on:keydown={handleKeydown}>
  {#each users as user, userIdx}
    {#if userIdx >= currentUserIndex}
      <User
        {user}
        stackOrder={users.length - userIdx}
        offset={userIdx === currentUserIndex ? offset : 0}>
        {#each user.images as image, imageIdx}
          {#if userIdx !== currentUserIndex || imageIdx >= currentImageIndex}
            <Storytemp {image} stackOrder={user.images.length - imageIdx} />
          {/if}
        {/each}
      </User>
    {/if}
  {/each}
  <p class="end">You've reached the end!</p>
  <div class="instructions" style="--stack-order: {users.length + 1}">
    <p id="hover">
      Tap on the left and right side to scroll. Holding CTRL or swiping skips to
      the next user.
    </p>
    <p id="focus">
      Use the left and right arrow keys to scroll. Holding CTRL or swiping skips
      to the next user.
    </p>
  </div>
</div>
