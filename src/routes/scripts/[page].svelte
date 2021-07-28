<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const scripts = await fetch(
      `/scripts/${page.params.page}.json`
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
  export let page = 1
</script>

<svelte:head>
  <title>Scripts</title>
</svelte:head>
<h1>Scripts</h1>
<section>
  {#each scripts as script, i}
    <a
      href="/script/{((page - 1) * 10) + 1 + i}"
      in:fly={{ delay: i * 100, y: 50 }}
    >
      <h1>{script.name}</h1>
      <p>{script.description}</p>
    </a>
  {:else}
    <a in:fly={{ delay: 0, y: 50 }} href="new">
      <h1>You've reached the end!</h1>
      <p>Maybe add your own script?</p>
    </a>
  {/each}
</section>
<footer>
  {#if page > 1}
    <a href={(page - 1).toString()}>←</a>
  {/if}
  <span>{page}</span>
  {#if scripts.length}
    <a href={(Number(page) + 1).toString()}>→</a>
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
