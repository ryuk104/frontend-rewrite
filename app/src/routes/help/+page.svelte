<script>

import { onMount } from "svelte";

    import * as api from '$lib/utils/ApiAction';

    const user = "dsdsa"

    async function getUser() {
    try {
      const res = await api.getUser(user);

    } catch (error) {
      console.log(error);
    }
  }

  getUser()

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

  async function getPost() {
    try {
      const res = await fetch(`http://localhost:4000/api/post`, { 
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
        });
        const data = await res.json();
        const postData = data.data.posts;
        postState.addPosts(postData)
        //console.log(postData)

      if (res.status === 200) {
        return postData
        
      }
    } catch (error) {
      console.log(error);
    }
  }


  getPost()


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


      
    }   

    getuser()
    
    } catch {
      console.log("error")
    }
</script>

<h1>HIII</h1>
<!-- <Button fab icon class="pink-text" on:click={() => handleDislike()}>-->
