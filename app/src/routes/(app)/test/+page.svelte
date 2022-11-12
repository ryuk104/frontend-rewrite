<script>
    //import { page } from '$app/stores';

    /** @type {import('./$types').PageData} */
    export let data;
    const { userdata } = data
    
    import Stories from "$lib/components/stories/stories.svelte";
    import Instagram from "$lib/components/posts/instagram.svelte";
    import PostCard from "$lib/components/insta/post/PostCard.svelte";

    import {
    Button,
    Card,
    Col,
    Icon,
    ProgressCircular,
    Row,
  } from "svelte-materialify";
  import { auth } from "$lib/stores/auth.js";
  import { post as postState } from "$lib/stores/post.js";
  import { user } from "$lib/stores/user.js";
  import { onMount } from "svelte";

  export let posts;
  export let users;

  let page = 0;
  let limit = 3;
  //let totalPage = posts.pagination.totalPage;
  let totalPage = 1;
  let loading = false;

  async function loadMore() {
    try {
      loading = true;
      page = page + 1;
      const res = await fetch(`http://localhost:4000/api/post`, { 
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        });
        const data = await res.json();
        const postData = data.data.posts;
        postState.addPosts(postData)
        //console.log(postData)
        console.log($postState.posts)

      if (res.status === 200) {
        return postData
        postState.addMorePosts(data.data.posts);
        console.log(data.data)
      }
    } catch (error) {
      console.log(error);
    } finally {
      loading = false;
    }
  }


  loadMore()



  let username;
  let avatar;
  /*
  async function loaduser() {
        try {
          const res = await fetch(`http://localhost:4000/api/auth/me`, { 
            headers: {
                'content-type': 'application/json',
				'Authorization': `Bearer ${localStorage.token}`
            }
        });

		const data = await res.json();
		 return {
            username: data.data.username,
            avatar: data.data.avatar
        } 
        }catch (error) {
          console.log(error);
        }
      };

      loaduser();
*/
</script>



<main class="app">
    <ul class="maincontainer"> 
        <l1> 
            <div class="userprofilecard">
              <h6>Profile</h6>
                <img  class="avatar" src="{data.avatar}" >
                <div class="username">{data.username}</div>
                <div class="bio">Add custom </div>
                <div class="status">{data.status}</div>

            </div> 
        </l1>

        <l1> <div class="notifications"></div> </l1>
        <l1> <div class="muisc"></div> </l1>
        <l1> <div class="dsdsa"></div> </l1>
    </ul>
    <div class="mediaacontainer">
        <Stories/>

        <!--  posts -->
        <div class="posts">
        {#each $postState.posts as post (post._id)}
          <div class="mb-8 bg-gray-500">
            <PostCard {post} />
          </div>
        {/each}
      </div>
    </div>
</main>



<style>
    .app {
        margin: 0;
        padding: 0;
        display: flex;
        position: fixed;
        top:4%;
        left: 300px;
        height: 96%;
        width: 100%;    
    }

    .posts{
      background-color:#1a1a1d;
      margin: 0;
      padding: 0;
      display: flex;
      position: fixed;
      margin: 0;
      padding: 0;
      flex-direction: column;
      background-color: rgb(73, 19, 19);
      width: 40%;
      height: 80%;
      top: 20%;
      right: 5%;  
      overflow: auto;
    }

    .maincontainer{
        background-color:#1a1a1d;
        width: 40%;
        margin: 0;
        padding: 0;
        display: flex;
        
    }

    .mediaacontainer{
        width:48%;
        background-color:#1c1c22;
        margin: 0;
        padding: 0;
        display: flex;
    }

    .userprofilecard {
        margin: 0;
        padding: 0;
        display: flex;
        position: relative;
        background-color: #292a2d;
        width: 400px;
        height: 500px;
        top: 2%;
        left: 5%;
        border-radius:10px;
    }

    .muisc {
        margin: 0;
        padding: 0;
        display: flex;
        position: relative;
        background-color: #292a2d;
        width: 400px;
        height: 500px;
        top: 2%;
        left: -80%;
        border-radius:10px;
    }

    .notifications {
        margin: 0;
        padding: 0;
        display: flex;
        position: relative;
        background-color: #292a2d;
        width: 400px;
        height: 500px;
        top: 50%;
        left: -95%;
        border-radius:10px;
    }

    .dsdsa {
        margin: 0;
        padding: 0;
        display: flex;
        position: relative;
        background-color: #292a2d;
        width: 400px;
        height: 500px;
        top: 50%;
        left: -180%;
        border-radius:10px;
    }


    .avatar {
        width: 150px;
        height: 150px;
        border-radius:80px;
        top: 10%;
        left: 10%;
        display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    justify-self: center;
    margin: auto;
    overflow: hidden;
    }

    .username{
      margin-top: 15px;
    align-self: center;
    }

    .status{
      margin-top: 15px;
    align-self: center;
    }

    .bio{
      margin-top: 15px;
    align-self: center;
    }
</style>