<script>
  import Postsprofile from './postsprofile.svelte'
  
  import { postsData, username } from '../../../testdb/posts.js';


  function toggleLike(i) {
    let newPosts = $postsData;
    newPosts[i].liked = !newPosts[i].liked;
    posts.set(newPosts);
  }

  function leaveComment(i) {
    let newPosts = $postsData;
    newPosts[i].comments.push({
      username: $username,
      content: commentText[i]
    });
    commentText[i] = "";
    posts.set(newPosts);
  }

  let commentText = [];
  

</script>

<div class="instagramg">
  {#if $postsData.length > 0}
    {#each $postsData as post, i}
      <div class="post">
        <img class="avatar" src={post.profilepicture} alt={post.username} width="50"/>
        <span class="username">{post.username}</span>
        <img class="post-img" src={post.image} alt={postsData.image} />
        <div class="post-buttons">
          <span class="like" on:click={() => toggleLike(i)}>
            {#if postsData.liked}
              <img src="dsjkaldas">
            {:else}
              <img src="djsjadjias">
            {/if}
          </span>
        </div>
        {#if postsData.description > 0}
          <p class="description">
            <strong>{postsData.username}</strong>
            {@html postsData.description}
          </p>
        {/if}
        <div class="comments">
          {#if post.comments.length > 0}
            {#each post.comments as comment}
              <p class="comment">
                <strong>{comment.username}</strong>
                {comment.content}
              </p>
            {/each}
          {:else}
            <p>No comments</p>
          {/if}
        </div>
        <input
          type="text"
          bind:value={commentText[i]}
          class="comment-box"
          placeholder="Leave a comment" />
        <button class="post-comment-button" on:click={() => leaveComment(i)}>
          Post
        </button>
      </div>
    {/each}
  {:else}
    <p>No posts</p>
  {/if}
</div>


<!--

<div class="instagramg" id="instagramg">
  {#each postsData as {image, profilepicture, username, comments, desc}}          
    <Postsprofile {image} {profilepicture} {username} {desc} {comments}/>
  {/each}

    
</div>
 -->

 <style>

.instagramg {
  text-align:center;
  z-index: -1;
  background-color: rgb(73, 19, 19);
  width: 40%;
  height: 100%;
  top: 2%;
  margin: auto;
  }
  .avatar-container {
    position: relative;
    display: inline-block;
  }

  .avatar {
    display: inline-block;
    vertical-align: middle;
    height: var(--border-radius);
    width: var(--border-radius);
    object-fit: cover;
    border-radius: var(--border-radius);
  }

  .edit-avatar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: white;
    background-color: black;
    border-radius: var(--border-radius);
    opacity: 0;
    transition: opacity 0.1s;
    user-select: none;
    cursor: pointer;
  }

  .avatar-container:hover .edit-avatar {
    opacity: 1;
  }

  h1 {
    display: inline;
    font-weight: normal;
    font-size: 22px;
  }

  #edit-username {
    opacity: 0;
    transition: opacity 0.1s;
  }

  h1:hover #edit-username {
    opacity: 1;
    cursor: pointer;
  }

  button {
    background-color: #98ff98;
  }

  #new-post-button {
    display: block;
    width: 100%;
    margin: 1em 0 0 0;
    cursor: pointer;
  }

  #new-post-form {
    margin-top: 8px;
  }

  #new-post-form * {
    min-width: 100%;
    max-width: 100%;
  }



  


</style>

