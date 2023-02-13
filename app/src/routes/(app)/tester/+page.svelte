<script lang="ts">
    import { api } from 
    import { onMount } from "svelte";


    onMount(async () => {
    API = await import("$lib/utils/ApiAction");
  });


  async function handleDelete() {
    const res = await API.getAllPosts();

    console.log(res.json)
  }


  handleDelete()
</script>