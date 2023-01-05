<script>
    import * as api from '$lib/utils/ApiAction';

    const user = "dsdsa"

    async function getUser() {
    try {
      const res = await api.getUser(user);

    } catch (error) {
      console.log(error);
    }
  }

  getUser()
</script>

<h1>HIII</h1>
<!-- <Button fab icon class="pink-text" on:click={() => handleDislike()}>-->
