<script>
  import Shimmer from "$lib/components/skeleton/Shimmer.svelte";

  let users = [1, 1, 1, 1, 1];
</script>

<ul class="skeleton">
  {#each users as user}
    <div class="block">
      <div class="imgbx loading-animation">
        <img src="" alt="" class="cover" />
      </div>
      <div class="details">
        <div class="listHead">
          <h4 class="title loading-animation">Stephen Lai</h4>
          <p class="time loading-animation">10:56</p>
        </div>
        <div class="message_p">
          <p class="loading-animation">How to make Whatsapp clone using html and css</p>
          <!-- <b>1</b> -->
        </div>
      </div>
    </div>
  {/each}
</ul>

<style>
  :root {
    --bg-color: #d6d8dc;
  }

  .skeleton {
		height: 100vh;
    overflow: hidden;
  }

	.skeleton .block {
		display: flex;
    padding: 15px;
    position: relative;
    overflow: hidden;
  }

	.skeleton .block .details {
		width: 100%;
	}

	.skeleton .imgbx {
    /* background: var(--bg-color); */
		color: transparent;
  }

  .skeleton .block .details .listHead .title,
  .skeleton .block .details .listHead .time,
  .skeleton .block .details .message_p p {
    /* background: var(--bg-color); */
		color: transparent;
    border-radius: 2px;
  }

  .skeleton .block .details .listHead {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
  }

	.skeleton .block .details .listHead .time {
		height: 16px;
  }  
	
	.skeleton .block .details .listHead .title {
		height: 18px;
    max-width: 200px;
    margin-bottom: 5px;
  }
	
	.skeleton .block .details .listHead .message_p p {
    height: 18px;
		width: 100%;
  }

  .title,
  .message_p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .imgbx {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 10px;
  }

  @media (max-width: 800px) {
		.skeleton .block {
			width: 100%;
		}
	}
</style>
