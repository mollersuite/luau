<script>
  import { IconButton } from 'fluent-svelte'

  export const label = 'Copy'
</script>

<IconButton on:click aria-label={label} title={label}>
  <slot />
</IconButton>

<style>
  :global(.icon-button) {
    float: right;
  }
</style>
