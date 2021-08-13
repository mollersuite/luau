<script context="module">
  export const router = true
  export const prerender = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const url = `/author/${page.params.id}.0.json`
    const res = await fetch(url)
    if (res.ok) {
      const scripts = await res.json()
      return {
        props: {
          scripts,
          id: page.params.id
        }
      }
    }

    return {
      status: 404,
      error: new Error(`Author not found.`)
    }
  }
</script>

<script>
  import { fly } from 'svelte/transition'
  export let scripts = []
  export let id = ''
  let page = 0
  $: fetch(`/author/${id}.${page}.json`)
    .then((res) => res.json())
    .then((scr) => (scripts = scr))
    .catch(() => (scripts = []))
</script>

<h1>Uploaded by {id}</h1>
<section>
  {#each scripts as script, i}
    <a href="/script/{script.id}" in:fly={{ delay: i * 100, y: 50 }}>
      <h1>{script.name}</h1>
      <p>{script.description}</p>
    </a>
  {:else}
    <a in:fly={{ delay: 0, y: 50 }} href="/new">
      <h1>You've reached the end!</h1>
      <p>Maybe add your own script?</p>
    </a>
  {/each}
</section>
<footer>
  {#if page >= 1}
    <button on:click={() => page--}>←</button>
  {/if}
  <span>{page}</span>
  {#if scripts.length}
    <button on:click={() => page++}>→</button>
  {/if}
</footer>

<style>
  footer {
    margin-top: 5px;
    text-align: center;
  }
  footer button {
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
