

<script>

  /** @type {import('./$types').PageData} */
  export let data;

  import channel from "$stores/channel"

    import {fade} from 'svelte/transition';
    import {onMount} from "svelte";
    import {messages} from "$lib/stores/messages.js";
    //import ChatBubble from "$lib/components/chat/ChatBubble.svelte";
    import ChatWindow from "$lib/components/chat/ChatWindow.svelte";
    //import ChatInput from "$lib/components/chat/ChatInput.svelte";
    //import ChatList from "$lib/components/chat/ChatList.svelte";
    //import AddChat from "$lib/components/chat/AddChat.svelte";

    import {user} from "$lib/stores/user.js";
    let video
    let audio
    let chat
    let active_contact
    let savedMsg = []
    let key
    let contact
    let codec
    let stream

/*
  import { onMount } from "svelte";
  import { BASE_URL } from "$lib/config";
  import { snackbar } from "$lib/store/ui";
  import { Avatar, Col, Row, Chip, Divider, Button } from "svelte-materialify";
  import EditUser from "$lib/components/server/TchatInput.svelte";
  import DeleteUser from "$lib/components/server/DeleteUser.svelte";

  let api;

  onMount(async () => {
    api = await import("$lib/utils/axiosApi");
  });

  export let user;
  export let posts;
  

  async function JoinServer() {
    try {
      const res = await api.JoinServer(server._id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async function LeaveServer() {
    try {
      const res = await api.LeaveServer(server._id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  $: isFollowing = () => {
    let follow = user.followers.find((u) => u._id == $auth.user._id);
    if (follow && follow._id) {
      return true;
    } else {
      return false;
    }
  };
  */
</script>

<svelte:head>
  <title>{$channel.name}</title>
</svelte:head>
<div class="app">

<div class="member-list">
  <div class="member"></div>
</div>

<div class="messagebox">
  
</div>

<div class="chatbar">

</div>














  <!-- 
    <div class="rightside">
      
        <ChatWindow>
            {#each savedMsg as message}
                <ChatBubble handleType={message.sent} message={message.msg} ownMsg={message.sent} msgFrom={message.chat} timestamp={message.t}/>
            {/each}
        </ChatWindow>
        <ChatInput on:message={sendMsg}/>
    </div>
  -->
</div>

<style>
  .app{
    margin: 0;
    padding: 0;
    display: flex;
    position: fixed;
    top:4%;
    left: 300px;
    height: 96%;
    width: 100%;    
  }

  .member-list{
    background-color:#1a1a1d;
    margin: 0;
    padding: 0;
    display: flex;
    position: fixed;
    top:4%;
    right: 0;
    height: 96%;
    width: 10%;
  }

  .messagebox{
    background-color:#202124;
    margin: 0;
    padding: 0;
    display: flex;
    position: fixed;
    top:4%;
    right: 10%;
    height: 90%;
    width: 78.4%;  
  }

  .chatbar{
    background-color:#292a2d;
    margin: 0;
    padding: 0;
    display: flex;
    position: fixed;
    bottom:0%;
    right: 10%;
    height: 6%;
    width: 78.4%;  
  }
</style>