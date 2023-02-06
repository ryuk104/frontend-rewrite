

<script>

  /** @type {import('./$types').PageData} */
  export let data;
  import { onMount } from "svelte";
  import server from "$lib/stores/server"



  console.log($server)
  console.log(data.server)
  console.log(data)

  






  async function getMessages() {
    try {
      const res = await fetch(`http://localhost:4000/api/messages/channels/${$server.default_channel_id}`, { 
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        });
        const channeldata = await res.json(); 
    } catch (error) {
      console.log(error);
    } 
  }

  getMessages()




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
  <title>{data.name}</title>
</svelte:head>
<div style="max-width:1200px ;margin: auto;">
  <h1>dsadsa</h1>
</div>
