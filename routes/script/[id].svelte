<script context="module">
  import { browser } from '$app/env'
  export const router = true
  export const prerender = false

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch, session }) {
    if (!isNaN(Number(page.params.id))) {
      return
    }
    if (session.exploit) {
      return {
        status: 301,
        redirect: `/script/${page.params.id}.lua`
      }
    }

    const url = `/script/${page.params.id}.json`
    const res = await fetch(url)
    if (res.ok) {
      return {
        props: {
          script: await res.json(),
          host: page.host,
          id: `${page.params.id}`
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
  import { AddTo, Copy, Delete } from '$lib/fluent'
  import { goto } from '$app/navigation'
  import { ContentDialog, Checkbox, Button, TextBox } from 'fluent-svelte'

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
</svelte:head>

{#if $user}
  <ContentDialog bind:open={dialog_open} title="Save to...">
    {#await hubs then hubs}
      {#each hubs as hub (hub.id)}
        <Checkbox bind:checked={hub.new_used}>{hub.name}</Checkbox><br />
      {:else}
        <p>No hubs found. Maybe you should <a href="/hub/new">make one?</a></p>
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
    <Button on:click={() => (dialog_open = true)}
      ><span class="icon">{AddTo}</span>Add to hub</Button
    >
    {#if owner}
      <Button on:click={del}><span class="icon">{Delete}</span>Delete</Button>
    {/if}
  </nav>
{/if}
{#if owner}
  <small>Your script's title.</small>
  <h1><TextBox required placeholder="Script name" bind:value={name} /></h1>
  <small>Your script's description.</small>
  <textarea bind:value={desc} />
  <small
    >Edit your script's source here. Other users will not see the source on the
    website, although they may be able to get it.</small
  >
  <Button
    on:click={() => {
      supabase.from('scripts').update({ source }).match({ id: script.id })
    }}>Save source</Button
  >
  <textarea bind:value={source} rows="30" />
{:else}
  <h1>{script.name}</h1>
  <a sveltekit:prefetch href="/author/{script.user_id}/0"
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
  .icon {
    font-family: 'icon';
    padding-right: 1ch;
  }
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
