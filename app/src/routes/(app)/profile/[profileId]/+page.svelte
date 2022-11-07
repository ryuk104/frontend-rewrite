<script>  

  /** @type {import('./$types').PageData} */
  export let data;

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
    <title>{user.name} | Sveltegram</title>
  </svelte:head>
  <div style="max-width:1200px ;margin: auto;">
    <Row style="margin:auto ">
      <Col sm={12} cols={12} md={8} offset_md={2}>
        <!-- user profile  -->
  
        <Row>
          <Col cols={12} md={4}>
            {#if user.profilePic}
              <Avatar size={120}
                ><img src={user.profilePic} alt={user.name} /></Avatar
              >
            {:else}
              <Avatar class="blue white-text text-h3" size={120}>
                {user.name.split("")[0].toUpperCase()}
              </Avatar>
            {/if}
          </Col>
  
          <Col cols={12} md={8}>
            <h5>{user.name}</h5>
            <div class="mt-4 mb-4 d-flex">
              <Chip class="ma-2">{posts.length || 0} Posts</Chip>
              <Chip class="ma-2">{user.followers.length || 0} Followers</Chip>
              <Chip class="ma-2">{user.followings.length || 0} Followings</Chip>
            </div>
  
            <div>
              <p class="grey-text">
                {user.bio || ""}
              </p>
            </div>
  
            <div class="mt-4 mb-4 d-flex align-center">
              {#if $auth.isAuthenticated}
                {#if $auth.user._id != user._id}
                  {#if isFollowing()}
                    <Button
                      rounded
                      on:click={() => handleUnFollow()}
                      size="large"
                      class="blue">UnFollow</Button
                    >
                  {:else}
                    <Button
                      rounded
                      on:click={() => handleFollow()}
                      size="large"
                      class="blue">Follow</Button
                    >
                  {/if}
                {:else}
                  <EditUser />
                  <DeleteUser />
                {/if}
              {/if}
            </div>
          </Col>
        </Row>
  
        <Divider class="mt-8" />
      </Col>
    </Row>
  
    <Row style="margin:auto">
      <Col sm={12} md={8} offset_md={2}>
        <!-- user posts  -->
        <UserPosts {posts} />
      </Col>
    </Row>
  </div>
  