<script>
  import { IconButton } from 'fluent-svelte'

  export const label = 'Copy'
</script>

<IconButton class="codebutton" on:click aria-label={label} title={label}>
  <slot />
</IconButton>

<style>
  :global(.icon-button.codebutton) {
    float: right;
  }
</style>
