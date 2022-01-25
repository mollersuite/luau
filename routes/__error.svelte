<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        status,
        message: error
      }
    }
  }
</script>

<script>
  import Snippet from '$lib/components/Snippet.svelte'
  import { InfoBar, InfoBadge } from 'fluent-svelte'

  /** @type {number} */
  export let status
  /** @type {Error} */
  export let message
</script>

<svelte:head>
  <title>{status}: {message.name} - Luau.ml</title>
</svelte:head>

<h1 class="big">
  {status}
</h1>
<InfoBar closable={false} title={status.toString()} severity="critical">
  {message.name}
  <InfoBadge style="float: right" severity="critical"
    >{import.meta.env.MODE}</InfoBadge
  >
</InfoBar>
<Snippet code={message.stack} />

<style>
  .big {
    pointer-events: none;
    user-select: none;
    z-index: -1;
    font-size: 30vw;
    position: absolute;
    top: -15vw;
    left: -5vw;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    opacity: 0.5;
  }
</style>
