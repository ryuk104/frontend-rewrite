<script>
	import { scale } from 'svelte/transition';
	import { expoInOut } from 'svelte/easing';
	export let username;
    export let profilepicture;
	export let desc;
</script>


<section class="Userprofile"
	transition:scale={{duration: 650, easing: expoInOut}}>
	<section class="book-top-info">
		<figure class="bkcont">
			<img src={profilepicture} alt={profilepicture} class="bkcover">
			<div class="desc">({desc})</div>
			<figcaption>{username}</figcaption>
		</figure>
	</section> 
</section>


<style>
	.Userprofile { 
			width: 280px;
			border: 4px solid #BA5626; 
			border-radius: 3px;
			background-color: #e4ddcf;
			height: 100px;
		}

		.book-top-info {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: flex-start;
		}

		/* Book Layout */
		.bkcont {
			width: 100%;
			text-align: center;
		}

		.bkcover {
			width: 50px;
			height: 50px;
			border-radius:10px;
			float: left;
		}
	
		figcaption {
			text-align: center;
			width: 90%;
			height: 316px;
			font-weight: bold;
		}
	.desc{
		text-align: center;
		width: 90%;
		height: 36px;
		font-weight: bold;
		float: left;
		position: relative;
  		padding-bottom:10px;
	}
</style>