<script>
    import { goto } from "$app/navigation";
  
    import { auth } from "$lib/stores/auth";
    import { snackbar } from "$lib/stores/ui";
    import { mdiDelete } from "@mdi/js";
    import { onMount } from "svelte";
  
    import {
      Button,
      Card,
      CardActions,
      CardText,
      CardTitle,
      Dialog,
      Icon,
    } from "svelte-materialify";
    let active = false;
  
    let API;
    onMount(async () => {
      API = await import("$lib/utils/ApiAction");
    });
  
    async function handleDelete() {
      const res = await API.deleteUser($auth.user._id);
  
      snackbar.showSnackbar({ open: true, type: res.type, msg: res.message });
      if (res.type === "success") {
        localStorage.removeItem("token");
        goto("/");
      }
      try {
      } catch (error) {
        console.log(error);
      }
    }
  </script>
  
  <div class="text-center">
    <Button
      on:click={() => (active = true)}
      rounded
      class="red-text ml-4"
      fab
      icon
    >
      <Icon path={mdiDelete} />
    </Button>
  </div>
  
  <Dialog persistent bind:active>
    <Card>
      <CardTitle>Are you sure want to Delete Account ?</CardTitle>
      <CardText>
        After deleting account you are not able to get back yor data like
        followers and posts
      </CardText>
      <CardActions>
        <Button on:click={() => (active = false)} text>No</Button>
        <Button on:click={() => handleDelete()} text class="red-text"
          >Delete</Button
        >
      </CardActions>
    </Card>
  </Dialog>
  