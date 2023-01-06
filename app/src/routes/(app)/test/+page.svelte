<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data;
  const { userdata } = data


  import { page } from '$app/stores';


     
  import Stories from "$lib/components/stories/stories.svelte";
  //import Instagram from "$lib/components/posts/instagram.svelte";
  import PostCard from "$lib/components/insta/post/PostCard.svelte";

  import { onMount } from "svelte";
  import { socket } from "$lib/utils/socket"
  import { auth } from "$lib/stores/auth.js";
  import { post as postState } from "$lib/stores/post.js";
  import { user } from "$lib/stores/user.js";
  import userss from "$stores/users";
  import friend from "$stores/friend";
  import server from "$stores/server";
  import Player from "$lib/components/Music/Player/Player.svelte";
  import { fullscreenStore } from "$lib/components/Music/Player/channel";
	import { AudioPlayer } from "$lib/player";
  import { messenger } from "$lib/utils/sync";
  import { queue } from "$lib/stores/list";

  



  export let posts;
  export let users;

  //let page = 0;
  let limit = 3;
  //let totalPage = posts.pagination.totalPage;
  let totalPage = 1;
  let loading = false;

	$: hasplayer = $queue.length !== 0;


    

    

    
  onMount(async () => {
    try {
      const token = localStorage.getItem("token");
      socket.emit("authentication", {
        token: token,
      })		   
    } catch {
      console.log("error")
    }

  });

  try {
      const token = localStorage.getItem("token");
      
      const getuser = async () => {
        const res = await fetch(`http://localhost:4000/api/user`, { 
          method: 'GET',
          headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
          }
        });


      const data = await res.json();
      const userdata = data.user
      userss.set(userdata);      
      console.log(userdata)
      console.log(userss)

    }   

    getuser()
    
    } catch {
      console.log("error")
    }





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




console.log($server)
console.log($friend)
</script>

<main class="app">
    <ul class="maincontainer"> 
        <l1> 
            <div class="userprofilecard">
              <h6>Profile</h6>
                <img  class="avatar" src="{$userss.avatar}" >
                <div class="username">{$userss.username}</div>
                <div class="bio"> {$userss.bio} </div>
                <div class="status">{$userss.status}</div>

            </div> 
        </l1>

        <l1> 
          <div class="notifications">
            <h6>Notifications</h6>
            <div class="username">++ has followed you</div>
          </div> 
       </l1>

        <l1> 
          <div class="muisc">
            <h6>Music</h6>
            <div class="albumcover"></div>
            <div class="title"></div>
            <div class="player" class:show-player={hasplayer}>
              
                <Player />
              
            </div>
            <div class="albumcover"></div>

          </div> 
        </l1>


        <l1> 
          <div class="dsdsa">
            <h6>Friends activity</h6>
            <div>
              <img>
              <div class=username>rizz</div>
              <div class="activity">playing Fortnite</div>
            </div>

          </div> 
        </l1>
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