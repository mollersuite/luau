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
  import { user, supabase } from '$lib/supabase'

  /** @type {{name: string, id: string,source: string, description: string, user_id: string, games: {Name: string, AssetId: number}[]}} */
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
  $: owner = script.user_id === $user?.id
  let name = script.name
  let desc = script.description
  $: owner &&
    name &&
    supabase
      .from('scripts')
      .update({ name })
      .match({ id: script.id })
      .then(console.log)

  $: owner &&
    desc &&
    supabase
      .from('scripts')
      .update({ description: desc })
      .match({ id: script.id })
      .then(console.log)
  let source = script.source
</script>

<svelte:head>
  <title>{script.name} - Luau.ml</title>
  <meta name="description" content={script.description} />
</svelte:head>
{#if owner}
  <small>You own this script, so you can edit it here.</small>
  <button class="delete">DELETE</button>
  <small>Your script's title.</small>
  <h1><input type="text" bind:value={name} /></h1>
  <small>Your script's description.</small>
  <textarea bind:value={desc} />
  <small
    >Edit your script's source here. Other users will not see the source on the
    website, although they may be able to get it.</small
  >
  <button
    on:click={() => {
      supabase
        .from('scripts')
        .update({ source })
        .match({ id: script.id })
        .then(console.log)
    }}>Save source</button
  >
  <textarea bind:value={source} rows="30" />
{:else}
  <h1>{script.name}</h1>
  <p>{script.description}</p>
{/if}
<h2>Loader</h2>
<code
  >{code}<button
    class="material-icons copy"
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
  p {
    white-space: pre-wrap;
  }
  button.delete {
    float: right;
    width: max-content;
  }
  button.copy {
    background: none;
    color: white;
    float: right;
    border: 0;
    cursor: pointer;
    transition: background 0.3s;
    padding: 5px;
    border-radius: 8px;
  }
  button.copy:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  button.copy:active {
    background: rgba(255, 255, 255, 0.5);
  }
  button.copy:focus {
    border: solid 1px white;
  }
  code {
    white-space: pre-wrap;
  }
  textarea {
    border: 0;
  }
</style>
