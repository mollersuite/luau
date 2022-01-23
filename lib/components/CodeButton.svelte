<script>
  import { IconButton, Tooltip } from 'fluent-svelte'

  export const label = 'Copy'
</script>

<Tooltip text={label}>
  <IconButton on:click aria-label={label}>
    <slot />
  </IconButton>
</Tooltip>

<style>
  :global(.icon-button) {
    float: right;
  }
</style>
