<script>
import { room } from '$lib/stores/chat/activeRoom.js'
import Feed from './Feed.svelte'
import { WiredCard } from 'wired-elements';
import { afterUpdate } from 'svelte';

export let chat;
export let currentUser;

let chatDiv;

afterUpdate(() => {
  const autoscroll = chatDiv && !((chatDiv.offsetHeight + chatDiv.scrollTop) > (chatDiv.scrollHeight - 1));

  if(autoscroll) {
    setTimeout(() => {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }, 1);
  }
});
</script>

{#if $room}
    <Feed />
{:else}
    <div class="welcome-box">
        <h1>Welcome!</h1>
        <div>
            <p class="sub">This is a chat room for humans and bots :)</p>
            <p class="sub">Register or login to access the chat rooms.</p>
        </div>
    </div>
{/if}

<div class="blah-chat" bind:this={chatDiv}>
  <p class="blah-chat__intro">Start of the conversation</p>
  {#each chat.messages as msg}
    <div class="{msg.user.name === currentUser.name ? 'blah-chat__message-self' : 'blah-chat__message-other'}">
      <p>
        <u>{msg.user.name === currentUser.name ? 'Me' : msg.user.name}</u>
      </p>
      <wired-card>
        {msg.message}
      </wired-card>
    </div>
  {/each}
</div>

<style lang="scss">
.welcome-box {
        display: flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
}

.sub {
  margin: .3rem;
}

.blah-chat {
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  margin: 8px;
  padding: 7px;
  border-radius: 10px;
  background-image: radial-gradient(circle, #c9c7c7 1px, transparent 0%);
  background-size: 15px 15px;
  overflow-x: hidden;

  &__intro {
    color: red;
    font-size: smaller;
  }
  &__message-self {
    text-align: right;
    color: navy;
    margin-bottom: 25px;

    p {
      width: 100%;
      color: navy;

      u {
        padding-right: 15px;
        font-weight: bolder;
        text-decoration: none;
      }
    }
  }

  &__message-other {
    text-align: left;
    color: teal;
    margin-bottom: 25px;

    p {
      width: 100%;
      color: teal;

      u {
        padding-left: 15px;
        font-weight: bolder;
        text-decoration: none;
      }
    }
  }
}
</style>