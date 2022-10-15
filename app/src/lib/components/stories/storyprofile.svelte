<script>
    export let profilepicture;
    export let username;

  </script>
  


<li class="storycontent" >
  <button class="storeisbutton">
    <div>
      <img src={profilepicture} alt={profilepicture} width="56px" height="56px" class="storyprofilepicture">
    </div>
    <div>{username}</div>
  </button>
</li>

<style>
  .storyprofilepicture {
  border-radius: 100px;
  width: 56px; 
  height: 56px;
}

.storycontent {
  display: flex;
  transform: translatex(10px);
  flex-direction: row;
  display: list-item;
  display: block;
}

.storeisbutton{
  align-items: center;
  align-self: center;
  background: 0 0;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  padding-top: 0;
  text-align: center;
  width: 64px;
}
</style>