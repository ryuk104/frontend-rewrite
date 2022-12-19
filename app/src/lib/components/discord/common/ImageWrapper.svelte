<script lang="ts">
    export let width: number = 32;
    export let height: number = width;

    export let avatar = undefined;

    export let label: string = "";
</script>



<div class:avatar={avatar !== undefined} class="wrapper" role="img" aria-label="{label}"
    aria-hidden="false"
    style="width: {width}px; height: {height}px;"
>    
    <svg width="40" height="32" viewBox="0 0 40 32" class="mask svg" aria-hidden="true">
        <foreignObject x="0" y="0" width="32" height="32" mask="url(#svg-mask-avatar-status-round-32)">
            <slot />
        </foreignObject>
        <rect width="10" height="10" x="22" y="22" fill="hsl(359, calc(var(--saturation-factor, 1) * 82.6%), 59.4%)" mask="url(#svg-mask-status-dnd)" class="pointerEvents">
        </rect>
    </svg>
</div>


<style>

</style>