<script lang="ts">
import Chat from "./chat/Chat.svelte";
import PrivateChannels from "./private_channels/PrivateChannels.svelte";
import UserArea from "./UserArea.svelte";



</script>


<div class="base">
    <div class="content" style="position: relative;">
        <div class="sidebar">
            <PrivateChannels />

            <section class="panels" aria-label="User area">
                <UserArea />
            </section>
        </div>
        <Chat />
    </div>
</div>

<style>
    .base {
        flex-direction: column;
        position: relative;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
    }

    .base, .sidebar {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        overflow: hidden;
    }

    .content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        min-width: 0;
        min-height: 0;
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto;
    }

    .sidebar {
        flex-direction: column;
        min-height: 0;
        width: 240px;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        background: var(--background-secondary);
    }

    .panels {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        background-color: var(--background-secondary-alt);
        z-index: 1;
    }
</style>