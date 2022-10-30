<script>
	//import { isPlay, title } from '../stores/song';

	export let song;
	let icon = 'play';
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
        <img src="https://audio.liberta.vip/media/__sized__/attachments/a8/14/72/cover-crop-c0-5__0-5-200x200-95.jpg" class="musiccardimage" width="40%" hieght="40%" alt="d">
      </div>

      <div class="musiccardtext">
        <div class="musiccardtexttitle">
          <a href="artist"> 
            <h1>{title}</h1>
          </a>
        </div>

        <div class="musiccardtextartist">
          <a href="artist">
            <h4> {artist} </h4>
          </a>
        </div>
      </div>
    </div>

    <div class="trackcontroll">
      <button title="Prevous track"> </button>
      <button title="play"> </button>
      <button title="Next track"> </button>
    </div>

    <div class="trackoption">
      <button title="volume"> </button>
      <button title="repeat"> </button>
      <button title="shuffle"> </button>
    </div>

    <div class="tracktimeline">
      <div data-percents="100" style="width:100%"></div>
      <div data-percents="100" style="width:100%"></div>
    </div>



  </div>


  <style>
    .minimusicplayer{
      margin: 0;
      padding: 0;
      display: flex;
      bottom: 0px;
      background-color: purple;
      position: fixed;

    }
  </style>