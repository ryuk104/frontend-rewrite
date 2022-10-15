<script>
  export let serverimage;

  export let left = 0;
	export let top = 0;
	let moving = false; 
	
	function start() {
		moving = true;
	}
	
	function stop() {
		moving = false;
	}
	
	function move(e) {
			if (moving) {
				left += e.movementX;
				top += e.movementY;
			}
	}
	
	//$: console.log(moving)
</script>

<svelte:window on:mouseup={stop} on:mousemove={move}  />



<section class="Serverprofile" on:mousedown={start} style="left: {left}px; top: {top}px;">
	<div class="servers">
        <div>
            <div draggable="true" class="serverpicturebutton">
                <img src={serverimage} alt={serverimage} width="48px" hieght="48px">
            </div>
            <div draggable="true" class="serverpicturebutton">
          </div>
        </div>
    </div>
</section>


<style>
	
.serverpicture{
  margin: 0 0 8px;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 100%;
  text-align:center;
  grid-row-gap: 80px;
  margin-bottom: 15px;
}

.serverpicturebutton{
cursor: pointer;
user-select: none;
position: absolute;
border: solid 1px gray;
cursor: move;
}

.serverlist {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.settingbutton {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 780%;
}
	
</style>