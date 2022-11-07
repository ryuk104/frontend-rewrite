<script>

  import PostCard from "$lib/components/insta/post/PostCard.svelte";
  import UserSideProfile from "$lib/components/insta/UserSideProfile.svelte";
  import UserSuggestions from "$lib/components/insta/UserSuggestions.svelte";
  import Settings from "$lib/components/Nav/Settings.svelte";

  import { clickOutside } from "$lib/actions/clickOutside";

 
  import { auth } from "$lib/stores/auth.js";
  import {
    Button,
    Card,
    Col,
    Icon,
    ProgressCircular,
    Row,
  } from "svelte-materialify";
  import { post as postState } from "$lib/stores/post.js";
  import { mdiPlus } from "@mdi/js";
  import { user } from "$lib/stores/user.js";
  import { onMount } from "svelte";

  export let posts;
  export let users;
  let isSettingsOpen;


  let page = 0;
  let limit = 3;
  //let totalPage = posts.data.pagination.totalPage;
  let totalPage = 2;
  let loading = false;

  
  onMount(async () => {
    let api = await import("$lib/utils/ApiAction");
  });


  //postState.addPosts(posts.data.posts);

  //user.addUsers(users.data.users);

  

  async function loadMore() {
    try {
      loading = true;
      page = page + 1;
      const res = await api.getAllPosts({ page, limit });
      if (res.type === "success") {
        postState.addMorePosts(res.data.posts);
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading = false;
    }
  }
  
    
    //import CustomeMenu from "$lib/components/customeMenu/CustomeMenu.svelte";
    //import Instagram from "$lib/components/posts/instagram.svelte";
    //import Friendsactivity from "$lib/components/friendsactivity/friendsactivity.svelte";
    import Stories from "$lib/components/stories/stories.svelte";
    //import Modal from '$lib/components/Modal.svelte'
    import {browser} from '$app/environment'
    import {goto} from '$app/navigation'


    
    //import Postbuttonpopup from '$lib/components/postbuttonpopup.svelte'

    import "../../app.css";

    
    
    
</script>


<svelte:head> 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<section class="main">
  
<!--  <CustomeMenu></CustomeMenu> -->
  <Stories></Stories> 
<!--   <Friendsactivity> -->
<!--   <UserSuggestions users={$user.users} /> -->
<!--   </Friendsactivity> -->
<!--  <Instagram></Instagram>  -->



  <div style="max-width:1200px ;margin: auto; padding-top:200px; padding-left:200px">
    <Row style="margin:auto">
      <Col sm={12} cols={12} md={8}>
        <!-- create post  -->
        {#if $auth.isAuthenticated}
          <Card
            class="pa-6 mb-8"
            style="display: flex;align-items: center;justify-content: center;"
          >
            <Button
              on:click={() => goto("/createPost")}
              size="large"
              class="blue white-text"
            >
              <Icon path={mdiPlus} />
              Create Post
            </Button>
          </Card>
        {/if}
        <!--  posts -->
        {#each $postState.posts as post (post._id)}
          <div class="mb-8 bg-gray-500	">
            <PostCard {post} />
          </div>
        {/each}
  
        {#if totalPage >= page + 1}
          <div class="d-flex justify-center">
            <Button on:click={loadMore} class="blue white-text">
              {#if loading}
                <ProgressCircular indeterminate color="white" />
              {:else}
                Load More
              {/if}
            </Button>
          </div>
        {/if}
      </Col>
  
      <Col sm={12} md={4} class="d-none d-md-block gray-500 pl-100">
        <div style="position: sticky;top: 64px; background-color:gray;">
          <UserSideProfile />
          <!-- user profile on large screen -->
          <UserSuggestions users={$user.users} />
         </div>
      </Col>
    </Row>
  </div>
  

    <div class="leftbarbuttonpfpclick">
        <div>
        </div>
    </div>
    
    
    <div>
      <button class="notificationbutton">
        NOTIFICATION
      </button>
    </div>

    <div
			use:clickOutside
			on:click_outside={() => {
				isSettingsOpen = false;
			}}
			style="display:contents; background:inherit;"
		>
			<Settings bind:isSettingsOpen />
			<button
				aria-label="Settings"
				class="nav-item icon-btn btn-settings"
				on:click|stopPropagation={() => {
					isSettingsOpen = !isSettingsOpen;
				}}
			>
				<Icon name="settings" size="1.5rem" />
			</button>
		</div>

    
</section>

<style>
.body-css{
  background: #18191A !important;
  margin: 0;
  padding: 0;
  color: var(--text);
  background: var(--bg);
  transition: background 500ms ease-in-out, color 1000ms ease-in-out;
}

.main {
  height: 100%;
  margin: auto;
  width: 100%;

}

.notificationbutton{
  background-color: rgba(0,0,0,.7);
  border-radius: 23px;
  height: 42px;
  min-width: 20px;
  position: fixed;
  border: 0;
  cursor: pointer;
  color: #fff;
  float: right;
  display: flex;
  align-items: center;
  top: 30px;
  right: 205px;
  z-index: 1;
}
</style>












