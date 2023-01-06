<script>
export let data;

import { bookData } from '../../../../testdb/user.js';		 
import Userprofile from '../../searchbar/userprofile.svelte';
import NoResults from '../../searchbar/userprofile.svelte';
import Textchannelprofile from './textchannelprofile.svelte'
import Postbuttonpopup from './textchannelprofile.svelte'
import Minimusicplayer from '../../musicplayer/minimusicplayer.svelte';
import Player from '../../Player/Player.svelte';


import userss from "$stores/users";
import { friend } from "$stores/friend";


let id = "dsad";




</script>

<nav class="chatchaneel">
    
      <div class="quickacess"> 

      <a class="channelprofile" href="http://"> 
        <div class="avatarpicture" role="img"> 
          <img src=../icon/homeicon.svg class="avatarpicturecircle" width="48px" hieght="48px" alt="d"> 
        </div>
        <div class="friendsusername">Home</div>
      </a>

      <a class="channelprofile" href="d"> 
        <div class="avatarpicture" role="img"> 
          <img src=../icon/musicicon.svg class="avatarpicturecircle" width="48px" hieght="48px" alt="d"> 
        </div>
        <div class="friendsusername">Message</div>
      </a>

      <a class="channelprofile" href="test/friends"> 
        <div class="avatarpicture" role="img"> 
          <img src=../icon/musicicon.svg class="avatarpicturecircle" width="48px" hieght="48px" alt="d"> 
        </div>
        <div class="friendsusername">Freinds</div>
      </a>

    <div>




<!--
      <button on:click={() => (showModal = true)}
      class="m-2 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-500 shadow-sm px-5 py-3 bg-purple-500 dark:bg-purple-400 text-base font-medium text-white hover:bg-purple-700  dark:hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-400 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm capitalize">
        create post
      </button>
      {#if showModal}
			<ModalOne on:close={() => (showModal = false)} />
		  {/if}
    </div>
 -->
      <hr>
      </div>
      <h6>Direct Message</h6>

      <!--<Textchannelprofile/>-->

			{#each $friend as friends}
      <a class="channelprofile" href="/channel/{friends.recipient.id}"> 
        <div class="avatarpicture" role="img"> 
          <img src="{friends.recipient.avatar}" class="avatarpicturecircle" width="45px" hieght="45px" alt="d"> 
        </div>
        <div class="friendsusername">{friends.recipient.username}</div>
      </a>
      {/each}
     




    <Minimusicplayer></Minimusicplayer>
    <!--<Player></Player>-->

    <div class="smallprofile">
      <img  class="smallprofileimage" src="{$userss.avatar}" width="60px" height="60px">
      <div>{$userss.username}</div>
      <div>#{$userss.tag}</div>
    </div>      


    </div>
  </nav>

<style>

#search-input-cont {
		width: 100%;
    height: 80%;
		display: flex;
		align-items: center;
		margin: 0 0 0 10px;
	}

	#search-field {
		width: 100%;
		font-size: 1.3rem;
		border: 1px solid gray;
		border-radius: 5px;
		padding: 8px;
		margin: 0 10px 0;
	}
	* {
		box-sizing: border-box;
	}
	
	#query-section {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 2% 0;
	}
	
	/* General Structure */


main#bookshelf{
	width: 100%;
	margin: 10px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: center; 
}

.chatchaneel {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  /* background-color: #2d3436; */
  /* background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%); */
  background-color: #1a1a1d;
  max-width: 225px;
  position: fixed;
  transform: translate(32%, 0%);
  height: 100%;
  width: 225px;
  overflow-x: hidden;
  float: left;
  left: 0%;
  top: 0%
}

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

.searchbar{
    position: relative;
    width: 200px;
    height: 28px;
    top: 20px;
    left: 10px;
    border-radius: 8px;
    top: 3px;
}

.minimusicplayer{
  position: fixed;
  width: 100%;
  height: 20%;
  left: 0px;
  bottom: 0px;
  background-color: #21c700;
}

.musiccardtext{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -40%;
  padding-left: 40%;
}

.smallprofile{
  background-color: #37393c;
  bottom: 0;
  margin: 0;
  padding: 0;
  display: flex;
  bottom: 0px;
  position: fixed;
  width: 100%;
  height: 6%;
}

.smallprofileimage {
  border-radius: 40px;
  cursor: pointer;
  position: relative;

}

</style>