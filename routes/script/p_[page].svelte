<script context="module">
  import { supabase } from '$lib/supabase'
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params, url }) {
    if (isNaN(Number(params.page))) {
      return {
        fallthrough: true
      }
    }
    const pg = Number(params.page)
    const scripts = await supabase
      .from('scripts')
      .select('id,name,description')
      .range(pg * 500, (pg + 1) * 500)
    return {
      props: {
        scripts: scripts.body,
        page: Number(params.page),
        host: url.origin
      }
    }
  }

  export const router = true
  export const prerender = false
</script>

<script>
  import ld from '$lib/ld'
  import Scripts from '$lib/components/Scripts.svelte'
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
      url: `${host}/script/${script.id}`
    }))
  })}
</svelte:head>
<Scripts {scripts} {host} />
<footer>
  <Button
    disabled={!page}
    variant="accent"
    href="p_{(page - 1).toString()}"
    sveltekit:prefetch
    rel="prev">←</Button
  >
  <h3>{page + 1}</h3>
  <Button
    disabled={!scripts.length}
    variant="accent"
    sveltekit:prefetch
    href="p_{(Number(page) + 1).toString()}"
    rel="next">→</Button
  >
</footer>

<style>
  footer {
    margin-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1ch;
    flex-direction: row;
  }
</style>
