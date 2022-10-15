<script lang="ts">

  import { createEventDispatcher, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

  let modal;

  const handle_keydown = (e) => {
		if (e.key === 'Escape') {
			close();
			return;
		}
		if (e.key === 'Tab') {
			// trap focus
			const nodes = modal.querySelectorAll('*');
			const tabbable: any = Array.from(nodes).filter((n: any) => n.tabIndex >= 0);
			let index = tabbable.indexOf(document.activeElement);
			if (index === -1 && e.shiftKey) index = 0;
			index += tabbable.length + (e.shiftKey ? -1 : 1);
			index %= tabbable.length;
			tabbable[index].focus();
			e.preventDefault();
		}
	};
	const previously_focused: any = typeof document !== 'undefined' && document.activeElement;
	if (previously_focused) {
		onDestroy(() => {
			previously_focused.focus();
		});
	}
    
  const username = "ryuk"
  let showNavbutton = false;

  
</script>
  
  
  
  <button class="Topnavbutton" type="button" on:click={close}>

      <img class="profileimage" src="/image/image5.jpeg" width="28px" height="28px" alt="d">
      <span class="dropdownusername" name="dropdownusername" id="dropdownusername">{username}</span>
      
      <svg role="img" height="16" width="16" class="Svg-ulyrgf-0 dIsYZz triangledropdown" viewBox="0 0 16 16"><path d="M13 10L8 4.206 3 10z"></path></svg>
  
  <div class="profiledropdown"  >
          <ul class="menu-bar">
  <li><a href="/login">
              <div class="icon">
                <span class="fas fa-home"></span></div>
  Home </a></li>
  
  <li><a href="../profile/profile.html">
    <div class="icon">
      <span class="fas fa-user"></span></div>
  Profile </a></li>
  
  <li class="setting-item"><a href="/login">
              <div class="icon">
                <span class="fas fa-cog"></span></div>
  Settings<i class="fas fa-angle-right"></i>
            </a></li>
  <li class="help-item" on:click|preventDefault={"helpitem"} ><a href="/login">
              <div class="icon">
                <span class="fas fa-question-circle"></span></div>
  Help & support <i class="fas fa-angle-right"></i>
            </a></li>
  
  <li><a href="/login" method="POST" action="/logout">
              <div class="icon">
                <span class="fas fa-comment-alt"></span></div>
  Logout </a></li>
  </ul>
  
          
  
  <ul class="help-drop">
  <li class="arrow back-help-btn" on:click|preventDefault={helpbutton}><span class="fas fa-arrow-left"></span>Help & support</li>
  <li><a href="/login">
              <div class="icon">
                <span class="fas fa-question-circle"></span></div>
  Help centrer </a></li>
  <li><a href="/login">
              <div class="icon">
                <span class="fas fa-envelope"></span></div>
  Support Inbox </a></li>
  <li><a href="/login">
              <div class="icon">
                <span class="fas fa-comment-alt"></span></div>
  Send feedback </a></li>
  <li><a href="/login">
              <div class="icon">
                <span class="fas fa-exclamation-circle"></span></div>
  Report problem </a></li>
  </ul>
  
  </div>
  </button>
  
  <style>
    .Topnavbutton{
    background-color: rgba(0,0,0,.7);
    border-radius: 23px;
    height: 42px;
    min-width: 20px;
    position: fixed;
    border: 0;
    cursor: pointer;
    color: #fff;
    float: right;
    display: flex;
    align-items: center;
    top: 30px;
    right: 40px;
    z-index: 1;

  }
  
  .dropdownusername {
    padding-left: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 110px;
    pointer-events: none;
    line-height: 28px;
    margin-inline-start: 8px;
    text-align: center;
    top: 100px;
  }
  .triangledropdown{
    color: white;
  }
  
  
  
  .profiledropdown{
    position: absolute;
    top: 65px;
    width: 250px;
    overflow: hidden;
    border-radius: 5px;
    background: #242526;
    display: none;
    transition: all 0.3s ease;
  }
  
  .profiledropdown ul{
    width: 400px;
    list-style: none;
    padding: 10px;
    transition: all 0.3s ease;
  }
  .profiledropdown ul li{
    line-height: 55px;
  }
  .profiledropdown ul li a{
    position: relative;
    color: #b0b3b8;
    font-size: 18px;
    font-weight: 500;
    padding: 0 10px;
    display: flex;
    border-radius: 8px;
    align-items: center;
    text-decoration: none;
  }
  .profiledropdown ul li:hover a{
    background: #3A3B3C;
  }
  ul li a .icon{
    height: 40px;
    width: 40px;
    margin-right: 13px;
    background: #ffffff1a;
    display: flex;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
  }
  ul li a .icon span{
    line-height: 40px;
    font-size: 20px;
    color: #b0b3b8;
  }
  ul li a i{
    position: absolute;
    right: 10px;
    font-size: 25px;
    pointer-events: none;
  }
  
  .profiledropdown ul.help-drop{
    display: none;
  }
  .profiledropdown .arrow{
    padding-left: 10px;
    font-size: 20px;
    font-weight: 500;
    color: #b0b3b8;
    cursor: pointer;
  }
  .profiledropdown .arrow span{
    margin-right: 15px;
  }
  </style>