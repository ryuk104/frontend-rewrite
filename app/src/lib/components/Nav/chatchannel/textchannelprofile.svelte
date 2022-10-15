<script context="module">
  export async function load({ fetch }) {
    const res = await fetch('https://dummyapi.io/data/v1/user')
    const textchannelprofile = await res.json()
  

  if (res.ok) {
    return {
      props: {
        textchannelprofile
      }
    }
  }

  return {
    status: res.status,
    error: new Error('fetch failed')
  }
}
</script>



<script>
  export let textchannelprofile


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
  