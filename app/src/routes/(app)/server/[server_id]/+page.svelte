

<script lang="ts">

 // /** @type {import('./$types').PageData} */
  import type { PageData } from './$types';

  export let data: PageData;
  
  import EmojiSelector from "$lib/components/emoji/index.svelte";


  import { onMount } from "svelte";
  import server from "$stores/server";
  import channel from "$stores/channel";
  import Message from "$lib/components/server/Message.svelte";
	//import { channel } from 'diagnostics_channel';



  let text = ""
  let textContent = '';

  /*
  function onEmoji(event) {
    textContent += event.detail;
  }
  */


console.log($channel)



  

  


  async function getMessages() {
    try {
      const res = await fetch(`http://localhost:4000/api/messages/channels/${data.serverdata.default_channel_id}`, { 
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        });
        const channeldata = await res.json(); 
        channel.set(channeldata)
    } catch (error) {
      console.log(error);
    } 
  }

  getMessages()



  
  async function sendMessage() {
    try {
      const res = await fetch(`http://localhost:4000/api/messages/channels/${data.serverdata.default_channel_id}`, { 
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                message: text,

            })
        });
    } catch (error) {
      console.log(error);
    } 
  }

  




  
  async function getgif() {
    try {
      const res = await fetch(`http://localhost:4000/api/tenor/categories`, { 
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        });
    } catch (error) {
      console.log(error);
    } 
  }



  




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
  <title></title>
</svelte:head>

<div class="app">

  <div class="member-list">
    <div class="member"></div>
  </div>
  
  <div class="messagebox">
    {#each $channel as message}
      <Message 						
      {message}
      />
    {/each}
    </div>
  
  <div class="chatbar">
    <form on:submit|preventDefault={sendMessage} class="chat">
      <input bind:value={text} placeholder="Enter your message..."/>
      <button>+</button>
      
      <button>GIF</button>
      <button>sticker</button>


    </form>
    <button on:click|preventDefault={getgif} >GIF</button>

    <EmojiSelector  />      

  </div>

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

    .chat{
      padding: 10px;
      border: none;
      border-radius: 3px;
      font-size: 1em;
      display: flex;
      height: 50px;
      width: 2000px;
    }
  </style>
