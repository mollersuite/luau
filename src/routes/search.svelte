<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const scripts = await fetch(
      `/search.json?q=${page.query.get('q')}`
    ).then((res) => res.json())
    return {
      props: {
        scripts,
        query: page.query.get('q')
      }
    }
  }
  export const router = true
  export const prerender = false
</script>

<script>
  import { fly } from 'svelte/transition'
  export let scripts = []
  export let query = ''
</script>

<svelte:head>
  <title>Search - Luau.ml</title>
</svelte:head>
<h1>Search</h1>
<form action="/search">
  <input type="search" name="q" bind:value={query} />
  <input type="submit" value="Search" />
</form>
<section>
  {#each (scripts || []) as script, i}
    <a href="/script/{script.id}" in:fly={{ delay: i * 100, y: 50 }}>
      <h1>{script.name}</h1>
      <p>{script.description}</p>
    </a>
  {:else}
    <a in:fly={{ delay: 0, y: 50 }} href="/new">
      <h1>No scripts found.</h1>
      <p>Maybe add your own script?</p>
    </a>
  {/each}
</section>

<style>
  footer {
    margin-top: 5px;
    text-align: center;
  }
  footer a {
    display: inline-block;
  }
  section h1 {
    font-size: 1em;
  }
  section {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: masonry;
  }
  a {
    display: block;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1em;
    color: var(--heading-color);
  }
  a:hover {
    text-decoration: none;
  }
</style>
