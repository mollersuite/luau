<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const scripts = await fetch(
      `/search.json?q=${encodeURIComponent(page.query.get('q'))}`
    ).then((res) => res.json())
    return {
      props: {
        scripts
      }
    }
  }
</script>

<script>
  import Scripts from '$lib/Scripts.svelte'
  export let scripts = []
</script>

<svelte:head>
  <title>Search - Luau</title>
</svelte:head>
<Scripts {scripts}>No scripts found.</Scripts>
