<script context="module">
  export const router = true
  export const prerender = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }) {
    const url = `/author/${page.params.id}/${page.params.page}.json`
    const res = await fetch(url)
    if (res.ok) {
      const scripts = await res.json()
      return {
        props: {
          scripts,
          id: page.params.id,
          page: Number(page.params.page)
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
  import Scripts from '$lib/Scripts.svelte'
  export let scripts = []
  export let id = ''
  export let page = 0
</script>

<h1>Uploaded by {id}</h1>
<Scripts {scripts} />
<footer>
  {#if page >= 1}
    <a href="./{page - 1}">←</a>
  {/if}
  <span>{page}</span>
  {#if scripts.length}
    <a href="./{page + 1}">→</a>
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
