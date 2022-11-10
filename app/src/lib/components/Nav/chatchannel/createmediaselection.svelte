<script>
  
    import { post } from "$lib/stores/post";
    import { goto } from "$app/navigation";
    import { auth } from "$lib/stores/auth";
  
  
    let title = "";
    let description = "";
    let image = "";
    /*
    const handleCreatePost = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/post`, { 
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
                title, 
                description, 
                image
            })
        });
        const data = await res.json();
        if (res.status === 200) {
          post.addPost(data.data.post);
          return goto("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    */
  </script>
  
  <svelte:head>
    <title>Create Post | Sveltegram</title>
  </svelte:head>

  <div class="main">
    <div class="selection"> </div>
    <div class="selection"> </div>
    <div class="selection"> </div>
    <div class="selection"> </div>
  </div>


  <style>
    .main{
      width: 50%;
      height: 60%;
    }

    .selection{
      
    }
  </style>
  
  
  