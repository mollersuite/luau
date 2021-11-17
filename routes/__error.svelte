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
  import Snippet from '$lib/Snippet.svelte'

  /** @type {number} */
  export let status
  /** @type {Error} */
  export let message
</script>

<h1 class="big">{status}</h1>
<h1>
  It's {new Set('aeiou').has(message.name.toLowerCase()[0]) ? 'an' : 'a'}
  {message.name}!
</h1>
<Snippet code={message.stack} />
<p>Blame Jack, SvelteKit, Vite, Supabase, or Cloudflare Workers.</p>

<style>
  .big {
    pointer-events: none;
    user-select: none;
    z-index: -1;
    font-size: 30vw;
    position: absolute;
    top: -15vw;
    left: -5vw;
    opacity: .5;
    background: var(--accent-color);
    background: -webkit-linear-gradient(
      to right,
      var(--fds-text-primary),
      var(--accent-color)
    );
    background: linear-gradient(
      to right,
      var(--fds-text-primary),
      var(--accent-color)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
</style>
