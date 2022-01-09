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

  /** @type {number} */
  export let status
  /** @type {Error} */
  export let message
</script>

<svelte:head>
  <title>{status}: {message.name} - Luau.ml</title>
</svelte:head>

<h1 class="big">{status}</h1>
<h1>
  {status}: {message.name}
</h1>
<Snippet code={message.stack} />
<p>
  my code tends to actually work; its probably a problem with sveltekit
  (metaframework), vite (bundler), supabase (db) or vercel (hosting)
</p>

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
