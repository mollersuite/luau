<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    if (isNaN(Number(page.params.page))) {
      return
    }
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
  import Scripts from '$lib/Scripts.svelte'
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
<Scripts {scripts} />
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
  a:hover {
    text-decoration: none;
  }
</style>
