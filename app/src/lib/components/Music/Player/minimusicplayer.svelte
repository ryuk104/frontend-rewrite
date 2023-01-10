<script>
	//import { isPlay, title } from '../stores/song';
  import Icon from "../Icon/Icon.svelte";


	export let song;
	let icon = 'play';
  export let canPlay;
	export let prevBtn;
	export let nextBtn;
	export let isPaused;
	export let pause;
	export let loading;
	export let isQueue = false;
	export let sizes = { main: "2em", skip: "1.5em" };
  import { browser } from "$app/environment";
	import { goto } from "$app/navigation";
	import { clickOutside } from "$lib/actions/clickOutside";
	import { IMAGE_NOT_FOUND } from "$lib/constants";
	import { IDBService } from "$lib/workers/db/service";
	import { AudioPlayer } from "$lib/player";
	import { groupSession, isMobileMQ } from "$lib/stores";
	import list, { currentTrack, queue, queuePosition } from "$lib/stores/list";
	import { IsoBase64 } from "$lib/utils";
	import { messenger } from "$lib/utils/sync";
	import { notify } from "$lib/utils";
	import { playerLoading, showAddToPlaylistPopper, showGroupSessionCreator } from "$stores/stores";
	import { PopperButton } from "../../Popper";
	import { fullscreenStore } from "./channel";
	import Controls from "./Controls.svelte";
	import keyboardHandler from "./keyboardHandler";
	import ProgressBar from "./ProgressBar";

	import { page } from "$app/stores";
	import { SITE_ORIGIN_URL } from "$stores/url";

/*
	$: if ($isPlay && song.title == $title) {
		icon = 'pause';
	} else {
		icon = 'play';
	}
*/
  let title = 'Reve de toi'
  let artist = '徒 setto セット'
  
</script>

<!-- 
<div class="card">
	<div class="card__info">
		<img src="/img/{song.album.cover}" alt={song.album.name} />
	</div>
	<button type="button" on:click>
		<i class="fas fa-fw fa-{icon}" />
	</button>
</div>
-->

<div class="minimusicplayer"> 
    <div class="musiccard">

      <div class="musiccardimage">
        <img src="{$currentTrack?.thumbnails?.[0]?.url ?? IMAGE_NOT_FOUND}" class="musiccardimage" width="40%" hieght="40%" alt="d">
      </div>

      <div class="musiccardtext">
        <div class="musiccardtexttitle">
          <a href="artist"> 
            <h4>{$currentTrack?.title}</h4>
          </a>
        </div>

        <div class="musiccardtextartist">
          <a href="artist">
            <h6> {artist} </h6>
          </a>
        </div>
      </div>
    </div>

    <div class="trackcontroll">
      <div class="trackbutton" title="Prevous track" type="button">
        <Icon fill={isQueue ? "#FFF" : "none"} color="white" name="play" size={sizes.main} />
      </div>
      <div class="trackbutton" title="play"></div>
      <div class="trackbutton" title="Next track"> </div>
    </div>

    <!-- 
    <div class="trackoption">
      <button title="volume"> </button>
      <button title="repeat"> </button>
      <button title="shuffle"> </button>
    </div>
-->
    <div class="tracktimeline">
      <ProgressBar />

    </div>



  </div>


  <style>
    .minimusicplayer{
      margin: 0;
      padding: 0;
      display: flex;
      bottom: 75px;
      background-color: rgb(46, 44, 46);
      position: fixed;
      max-width: 100%;
      width: 100%;
      height: 20%;

    }

    .musiccard{
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      top: 0%;
      position: relative;
      width: 100%;
      height: 5%;
    }

    .trackcontroll{
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      bottom: 75px;
      position: fixed;
      width: 100%;
      height: 4%;
      background-color:rgb(72, 66, 66)(38, 32, 32);
    }

    .trackbutton{
      justify-content: center;
		  gap: 1em;
      display: flex;
      flex-direction: row;
    }

    .tracktimeline {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      bottom: 125px;
      position: fixed;
      width: 100%;
      height: 1%;    
      background-color:rgb(60, 59, 59);

    }
  </style>