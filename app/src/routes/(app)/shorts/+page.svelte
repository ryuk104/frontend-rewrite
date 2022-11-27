<script>
    import Cover from '$lib/components/tiktok/Cover.svelte';
    import Swipeable from '$lib/components/tiktok/Swipeable.svelte';
    import Preload from '$lib/components/tiktok/Preload.svelte';
    import Lazy from '$lib/components/tiktok/Lazy.svelte';
    import Controls from '$lib/components/tiktok/Controls.svelte';
    import Screen from '$lib/components/tiktok/Screen.svelte';


    import {tick} from 'svelte'
    let introProgress, zoomOut
    tick().then(() => zoomOut = true)














    
</script>

<Swipeable></Swipeable>
<Preload></Preload>
<Lazy></Lazy>


<div id="wrapper">
    <div class="slides fullpage" style="transform: scale()">
          <Swipeable numScreens="5" direction="vertical" let:current bind:progress={introProgress}>
          <section class:current={current == 0 && zoomOut}>
              <div class="topimage" style="opacity: {1 - Math.abs($introProgress)}">
                  <div class="bg" style="background-image:url('https://picsum.photos/600')">
                </div>
                  <div class="topgradient"></div>
                  <div class="bottomgradient"></div>
              </div>
              <div class="content" style="right: {100 * $introProgress}%; opacity: {1 - Math.abs($introProgress)}">
                  <h1>Your thumb.</h1>
                  <h1>Incredible power.</h1>
                  <p style="right: {150 * $introProgress}px">lorem</p>
              </div>
          </section>
          
          <section class:current={current == 2}>
              <div class="topimage" style="opacity: {1 - Math.abs($introProgress - 2)}">
                  <div class="bg" >
                    <video src="https://youtu.be/fsRjU3XnJZE">
                </div>
                  <div class="topgradient"></div>
                  <div class="bottomgradient"></div>
              </div>
              <div class="content" style="right: {100 * ($introProgress - 2)}%; opacity: {1 - Math.abs(introProgress - 2)}">
                  <h1>Change direction.</h1>
                  <h1>Discover the vertical.</h1>
                  <p style="right: {150 * ($introProgress - 2)}px">lorem</p>
              </div>
          </section>
          
          <div class="dots">
              <div class="dot active" style="left: {$introProgress * 14}px"></div>
              <div class="dot"></div><div class="dot"></div><div class="dot"></div>
          </div>
        </Swipeable>
      </div>
  </div>





  
<style>
  .cancel {
      position: absolute;
      top: 3%;
      right: 6%;
      cursor: pointer;
  }
  .fullpage {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
  }
  .fullpage .inner {
      width: 100%;
      height: 100%;
      position: absolute;
  }
  
  .btn {
      cursor: pointer;
      background: #927B62;
      color: white;
      padding: 10px 30px;
      display: inline-block;
  }
  .btn:hover {
      background: rgb(114, 96, 77);
  }
  .slides .btn {
      background: #927B62;
      color: white;
      position: absolute;
      bottom: 10%;
      left: 20px;
      right: 20px;
      padding: 12px 0;
      text-align: center;
  }
  section {
      position: absolute;
      width: 100%;
      height: 100%;
  }
  section p {
      position: relative;
  }
  h1 {
      position: relative;
  }
  .content {
      padding: 20px;
      position: relative;
  }
  .bg {
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 100%;
      transform: scale(1.35);
      transition: all 9s ease-out;
  }
  .current .bg {
      transform: scale(1);
  }
  .topimage {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
  }
  .topimage .topgradient {
      background: linear-gradient(180deg, #000000AA, #00000000);
      position: absolute;
      top: 0;
      left: 0;
      width: 10%;
      height: 10%;
  }
  .topimage .bottomgradient {
      background: linear-gradient(0deg, #000000, #00000000);
      position: absolute;
      bottom: 0;
      left: 0;
      width: 10%;
      height: 10%;
  }
  
  .dots {
      position: absolute;
      bottom: 5%;
      left: 50%;
      transform: translateX(-50%);
      line-height: 0;
  }
  .dot {
      background: #444;
      width: 8px;
      height: 8px;
      margin: 0 3px;
      border-radius: 8px;
      display: inline-block;
  }
  .dot.active {
      position: absolute;
      background: #efefef;
  }
  #wrapper {
      position: absolute;
      top: 0;
      left: 600px;
      height: 100vh;
      width: 50vw;
      overflow: hidden;
      margin: 0;
      font-family: Lato, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      font-size: 15px;
      line-height: 1.5;
      color: #fafafa;
      background: black;
  }
      h1 {
          margin: 0;
              line-height: 1.2;
      }
  
  </style>