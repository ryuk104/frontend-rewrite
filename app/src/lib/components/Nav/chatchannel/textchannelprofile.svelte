<script>

async function textchannel() {
    try {
      //loading = true;
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




   

</script>



  {#each textchannelprofile as textchannelpeopel}      
    <section class="Textchannelprofile">
      <a class="channelprofile" href={`/profiles/${textchannelprofile.id}`}> 
        <div class="avatarpicture" role="img"> 
          <img src={textchannelpeopel.picture} class="avatarpicturecircle" width="48px" hieght="48px" alt="d"> 
        </div>
        <div class="friendsusername">{textchannelpeopel.firstName}</div>
        <div class="desc">{textchannelpeopel.title}</div>
      </a>
    </section>
  {/each}
  
  
  


<style>
.channelprofile {
  margin-left: 8px;
  display: flex;
  box-sizing: border-box;
  border-radius: 4px;
  outline: 0;
  margin-right: 12px;
  max-width: 224px;
  background-color: var(--gray4);
  height: 48px;
  margin-top: 15px;
  cursor: pointer;
}

.avatarpicture{
  padding-left:10px;
  display: flex;
  position: relative;
  width: 48px;
  height: 48px;
}
</style>
  