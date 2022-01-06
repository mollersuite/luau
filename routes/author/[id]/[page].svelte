<script context="module">
  export const router = true
  export const prerender = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params, fetch, url }) {
    const req = `/author/${params.id}/${params.page}.json`
    const res = await fetch(req)
    if (res.ok) {
      const scripts = await res.json()
      return {
        props: {
          scripts,
          id: params.id,
          page: Number(params.page),
          host: url.origin
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
  import Scripts from '$lib/components/Scripts.svelte'
  import { Button } from 'fluent-svelte'
  export let scripts = []
  export let id = ''
  export let host = 'https://luau.ml'
  export let page = 0
</script>

<h1>Uploaded by {id}</h1>
<Scripts {scripts} {host} />
<footer>
  {#if page >= 1}
    <Button href="./{page - 1}">←</Button>
  {/if}
  <span>{page}</span>
  {#if scripts.length}
    <Button href="./{page + 1}">→</Button>
  {/if}
</footer>

<style>
  footer {
    margin-top: 5px;
    text-align: center;
  }
</style>
