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
  getgenv().request = request or (http and http.request) or (syn and syn.request) or (lib and lib.request)
  loadstring(request({
    Url = "https://${host}/script/${id}",
    Method = 'GET'
  }).Body, ${JSON.stringify(script.name)})()
  `
</script>

<svelte:head>
  <title>{script.name} - Luau.ml</title>
</svelte:head>

<h1>{script.name}</h1>
<p>{script.description}</p>
<code
  >{code}<button
    class="material-icons"
    on:click={() => navigator.clipboard.writeText(code)}>content_copy</button
  ></code
>
{#if script.games && script.games.length}
  <h2>Supported places</h2>
  {#each script.games as game}
    <a href="https://roblox.com/games/{game.AssetId}">{game.Name}</a>
  {/each}
{/if}

<style>
  button {
    background: none;
    color: white;
    float: right;
    border: 0;
    cursor: pointer;
    transition: background 0.3s;
    padding: 5px;
    border-radius: 8px;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  button:active {
    background: rgba(255, 255, 255, 0.5);
  }
  button:focus {
    border: solid 1px white;
  }
  code {
    white-space: pre-wrap;
  }
</style>
