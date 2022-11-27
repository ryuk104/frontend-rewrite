

<script>

  /** @type {import('./$types').PageData} */
  export let data;
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
  <title>fdsf</title>
</svelte:head>
<div style="max-width:1200px ;margin: auto;">
 
</div>
