<script>
    export let username;
    export let image;
    export let desc;
    export let comments;
    export let likes;
    export let profilepicture;

</script>

<section class="Postsprofile"> 
    <article > 
        <div class="userprofile">
            <img src={profilepicture} alt={profilepicture} wdith="40px" height="40px" class="profilepicture"> 
            <div class="username">{username}</div>
        </div>
        <img class="instapics" src="{image}" wdith="400" height="400" alt="pic">
        <div class="bottom"> 
            <div class="desc">{desc}</div>
            <div class="comments">{comments}</div>
            <button class="like">{likes}</button>
        </div>
    </article>
</section>


<style>
.profilepicture{
width: 40px;
height: 40px;
border-radius: 50%;
position: relative;
margin-left: 10%;
margin-top: 10px;

}

.bottom{
    display: flex;
    margin-top: 10px;
}

.userprofile{
    display: flex;
    background-color: rgba(43, 158, 43);
}

.instapics {
  background: #fff;
  border: 1px solid #dbdbdb;
  padding: 16px 0;
  outline: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: row;
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: 400px;
  height: 400px;
  margin-left: auto;
  margin-right: auto;
}

.Postsprofile{
    background: rgb(42, 97, 85);
    width: 500px;
    height: 600px;
    
}

.username{
    color: #fff;
    font-size: 20px;
    position: relative;
    margin-right: 200px;
}
	
</style>