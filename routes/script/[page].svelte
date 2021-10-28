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
        page: Number(page.params.page),
        host: page.host
      }
    }
  }
  export const router = true
  export const prerender = false
</script>

<script>
  import ld from '$lib/ld'

  import { blur } from 'svelte/transition'
  export let scripts = []
  export let page = 0
  export let host
</script>

<svelte:head>
  <title>Scripts page {page} - Luau.ml</title>
  {@html ld({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: scripts.map((script, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://${host}/script/${script.id}`
    }))
  })}
</svelte:head>
<h1>Scripts (page {page})</h1>
<section>
  {#each scripts as script, i}
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
  a:hover {
    text-decoration: none;
  }
</style>
