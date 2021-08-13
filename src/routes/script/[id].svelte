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
        status: 301,
        redirect: `/script/${page.params.id}.lua`
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
      status: 404,
      error: new Error(`Script not found.`)
    }
  }
</script>

<script>
  import dedent from 'dedent'
  import { user, supabase } from '$lib/supabase'
  import CodeButton from '$lib/CodeButton.svelte'

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
  <title>{script.name} - Luau</title>
  <meta name="description" content={script.description} />
</svelte:head>
{#if owner}
  <small>You own this script, so you can edit it here.</small>
  <button
    class="delete"
    on:click={() => {
      supabase
        .from('scripts')
        .delete()
        .match({ id: script.id })
        .then(() => {
          location.replace('/')
        })
    }}>DELETE</button
  >
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
  >{code}<CodeButton on:click={() => navigator.clipboard.writeText(code)}
    >content_copy</CodeButton
  ></code
>
{#if script.games && script.games.length}
  <h2>Supported places</h2>
  {#each script.games as game}
    <a href="https://roblox.com/games/{game.AssetId}">{game.Name}</a>
  {/each}
{/if}
{#if !$user}
  <h2>FAQ</h2>
  <details>
    <summary>How do I run this script?</summary>
    <p>You can run this script in a Roblox scripting utility.</p>
  </details>
  <details>
    <summary>What scripting utilities are supported by Luau.ml?</summary>
    <ul>
      <li>
        <a href="https://script-ware.com">
          <img src="/sw.svg" height="16" alt="Script-Ware logo" /> Script-Ware</a
        >
      </li>
      <li>
        <a href="https://x.synapse.to"
          ><img src="/synx.svg" height="16" alt="Synapse X logo" /> Synapse X</a
        >
      </li>
      <li>
        <a href="https://krnl.ca"
          ><img src="/krnl.svg" height="16" alt="Krnl logo" /> Krnl (not tested; someone told me the user agent)</a
        >
      </li>
      <li>Electron</li>
      <li>
        <a href="https://fluxteam.xyz">Fluxus</a>
      </li>
      <li>Sentinel (not tested; looked at API docs for user agent)</li>
    </ul>
  </details>
{/if}

<style>
  p {
    white-space: pre-wrap;
  }
  button.delete {
    float: right;
    width: max-content;
  }

  textarea {
    resize: vertical;
  }

  code {
    white-space: pre-wrap;
  }
  textarea {
    border: 0;
  }
</style>
