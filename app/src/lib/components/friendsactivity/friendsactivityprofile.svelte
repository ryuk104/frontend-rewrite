<script>
    export let username;
    export let profilepicture;

</script>

<section class="friendsactivity"> 
    <li class="friendactivivty">
        <img class="firendactvitypfp" src={profilepicture} height="48px" width="48px" alt="gram">
        <h1>{username}</h1>
    </li>

</section>


<style>
.friendactivivty{
  align-items: center;
  align-self: center;
  background: 0 0;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding-bottom: 0;
  padding-top: 0;
  text-align: center;
  width: 64px;
}
	
</style>