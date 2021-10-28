<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const scripts = await fetch(
      `/search.json?q=${encodeURIComponent(page.query.get('q'))}`
    ).then((res) => res.json())
    return {
      props: {
        scripts,
        query: page.query.get('q')
      }
    }
  }
</script>

<script>
  import { supabase } from '$lib/supabase'

  import { blur } from 'svelte/transition'
  export let scripts = []
  export let query = ''
  $: supabase
    .from('scripts')
    .select('*')
    .textSearch('name', query, { type: 'websearch', config: 'english' })
    .then(({ body }) => (scripts = body))
</script>

<svelte:head>
  <title>Search - Luau</title>
</svelte:head>
<section>
  {#if query}
    {#each scripts || [] as script, i}
      <a
        sveltekit:prefetch
        href="/script/{script.id}"
        in:blur={{ delay: (i / scripts.length) * 500, amount: 5 }}
      >
        <h1>{script.name}</h1>
        <p>{script.description}</p>
      </a>
    {:else}
      <a sveltekit:prefetch in:blur={{ amount: 5 }} href="/new">
        <h1>No scripts found.</h1>
        <p>Maybe add your own script?</p>
      </a>
    {/each}
  {:else}
    <h3>Make a search!</h3>
  {/if}
</section>

<style>
  section {
    column-count: auto;
    column-width: 250px;
    column-gap: 1em;
  }
  p {
    white-space: pre-wrap;
  }
  section a {
    box-sizing: border-box;
    display: inline-block;
    word-wrap: break-word;
    width: 100%;
    margin: 0 0 1em;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1em;
    color: var(--heading-color);
  }
</style>
