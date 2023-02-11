<script>
    import { getAllPosts } from "$lib/utils/ApiAction";
    import { onMount } from "svelte";


    


  async function test() {
    const res = fetch("http://localhost:4000/");

    console.log(res)
  }


  test()
</script>