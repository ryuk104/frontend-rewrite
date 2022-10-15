<script>
  import Storyprofile from './storyprofile.svelte'
  import { storyData } from '../../../testdb/story.js';		 
</script>


<div class="stories">
    <div>
      <ul class="storiesul"> 
        {#each storyData as {profilepicture, username}}          
          <Storyprofile {profilepicture} {username}/>
        {/each}
  </ul>
</div>
</div>

<style>
.stories {
  background: rgb(90, 37, 37);
  border: 1px solid #dbdbdb;
  padding: 16px 0;
  height: 120px;
  width: 60%;
  outline: 0;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  display: list-item;
  position: absolute;
  top: 40%;
  left: 65%;
  z-index: -1;
  transform: translate(-70%, -350%);
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