<script context="module">
  import { browser } from '$app/env'
  export const router = true
  export const prerender = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session }) {
    if (session.exploit) {
      return {
        status: 301,
        redirect: `/script/${page.params.a}-${page.params.b}.lua`
      }
    }

    const url = `/script/${page.params.a}-${page.params.b}.json`
    const res = await fetch(url)
    if (res.ok) {
      const script = await res.json()
      // script.games =
      //   script.games &&
      //   (await Promise.all(
      //     script.games.map((game) => {
      //       return fetch(
      //         `https://cors.bridged.cc/https://api.roblox.com/Marketplace/ProductInfo?assetId=` +
      //           game,
      //         {
      //           headers: browser
      //             ? undefined
      //             : {
      //                 Origin: 'https://luau.ml'
      //               }
      //         }
      //       ).then((res) => res.json())
      //     })
      //   ))
      return {
        props: {
          script,
          host: page.host,
          id: `${page.params.a}-${page.params.b}`
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
  import { user, supabase } from '$lib/supabase'
  import CodeButton from '$lib/CodeButton.svelte'
  import ld from '$lib/ld'
  import { Copy } from '$lib/fluent'
  import { goto } from '$app/navigation'
  import IconButton from '$lib/IconButton.svelte'
  import { ContentDialog, Checkbox, Button } from 'fluent-svelte'

  /** @type {{name: string, id: string,source: string, description: string, user_id: string, games: string[]}} */
  export let script
  export let host
  export let id
  let code = `loadstring(game:HttpGet("https://${host}/script/${id}"), ${JSON.stringify(
    script.name
  )})()`
  $: owner = script.user_id === $user?.id
  let name = script.name
  let desc = script.description
  $: owner &&
    name &&
    supabase
      .from('scripts')
      .update({ name })
      .match({ id: script.id })
      .then(() => {})

  $: owner &&
    desc &&
    supabase
      .from('scripts')
      .update({ description: desc }, { returning: 'minimal' })
      .match({ id: script.id })
      .then(() => {})
  function del() {
    supabase
      .from('scripts')
      .delete()
      .match({ id: script.id })
      .then(() =>
        goto('/', {
          replaceState: true
        })
      )
  }
  let source = script.source
  const hubs = browser
    ? supabase
        .from('hubs')
        .select('name,id,scripts')
        .throwOnError()
        .then((hubs) =>
          hubs.body.map((hub) => ({
            ...hub,
            used: hub.scripts.includes(script.id),
            new_used: hub.scripts.includes(script.id)
          }))
        )
    : Promise.resolve([])
  let dialog_open = false
</script>

<svelte:head>
  <title>{script.name} - Luau</title>
  <meta name="description" content={script.description} />
  <link rel="help" href="#faq" />
  <meta property="og:title" content={script.name} />
  <meta property="og:description" content={script.description} />
  {@html ld({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'Scripts',
        position: 1,
        name: 'Books',
        item: 'https://example.com/books'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: script.name
      }
    ]
  })}
</svelte:head>

{#if $user}
  <ContentDialog bind:open={dialog_open} title="Which one?">
    {#await hubs then hubs}
      {#each hubs as hub (hub.id)}
        <Checkbox bind:checked={hub.new_used}>{hub.name}</Checkbox><br />
      {:else}
        <p>No hubs found.</p>
      {/each}
    {/await}
    <svelte:fragment slot="footer">
      <Button
        variant="accent"
        on:click={() => {
          dialog_open = false
          hubs.then((hubs) => {
            const changed_hubs = hubs.filter((hub) => hub.used !== hub.new_used)
            changed_hubs.forEach((hub) => {
              supabase
                .from('hubs')
                .update(
                  {
                    scripts: hub.new_used
                      ? [...hub.scripts, script.id]
                      : hub.scripts.filter((id) => id !== script.id)
                  },
                  { returning: 'minimal' }
                )
                .match({ id: hub.id })
                .then(() => {})
            })
          })
        }}>Save</Button
      >
      <Button
        on:click={() => {
          dialog_open = false
        }}>Cancel</Button
      >
    </svelte:fragment>
  </ContentDialog>
  <nav>
    <IconButton icon="AddTo" on:click={() => (dialog_open = true)}
      >Add to hub</IconButton
    >
    {#if owner}
      <IconButton icon="Delete" on:click={del}>Delete</IconButton>
    {/if}
  </nav>
{/if}
{#if owner}
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
      supabase.from('scripts').update({ source }).match({ id: script.id })
    }}>Save source</button
  >
  <textarea bind:value={source} rows="30" />
{:else}
  <h1>{script.name}</h1>
  <a sveltekit:prefetch href="/author/{script.user_id}"
    >Uploaded by {script.user_id}</a
  >
  <p>{script.description}</p>
{/if}
<h2>Loader</h2>
<code
  >{code}<CodeButton on:click={() => navigator.clipboard.writeText(code)}
    >{Copy}</CodeButton
  ></code
>
{#if script.games && script.games.length}
  <h2>Supported places</h2>
  {#each script.games as game}
    <a href="https://roblox.com/games/{game}" rel="nofollow">{game}</a>
  {/each}
{/if}
{#if !$user}
  <h2 id="faq">FAQ</h2>
  <details>
    <summary>How do I run this script?</summary>
    <p>You can run this script in any Roblox scripting utility.</p>
  </details>
{/if}

<style>
  p {
    white-space: pre-wrap;
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
