<script lang="ts">
  /** @type {import('./$types').PageData} */
  export let data;
  const { userdata } = data


  //import { page } from '$app/stores';


     
  import Stories from "$lib/components/stories/stories.svelte";
  //import Instagram from "$lib/components/posts/instagram.svelte";
  import PostCard from "$lib/components/insta/post/PostCard.svelte";

  import { onMount } from "svelte";
  import { socket } from "$lib/utils/socket"
  import { auth } from "$lib/stores/auth.js";
  import { post as postState } from "$lib/stores/post.js";
  import { user } from "$lib/stores/user.js";
  import notificationss from "$stores/notifications";
  import usersactivity from "$stores/usersactivity";
  import userss from "$stores/users";
  import friend from "$stores/friend";
  import server from "$stores/server";
  import Midplayer from "$lib/components/Music/Player/midplayer.svelte";
  import { fullscreenStore } from "$lib/components/Music/Player/channel";
	import { AudioPlayer } from "$lib/player";
  import { messenger } from "$lib/utils/sync";
  import { queue } from "$lib/stores/list";

  



  export let posts;
  export let users;

  let page = 0;
  let limit = 3;
  //let totalPage = posts.pagination.totalPage;
  let totalPage = 1;
  let loading = false;

	$: hasplayer = $queue.length !== 0;


  async function getPost() {
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

  getPost()



    

    

    
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
    }   

    getuser()
    
    } catch {
      console.log("error")
    }





  
</script>

<main class="app">
    <ul class="maincontainer"> 
        <l1> 
            <div class="userprofilecard">
              <h6 class="tittletype">Profile</h6>
                <img  class="avatar" src="{$userss.avatar}" >
                <div class="username">{$userss.username}</div>
                <div class="bio"> {$userss.bio} </div>
                <div class="status">{$userss.status}</div>

            </div> 
        </l1>

        <l1> 
          <div class="notifications">
            <h6 class="tittletype" >Notifications</h6>
            <ul>
              {#each $notificationss as notify}
              <li>
                <div class="username">++ has followed you</div>
                <div>{notify}</div>
              </li>
              {/each}
            </ul>
          </div> 
       </l1>

        <l1> 
          <div class="muisc">
            <h6 class="tittletype">Music</h6>
              
                <Midplayer />
              
          </div> 
        </l1>


        <l1> 
          <div class="dsdsa">
            <h6 class="tittletype">Friends activity</h6>            
            {#each $usersactivity as activity}
            <div>
              <img>
              <div class=username>{activity.user_id}</div>
              <div class="activity">{activity.status}{activity.name}</div>
            </div>
            {/each}

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
        color: white;
    }

    .tittletype{
        position: absolute;
        top: 5%;
        left: 5%;
        font-size: 25px;
        color: white;
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
      position: relative;
        width: 150px;
        height: 150px;
        border-radius:80px;
        top: -20%;
        left: 26%;
        display: flex;
    align-items: center;
    align-self: center;
    justify-self: center;
    margin: auto;
    }

    .username{
      position: absolute;
      margin-top: 15px;
    align-self: center;


        top: 50%;
        left: 37%;
        display: flex;
    align-items: center;
    align-self: center;
    justify-self: center;
    margin: auto;
    }

    .status{
      position: relative;
top: 18%;
left: -40%;
    align-self: center;
    }

    .bio{
      position: relative;
top: 10%;
left: -12%;

        
    align-items: center;
    align-self: center;
    justify-self: center;
    }
</style>