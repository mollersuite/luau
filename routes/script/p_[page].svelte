<script context="module">
  import { supabase } from '$lib/supabase'
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    if (isNaN(Number(page.params.page))) {
      return
    }
    const pg = Number(page.params.page)
    const scripts = await supabase
      .from('scripts')
      .select('id,name,description')
      .range(pg * 500, (pg + 1) * 500)
    return {
      props: {
        scripts: scripts.body,
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
  import { Button } from 'fluent-svelte'
  export let scripts = []
  export let page = 0
  export let host
</script>

<svelte:head>
  <title>Scripts page {page} - Luau.ml</title>
  {@html ld({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: scripts?.map((script, i) => ({
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
    <Button href="p_{(page - 1).toString()}" sveltekit:prefetch rel="prev">←</Button
    >
  {/if}
  <span>{page}</span>
  {#if scripts.length}
    <Button sveltekit:prefetch href="p_{(Number(page) + 1).toString()}" rel="next"
      >→</Button
    >
  {/if}
</footer>

<style>
  footer {
    margin-top: 5px;
    text-align: center;
  }
</style>
