<script context="module">
  import { browser } from '$app/env'

  export const router = true
  export const prerender = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session, context }) {
    if (session.exploit) {
      return {
        redirect: `/scripts/${page.params.id}.lua`
      }
    }
    if (isNaN(Number(page.params.id))) {
      return {
        status: 400,
        error: new Error(`ID must be a number`)
      }
    }

    const url = `/script/${page.params.id}.json`
    const res = await fetch(url)
    if (res.ok) {
      const script = await res.json()
      script.games =
        script.games &&
        (await Promise.all(
          script.games.map((game) => {
            return fetch(
              `https://cors.bridged.cc/https://api.roblox.com/Marketplace/ProductInfo?assetId=` +
                game,
              {
                headers: browser
                  ? undefined
                  : {
                      Origin: 'https://luau.ml'
                    }
              }
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
  import dedent from 'dedent'

  /** @type {{name: string, source: string, description: string, games: {Name: string, AssetId: number}[]}} */
  export let script
  export let host
  export let id
  let code = dedent`
  getgenv().request = request or (http and http.request) or (syn and syn.request) or (function (args)
    if args.Method ~= 'GET' then error('Method not supported') end
    return game:HttpGet(args.Url)
  end)
  loadstring(request({
    Url = 'https://${host}/script/${id}',
    Method = 'GET'
  }).Body, ${JSON.stringify(script.name)})()
  `
</script>

<svelte:head>
  <title>{script.name}</title>
</svelte:head>

<h1>{script.name}</h1>
<p>{script.description}</p>
<code>{code}</code>
{#if script.games && script.games.length}
  <h2>Supported places</h2>
  {#each script.games as game}
    <a href={`https://roblox.com/games/${game.AssetId}`}>{game.Name}</a>
  {/each}
{/if}

<style>
  code {
    white-space: pre-wrap;
    font-family: var(--font-mono);
    font-size: 13px;
  }
</style>
