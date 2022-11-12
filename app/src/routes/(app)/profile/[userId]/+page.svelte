<script>  

    /** @type {import('./$types').PageData} */
    export let data;
    //const userdata = data

    import { onMount } from "svelte";
    import UserPosts from "$lib/components/insta/UserPosts.svelte";
    import { BASE_URL } from "$lib/config";
    import { auth } from "$lib/stores/auth";
    import { Avatar, Col, Row, Chip, Divider, Button } from "svelte-materialify";
    import EditUser from "$lib/components/setting/EditUser.svelte";
    import DeleteUser from "$lib/components/setting/DeleteUser.svelte";

    //import * as api from '$lib/utils/ApiAction';

    let api;

    onMount(async () => {
    api = await import("$lib/utils/ApiAction");
  });

  
    export let user;
    export let posts;
    let username;
  
    async function handleFollow() {
      try {
        const res = await api.followUser(user._id);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  
    async function handleUnFollow() {
      try {
        const res = await api.unFollowuser(user._id);
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
  </script>
  
  <svelte:head>
    <title>{data.username} | Sveltegram</title>
  </svelte:head>
<div class="app" style="max-width:1200px ;margin: auto;">
    <div class="profileimage">
      {#if data.avatar}
        <img class="avatar" src={data.avatar} alt={data.name} width="200px" height="200px"/>
      {:else}
        <div class="blue white-text text-h3" size={120}>
                {data.username.split("")[0].toUpperCase()}
        </div> 
      {/if}
    </div>


    <h5 class="username">{data.username}</h5>
    <div class="mt-4 mb-4 d-flex userdata">
      <div class="ma-2">{data.posts || 0} Posts</div>
      <div class="ma-2">{data.followers || 0} Followers</div>
      <div class="ma-2">{data.followings || 0} Followings</div>
    </div>

    <div class="bio">
      <p class="grey-text">
        {data.bio || ""}
      </p>
    </div>

    <div class="mt-4 mb-4 d-flex align-center">
      {#if $auth.isAuthenticated}
        {#if $auth.user._id != data._id}
          {#if isFollowing()}
            <button
              on:click={() => handleUnFollow()}
              class="blue">UnFollow</button>
          {:else}
            <button
              on:click={() => handleFollow()}
              class="blue">Follow</button>
          {/if}
        {:else}
          <EditUser />
          <DeleteUser />
        {/if}
      {/if}
    </div>


    <div style="margin:auto">
      <div>
        <!-- user posts  -->
        <!--<UserPosts {post} />-->
      </div>
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

  .profileimage{
    margin: 0;
    padding: 0;
    display: flex;
    position: relative;
    top: 10%;
    left: 10%;
  }

  .username{
    margin: 0;
    padding: 0;
    display: flex;
    position: relative;
    top: 10%;
    left: 16%;
  }

  .userdata{
    margin: 0;
    padding: 0;
    display: flex;
    position: relative;
    top: 12%;
    left: 0%;
  }

  .bio{
    margin: 0;
    padding: 0;
    display: flex;
    position: relative;
    top: 17%;
    left: -20%;
  }

  .avatar{
    width: 200px;
    height: 200px;
    border-radius:100px;
  }
</style>
  