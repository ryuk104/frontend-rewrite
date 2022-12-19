<script lang="ts">
    export let user = {
        name: 'MissingNo',
        tag: '#0000'
    };

</script>

<div class="nameTag canCopy" aria-label="Click to copy username" role="button" tabindex="0">
    <div class="colorStandard size14 usernameContainer">
        <div class="size14 title">{user.name || 'MissingNo'}</div>
    </div>
    <div class="size12 subtext">{user.tag || '#0000'}</div>
</div>

<style>
    .nameTag {
        -webkit-user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        user-select: text;
        -webkit-box-flex: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        margin-right: 4px;
        min-width: 0;
    }

    .nameTag.canCopy {
        cursor: pointer;
    }

    .usernameContainer {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .size14 {
        font-size: 14px;
        line-height: 18px;
    }
    
    .colorStandard {
        color: var(--text-normal);
    }

    .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: var(--header-primary);
        line-height: 18px;
        font-weight: 600;
    }

    .size14 {
        font-size: 14px;
        line-height: 18px;
    }

    .subtext {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: var(--header-secondary);
        line-height: 13px;
    }

    .size12 {
        font-size: 12px;
        line-height: 16px;
    }
</style>