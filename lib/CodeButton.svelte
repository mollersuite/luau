<script>
  import { Button } from 'fluent-svelte'

  export const label = 'Copy'
</script>

<div><Button on:click aria-label={label}><slot /></Button></div>
<style>
  div :global(button) {
    font-family: 'icon' !important;
    float: right;
  }
</style>
