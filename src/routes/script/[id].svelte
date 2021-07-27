<script context="module">
  import { browser } from '$app/env'

  // if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = browser

  // there is obviously dynamic data here
  export const prerender = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session, context }) {
    if (session.exploit) {
      return {
        redirect: `./${page.params.id}.lua`
      }
    }
    if (isNaN(Number(page.params.id))) {
      return {
        status: 400,
        error: new Error(`ID must be a number`)
      }
    }

    const url = `./${page.params.id}.json`
    const res = await fetch(url)
    if (res.ok) {
      const script = await res.json()
      script.games =
        script.games &&
        (await Promise.all(
          script.games.map((game) => {
            return fetch(
              `https://api.roblox.com/Marketplace/ProductInfo?assetId=` + game
            ).then((res) => res.json())
          })
        ))
      return {
        props: {
          script,
          host: page.host,
          id: page.params.id
        }
      }
    }

    return {
      status: res.status,
      error: new Error(`Script not found.`)
    }
  }
</script>

<script>
  export let script
  export let host
  export let id
</script>

<svelte:head>
  <title>{script.name}</title>
</svelte:head>

<h1>{script.name}</h1>
<p>{script.description}</p>
<pre>{`getgenv().request = request or (http and http.request) or (syn and syn.request) or (function (args)
\tif args.Method ~= 'GET' then error('Method not supported') end
\treturn game:HttpGet(args.Url)
end)
loadstring(request({
\tUrl = 'https://${host}/${id}',
\tMethod = 'GET'
}).Body, ${JSON.stringify(script.name)})()`}</pre>
{#if script.games && script.games.length}
  <h2>Supported places</h2>
  {#each script.games as game}
    <a href={`https://roblox.com/games/${game.AssetId}`}>{game.Name}</a>
  {/each}
{/if}
