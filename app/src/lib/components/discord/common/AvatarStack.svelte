<script lang="ts">

</script>

<div class="avatarStack">
    <img src="https://cdn.discordapp.com/embed/avatars/3.png" alt=" " class="avatar" aria-hidden="true">
</div>

<style>
    .avatarStack {
        display: grid;
        width: 100%;
        height: 100%;
    }

    .avatar {
        display: block;
        -o-object-fit: cover;
        object-fit: cover;
        pointer-events: none;
    }

    .avatar, .avatarSpeaking {
        width: 100%;
        height: 100%;
        grid-area: 1/1;
    }
</style>