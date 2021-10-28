<script>
  import * as fluent from './fluent'
  /** @type {keyof import('./fluent')} */
  export let icon
</script>

<button on:click><span aria-hidden="true">{fluent[icon]}</span> <slot /></button
>

<style>
  button {
    display: inline-block;
  }
  span {
    font-family: 'icon';
  }
</style>
