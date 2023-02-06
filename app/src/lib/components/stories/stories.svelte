<script lang="ts">
  import Storyprofile from './storyprofile.svelte'
  import { story as storystate } from '$lib/stores/stories.js';	
	 


  //import { storyData } from '../../../testdb/story.js';		
  
  export let story;


  let loading = false;

  async function loadstories() {
    try {
      loading = true;
      const res = await fetch(`http://localhost:4000/api/stories/allstories`, { 
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            
        });
      const data = await res.json();
      const storyData = data.stories;
      storystate.addStory(storyData)

      loading = false;

      if (res.status === 201) {
        console.log(storyData)
        return storyData
      }
      if (res.type === "error") {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  loadstories()

</script>



<div class="stories">
    <a href="/story/d">
      <ul class="storiesul"> 
        {#each $storystate.story as storys}          
          <Storyprofile {storys}/>
        {/each}
    </ul>
  </a>
</div>


<style>
.stories {
  background: rgb(90, 37, 37);
  border: 1px solid #dbdbdb;
  padding: 16px 0;
  height: 100px;
  width: 80%;
  outline: 0;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  position: relative;
  top: 5%;
  left: 10%;
} 



.storiesul{
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  display:flex;
  flex-flow:row;
  justify-content:space-between;
}


</style>