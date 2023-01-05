<script>
  import Shimmer from "$lib/components/skeleton/Shimmer.svelte";
</script>

<ul class="skeleton">
    <div class="block">
      <div class="imgbx">
        <img src="" alt="" class="cover" />
      </div>
      <div class="details">
        <div class="listHead">
          <h4 class="title">Stephen Lai</h4>
        </div>
      </div>
      <Shimmer />
    </div>
</ul>

<style>
  .skeleton {
		height: 100px;
  }

	.skeleton .block {
		display: flex;
    padding: 15px;
    background: var(--skeleton-bg-color);
    position: relative;
		/* border: 1px solid red; */
  }

	.skeleton .block .details {
		width: 100%;
		/* border: 1px solid green; */
	}

	.skeleton .imgbx,
  .skeleton .block .details .listHead .title {
    background: #d6d8dc;
		color: transparent;
  }

  .skeleton .block .details .listHead {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
  }

	.skeleton .block .details .listHead .time {
		height: 18px;
  }  
	
	.skeleton .block .details .listHead .title {
		height: 22px;
    max-width: 200px;
  }
	
	.skeleton .block .details .listHead .message_p p {
    height: 18px;
    /* max-width: 200px; */
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
