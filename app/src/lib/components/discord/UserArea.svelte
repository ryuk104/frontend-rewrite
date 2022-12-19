<script lang="ts">
    import AvatarStack from "./common/AvatarStack.svelte";
    import ImageWrapper from "./common/ImageWrapper.svelte";
    import QuickButtons from "./common/QuickButtons.svelte";
    import NameTag from "./common/user/NameTag.svelte";


</script>

<div class="container">
    <div class="avatarWrapper"
        aria-controls="popout_19"
        aria-expanded="false"
        aria-label="Set Status"
        role="button" tabindex="0"
    >
        <ImageWrapper avatar="true" label="UserName, status">
            <AvatarStack />
        </ImageWrapper>
    </div>
    <NameTag />

    <div class="flex horizontal directionRow justifyStart alignStretch noWrap">
        <QuickButtons />
    </div>

</div>

<style>
    .container, .container .avatar {
        -ms-flex-negative: 0;
        flex-shrink: 0;
    }
    .container {
        height: 52px;
        font-size: 14px;
        font-weight: 500;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 8px;
        margin-bottom: 1px;
    }

    .avatarWrapper {
        margin-right: 8px;
    }
</style>