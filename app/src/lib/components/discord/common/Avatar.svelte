<script lang="ts">
import AvatarIcon from "./AvatarIcon.svelte";

    export let name: String | undefined = undefined;
    export let subText: String | undefined = undefined;

    export let icon = true;
</script>

<div class="layout">
    <div class="avatar">
        {#if icon}
            <AvatarIcon />
        {/if}
    </div>
    <div class="content">

        <div class="nameAndDecorators">
            <div class="name">
                <div class="overflow">{name ?? ""}</div>
            </div>
        </div>

        {#if subText !== undefined}
            <div class="subText">
                <div class="subtext">{subText}</div>
            </div>
        {/if}
    </div>
</div>

<style>
    .avatar, .layout {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .layout {
        border-radius: 4px;
        height: 42px;
        padding: 0 8px;
    }

    .content, .name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .content {
        min-width: 0;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
    }

    .nameAndDecorators {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .subText {
        margin-top: -2px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .subtext {
        font-size: 12px;
        line-height: 16px;
        font-weight: 500;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .overflow {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        position: relative;
    }

    .avatar {
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        width: 32px;
        height: 32px;
        margin-right: 12px;
    }
</style>