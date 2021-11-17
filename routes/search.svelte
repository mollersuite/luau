<script context="module">
  import { supabase } from '$lib/supabase'
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const search = page.query.get('q')

    const scripts = await supabase
      .from('scripts')
      .select('id,name,description')
      .textSearch('name', search, {
        type: 'websearch',
        config: 'english'
      })

    return {
      props: {
        scripts: scripts.body
      }
    }
  }
</script>

<script>
  import Scripts from '$lib/components/Scripts.svelte'
  export let scripts = []
</script>

<svelte:head>
  <title>Search - Luau</title>
</svelte:head>
<Scripts {scripts}>No scripts found.</Scripts>
