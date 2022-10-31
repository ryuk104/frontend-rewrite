<script>
  import Storyprofile from './storyprofile.svelte'
  import { storyData } from '../../../testdb/story.js';		 
</script>


<div class="stories">
    <a href="/story/d">
      <ul class="storiesul"> 
        {#each storyData as {profilepicture, username}}          
          <Storyprofile {profilepicture} {username}/>
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