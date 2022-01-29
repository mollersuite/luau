<script context="module">
  import { supabase } from '$lib/supabase'
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ url }) {
    const search = url.searchParams.get('q')

    const scripts = await supabase
      .from('scripts')
      .select('id,name,description')
      .textSearch('name', search, {
        type: 'websearch',
        config: 'english'
      })

    return {
      props: {
        scripts: scripts.body,
        host: url.origin
      }
    }
  }
</script>

<script>
  import Scripts from '$lib/components/Scripts.svelte'
  export let scripts = []
  export let host = 'https://luau.ml'
</script>

<svelte:head>
  <title>Search - Luau</title>
</svelte:head>
<Scripts {scripts} {host}>
  <svelte:fragment slot="notfound">No scripts found.</svelte:fragment>
</Scripts>
