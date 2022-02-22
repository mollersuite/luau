<script context="module">
  import { browser } from '$app/env'
  import { user, supabase } from '$lib/supabase'
  export const router = true
  export const prerender = false
</script>

<script>
  export let id
  /** @type {{name: string, id: string,source: string, description: string, user_id: string, games?: string[],hidden:boolean}} */
  export let script
  $: owner = script?.user_id === $user?.id
  let name = script?.name
  let desc = script?.description
  let hidden = script?.hidden
  let source = script?.source ?? ''
  if (browser && !script) {
    supabase
      .from('scripts')
      .select('name,games,description,user_id,hidden,source')
      .match({ id })
      .then((res) => {
        console.log(res)
        script = res.body[0]
        name = script.name
        desc = script.description
        hidden = script.hidden
        source = script.source ?? ''
      })
  }
  const host = $page.url.origin

  import Delete from '@fluentui/svg-icons/icons/delete_20_regular.svg?raw'
  import AddTo from '@fluentui/svg-icons/icons/collections_add_20_regular.svg?raw'
  import { goto } from '$app/navigation'
  import {
    ContentDialog,
    Checkbox,
    Button,
    TextBox,
    Flyout
  } from 'fluent-svelte'
  import Snippet from '$lib/components/Snippet.svelte'
  import { page } from '$app/stores'
  let code = `loadstring(game:HttpGet("${host}/script/${id}"), ${JSON.stringify(
    script?.name
  )})()`
  $: owner &&
    name &&
    supabase
      .from('scripts')
      .update({ name })
      .match({ id })
      .then(() => {})

  $: owner &&
    desc &&
    supabase
      .from('scripts')
      .update({ description: desc }, { returning: 'minimal' })
      .match({ id })
      .then(() => {})
  $: (owner ?? hidden) &&
    supabase
      .from('scripts')
      .update({ hidden }, { returning: 'minimal' })
      .match({ id })
      .then(() => {})
  function del() {
    supabase
      .from('scripts')
      .delete()
      .match({ id })
      .then(() =>
        goto('/', {
          replaceState: true
        })
      )
  }
  const hubs =
    $user && browser
      ? supabase
          .from('hubs')
          .select('name,id,scripts')
          .throwOnError()
          .then((hubs) =>
            hubs.body?.map((hub) => ({
              ...hub,
              used: hub.scripts.includes(id),
              new_used: hub.scripts.includes(id)
            }))
          )
      : Promise.resolve([])
  let dialog_open = false
</script>

<svelte:head>
  <title>{script?.name || 'Script'} - Luau</title>
  <meta
    name="description"
    content={script?.description || 'A script on Luau.ml'}
  />
  <link rel="help" href="#faq" />
  <meta property="og:title" content={script?.name || 'Script'} />
  <meta
    property="og:description"
    content={script?.description || 'A script on Luau.ml'}
  />
</svelte:head>
{#if script}
  {#if $user}
    <ContentDialog bind:open={dialog_open} title="Save to...">
      <br />
      {#await hubs then hubs}
        {#each hubs as hub (hub.id)}
          <Checkbox bind:checked={hub.new_used}>{hub.name}</Checkbox><br />
        {:else}
          <p>
            No hubs found. Maybe you should <a
              sveltekit:prefetch
              href="/hub/new">make one?</a
            >
          </p>
        {/each}
      {/await}
      <svelte:fragment slot="footer">
        <Button
          variant="accent"
          on:click={() => {
            dialog_open = false
            hubs.then((hubs) => {
              const changed_hubs = hubs.filter(
                (hub) => hub.used !== hub.new_used
              )
              changed_hubs.forEach((hub) => {
                supabase
                  .from('hubs')
                  .update(
                    {
                      scripts: hub.new_used
                        ? [...hub.scripts, id]
                        : hub.scripts.filter((id) => id !== id)
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
      <Button
        on:click={() => (dialog_open = true)}
        title="Add a script to one of your collections."
        ><span class="icon">{@html AddTo}</span>Add to hub</Button
      >
      {#if owner}
        <Flyout position="right">
          <Button><span class="icon">{@html Delete}</span> Delete</Button>
          <svelte:fragment slot="flyout"
            >Are you sure you want to delete your script? You cannot undo this.<br
            />
            <Button on:click={del} variant="accent">Delete</Button
            ></svelte:fragment
          >
        </Flyout>
      {/if}
    </nav>
  {/if}
  {#if owner}
    <h1><TextBox required placeholder="Script name" bind:value={name} /></h1>
    <textarea bind:value={desc} />

    <label for="hidden">
      <Checkbox id="hidden" bind:checked={hidden} />
      Hidden? (This script will 404 when visited by anyone else, won't show up in
      the list or search, but the loader will work for everyone.)
    </label>
    <Button
      on:click={() => {
        supabase
          .from('scripts')
          .update({ source })
          .match({ id })
          .then(() => {})
      }}>Save source</Button
    >
    <textarea bind:value={source} rows="30" />
  {:else}
    <h1>
      {script.name}
    </h1>
    <a sveltekit:prefetch href="/author/{script.user_id}/0"
      >Uploaded by {script.user_id}</a
    >
    <p>
      {script.description}
    </p>
  {/if}
  <h2>Loader</h2>
  <Snippet {code} />
  {#if script.games && script.games.length}
    <h2>Supported places</h2>
    {#each script.games as game}
      <a href="https://roblox.com/games/{game}" rel="nofollow">{game}</a>
    {/each}
  {/if}
{:else}
  <h1 class="big">404</h1>
  <h1>Script not found</h1>
  <p>The script was either removed, or made private.</p>
{/if}

<style>
  .big {
    pointer-events: none;
    user-select: none;
    z-index: -1;
    font-size: 30vw;
    position: absolute;
    top: -15vw;
    left: -5vw;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    opacity: 0.5;
  }
  .icon {
    padding-right: 1ch;
    fill: currentColor;
  }
  p {
    white-space: pre-wrap;
  }
  textarea {
    resize: vertical;
  }
  textarea {
    border: 0;
  }
</style>
