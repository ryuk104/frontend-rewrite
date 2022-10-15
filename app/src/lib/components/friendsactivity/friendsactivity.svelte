<script>
  import Friendsactivityprofile from './friendsactivityprofile.svelte'
  import { bookData } from '../../../testdb/user.js';		 
</script>



<div class="friendsactivivty">
    <ul class="friendsactivivtylist">

  {#each bookData as {profilepicture, username}}          
    <Friendsactivityprofile {profilepicture} {username} 
    />
  {/each}

    </ul>
</div>


<style>
.friendsactivivtylist{
  background: #fff;
  border: 1px solid #dbdbdb;
  padding: 16px 0;
  height: 380px;
  width: 300px;
  outline: 0;
  overflow-y: hidden;
  display: flex;
  flex-direction: row;
  display: list-item;
  position: absolute;
  top: 40%;
  left: 80%;
  border-radius: 20px;
  z-index: -1;

}

.friendactivivty{
  align-items: center;
  align-self: center;
  background: 0 0;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding-bottom: 0;
  padding-top: 0;
  text-align: center;
  width: 64px;
}

.firendactvitypfp{
  align-items: center;
  align-self: center;
  background: 0 0;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  padding-top: 0;
  text-align: center;
  width: 50px;
  border-radius: 40px;
}
</style>