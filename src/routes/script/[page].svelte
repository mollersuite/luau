<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const scripts = await fetch(
      `/script/page_${page.params.page}.json`
    ).then((res) => res.json())
    return {
      props: {
        scripts,
        page: Number(page.params.page)
      }
    }
  }
  export const router = true
  export const prerender = false
</script>

<script>
  import { fly } from 'svelte/transition'
  export let scripts = []
  export let page = 0
</script>

<svelte:head>
  <title>Scripts page {page} - Luau</title>
</svelte:head>
<h1>Scripts</h1>
<section>
  {#each scripts as script, i}
    <a sveltekit:prefetch href="/script/{script.id}" in:fly={{ delay: i * 100, y: 50 }}>
      <h1>{script.name}</h1>
      <p>{script.description}</p>
    </a>
  {:else}
    <a sveltekit:prefetch in:fly={{ delay: 0, y: 50 }} href="/new">
      <h1>You've reached the end!</h1>
      <p>Maybe add your own script?</p>
    </a>
  {/each}
</section>
<footer>
  {#if page >= 1}
    <a sveltekit:prefetch href={(page - 1).toString()} rel="prev">←</a>
  {/if}
  <span>{page}</span>
  {#if scripts.length}
    <a sveltekit:prefetch href={(Number(page) + 1).toString()} rel="next">→</a>
  {/if}
</footer>

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
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-template-rows: masonry;
  }
  p {
    white-space: pre-wrap;
  }
  a {
    word-break: break-all;
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
