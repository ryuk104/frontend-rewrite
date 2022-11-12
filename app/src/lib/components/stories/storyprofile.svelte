<script>

import { story as storystate } from "$lib/stores/stories.js";

export let storys;


</script>
  


<li class="storycontent" >
  <button class="storeisbutton">
    <div>
      <img src={storys.image} alt={storys.image} width="56px" height="56px" class="storyprofilepicture">
    </div>
    <div>{storys.title}</div>
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
  padding-left: 5%;
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