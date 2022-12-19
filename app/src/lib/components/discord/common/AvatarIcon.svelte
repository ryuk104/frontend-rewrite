<script lang="ts">
    export let width: number = 32;
    export let height: number = width;

    //export let src = "/assets/e2779af34b8d9126b77420e5f09213ce.png";
</script>

<div class="wrapper" role="img" aria-hidden="true" style="width: {width}px; height: {height}px;">
    <svg width="40" height="32" viewBox="0 0 40 32" class="mask svg" aria-hidden="true">
        <foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-default)">
            <div class="avatarStack">
                <img src="" alt=" " class="avatar" aria-hidden="true">
            </div>
        </foreignObject>
    </svg>
</div>

<style>
    .wrapper {
        position: relative;
        border-radius: 50%;
    }

    .status, .svg {
        position: absolute;
    }
    .mask {
        pointer-events: none;
        position: relative;
        display: block;
        height: 100%;
        width: auto;
    }

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

    .avatar:before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-color: var(--background-modifier-accent);
    }
</style>