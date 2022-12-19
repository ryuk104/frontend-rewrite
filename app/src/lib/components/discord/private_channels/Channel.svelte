<script lang="ts">
    import Avatar from "../common/Avatar.svelte";

    export let channel = {
        name: undefined,
        description: undefined,
    };

    export let discardable: boolean = false;

</script>


<li class="channel container">
    <div 
        class:linkButton={!discardable}
        class="interactive"
    >
        <a class="link"
        data-list-item-id="private-channels-uid_17___friends"
        tabindex="-1"
        href="/channels/@me"
        >
            <Avatar name={channel.name} subText={channel.description}/>
        </a>
        {#if discardable}
            <div class="closeButton" aria-label="Close DM" role="button" tabindex="0">
                <svg class="closeIcon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path>
                </svg>
            </div>
        {/if}
    </div>
</li>

<style>
    .channel {
        position: relative;
        max-width: 224px;
        margin-left: 8px;
    }
    .container {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        display: block;
        padding: 1px 0;
        border-radius: 4px;
        -webkit-transition: none;
        transition: none;
    }

    .linkButton {
        padding-right: 8px;
    }

    .interactive {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        color: var(--channels-default);
    }

    .selected {
        color: var(--interactive-active);
        background-color: var(--background-modifier-selected);
    }

    .interactive {
        cursor: pointer;
        color: var(--interactive-normal);
        border-radius: inherit;
    }

    .interactive:focus-within, .interactive:hover {
        color: var(--interactive-hover);
        background-color: var(--background-modifier-hover);
    }

    .link {
        min-width: 0;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: inherit;
    }

    .interactiveSelected {
        color: var(--interactive-active);
    }

    .closeButton {
        display: none;
        width: 16px;
        height: 16px;
        opacity: .7;
        margin: 2px;
        padding-right: 8px;
    }

    .closeIcon {
        display: block;
        width: 16px;
        height: 16px;
    }

    .channel:focus-within .closeButton, .channel:hover .closeButton {
        display: block;
    }
</style>