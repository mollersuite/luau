<script>
  import { IconButton } from 'fluent-svelte'

  export const label = 'Copy'
</script>

<IconButton on:click aria-label={label}>
  <slot />
</IconButton>

<style>
  :global(.icon-button) {
    font-family: 'icon';
    float: right;
  }
</style>
