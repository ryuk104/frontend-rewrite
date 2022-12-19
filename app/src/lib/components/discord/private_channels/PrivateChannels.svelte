<script lang="ts">
import IconWrapper from "../common/IconWrapper.svelte";
import Channel from "./Channel.svelte";

    let topNav = [
        {name: 'Kentchuky'},
        {name: 'Friends'},
        {name: 'Chicken'},
    ]

    let channels = [
        {name: 'Secret', description: 'Secret place to talk !'},
        {name: 'Sales'},
        {name: 'Design', description: 'Hey this is my mock of Discord'},
        {name: 'Supervise'},
        {name: 'Server Stats', description: 'Srv01 is on fire...'},
        {name: 'Daily Scrum', description: 'Let\'s focus on cool features nobody wanted'},
        {name: 'Meeting'},
        {name: 'Projet Launch #42'},
        {name: 'Testin area', description: 'CanYouSeeMee ?'},
        {name: '[Hack] Risk management', description: 'Okay what\'s ILoveYou.exe on my desktop'},
        {name: 'Welcome', description: 'Welcome to the team, Eliott !'},
        {name: 'Lunch time', description: 'Some fast food, 11:30 AM ?'},
        {name: 'Remote Working plan'},
        {name: 'Business Meeting'},
        {name: 'Random cat pictures'},

    ]

</script>

<nav class="privateChannels" aria-label="Private channels">
    <div class="searchBar">
        <button type="button" class="searchBarComponent">Find or start a conversation</button>
    </div>

    <div class="scroller thin scrollerBase fade"
        tabindex="0" data-list-id="private-channels-uid_17"
        data-jump-section="global"
    >
        <ul role="list" aria-label="Direct Messages" class="content">
            <div aria-hidden="true" style="height: 8px;"></div>
            {#each topNav as nav }
                <Channel channel={nav}/>
            {/each}

            <h2 class="privateChannelsHeaderContainer container">
                <span class="headerText">Direct Messages</span>
                <IconWrapper>
                    <polygon fill-rule="nonzero" fill="currentColor" points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
                </IconWrapper>
                
            </h2>

            {#each channels as chan }
                <Channel channel={chan} discardable={true}/>
            {/each}

        </ul>
    </div>

</nav>

<style>
    .privateChannels {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        background-color: var(--background-secondary);
    }

    .privateChannels, .searchBar {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .searchBar {
        z-index: 2;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        padding: 0 10px;
        height: 48px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-shadow: var(--elevation-low);
        box-shadow: var(--elevation-low);
    }

    .searchBar .searchBarComponent {
        width: 100%;
        height: 28px;
        overflow: hidden;
        border-radius: 4px;
        background-color: var(--background-tertiary);
        -webkit-box-shadow: none;
        box-shadow: none;
        color: var(--text-muted);
        text-align: left;
        text-overflow: ellipsis;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        white-space: nowrap;
    }

    .scrollerBase {
        position: relative;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        min-height: 0;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
    }

    .scroller {
        background-color: var(--background-secondary);

        overflow: hidden auto;
        padding-right: 0px;
    }

    .content {
        position: relative;
    }

    .privateChannelsHeaderContainer {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 18px 8px 4px 18px;
        height: 40px;
    }
    .container {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-transform: uppercase;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: .25px;
        font-family: var(--font-display);
        font-weight: 600;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
        color: var(--channels-default);
    }

    .headerText {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>