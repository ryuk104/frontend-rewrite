
<script>
  /*
    export async function load({session}) {
        if(!session.authenticated) {
            return {
                status: 401,
                body: "Unauthorized"
            }
        }
        return {
            props: {
                email: session.email,
                password: session.password
            }
        }
    }

    export let email
    let  username

/*    onMount(async () => {
        const res = await fetch('/user')
        const user = await res.json()
        username = user.username
    })
*/
import { goto } from '$app/navigation';
/*
import type { PageData } from './$types';

	export let data: PageData;

	async function onGettingStartedClicked() {
		data.isAdminUserExist ? await goto('/auth/login') : await goto('/auth/register');
	}

*/
</script>

<svelte:head>
    <title>UNIVERSE</title>
</svelte:head>


<header>
    <div class="logo">Uninet</div>
        <nav>
            <ul class="nav_links">
              <li><a href="/home">Home</a></li>
                <li><a href="/support">support</a></li>
                <li><a href="/music/home">Music</a></li>
                <li><a href="/safety">safety</a></li>
                <li><a href="/download">Download</a></li>
                <li><a class="login-btn" href="/login">Sign In</a></li>
                <li><a class="signup-btn" href="/signup">Sign Up</a></li>
            </ul>
        </nav>
</header>
<hr>    


<div>
  <h2>Download uninet</h2>
  <p>where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
  <a href="//ryukshome.xyz/api/download" class="button-ZGMevK buttonWhite-1M-wED buttonLarge-3z9xOS marginTop24-3ZXBpg marginRight24-2hC304">Download uninet</a>
</div>



<div>
  <h2>Create an invite-only place where you belong</h2>
  <p>servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.</p>
</div>

<div>
  <h2>Where hanging out is easy</h2>
  <p>Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.</p>
</div>

<div>
  <h2>From few to a fandom</h2>
  <p>Get any community running with moderation tools and custom member access. Give members special powers, set up private channels, and more.</p>
</div>

<div>
  <h2>RELIABLE TECH FOR STAYING CLOSE</h2>
  <p>Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.</p>
</div>






<footer class="footer-box" >
    <div class="footer-infobox">
        <h4>Uninet</h4>
    </div>
    <div class="footer-info">
        <div class="footer-first-row">
            <a href=" ">Download</a>
            <a href=" ">Inspiration</a>
         </div>

         <div class="footer-second-row">
            <a href=" ">About</a>
            <a href=" ">Company</a>
            <a href=" ">Licenses</a>
         </div>

         <div class="footer-thrid-row">
            <a href="/help">Help</a>
            <a href="/support">Support</a>
            <a href="/safty">Safety</a>
            <a href="/security">Security</a>
            <a href="/privacy">Privacy</a>
            <a href="/guildlines">Guidelines</a>
            <a href="/terms">Terms</a>
         </div>

        <div class="footer-fourth-row">
            <a href="/community">Community</a>
        </div>
   </div>
</footer>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
  
}

.body{
  background-color: #272727;
}

li, a, button {
  font-family: "montserrat", sans-serif;
  font-weight: 500;
  font-size: 20px;
  color: #edf0f1;
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 10px;
  padding: 25px 5%;
  width: 100%;
}
.signup-btn{
  padding: 0px 15px;
  border-radius: 20px;
  background-color: lightslategray;
  font-size: 30px;
  color: #272727;
}
.login-btn{
  padding: 0px 15px;
  right: auto;
  border: blue;
  border-radius: 20px;
  background-color: lightslategray;
  font-size: 30px;
  color: #272727;
  border-spacing: 50px;
}
.logo {
  left: auto;
  font-size: 30px;
  font-family:sans-serif ;
  cursor: pointer;
  order:0;
}


.nav_links {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-indent: 20px;
  list-style-type: none;


}

.footer-box { 
text-align:center;
display:block ;
background-color:#18191A;
overflow: hidden;
position: absolute;
top: 250%;
width: 99%;
}

.footer-infobox {
  float: left;
  width: 400px;
  font-size:40px;
}

.footer-first-row {
  float: left;
  padding: 20px;
  width: 150px;
  font-size:40px;
}

.footer-second-row {
  float: left;
  padding: 20px;
  width: 150px;
  font-size:40px;
  margin:0 40px;
}

.footer-thrid-row {
  float: left;
  padding: 20px;
  width: 150px;
  font-size:40px;
  margin:0 40px;
}

.footer-fourth-row {
  float: left;
  padding: 20px;
  width: 150px;
  font-size:40px;
  margin:0 40px;
}

</style>