<script lang="ts">
  let klass = ''
  export { klass as class }
  export let href: string | null = null
  export let target: '_blank' | '_self' = '_self'
  export let disabled: boolean = false
  export let type: 'button' | 'submit' | 'reset' = 'button'
</script>

{#if href !== null}
  <a class={klass} {href} {target}>
    <slot />
  </a>
{:else}
  <button on:click class={klass} {type} {disabled}>
    <slot />
  </button>
{/if}
