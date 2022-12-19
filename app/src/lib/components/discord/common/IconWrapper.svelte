
<div class="privateChannelRecipientsInviteButtonIcon iconWrapper clickable"
    role="button" aria-label="Create DM" tabindex="0"
>
    <svg x="0" y="0" class="privateChannelRecipientsInviteButtonIcon icon" aria-hidden="false" width="24" height="24" viewBox="0 0 18 18">
        <slot />
    </svg>
</div>

<style>
    .privateChannelRecipientsInviteButtonIcon {
        -webkit-box-flex: 0;
        -ms-flex: 0;
        flex: 0;
        width: 16px;
        height: 16px;
        margin-left: 0;
        margin-right: 2px;
    }
    .iconWrapper {
        position: relative;
        height: 24px;
        width: auto;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        margin: 0 8px;
    }
    .clickable {
        cursor: pointer;
    }
</style>