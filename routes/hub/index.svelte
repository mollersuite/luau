<script context="module">
  import { supabase } from '$lib/supabase'
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load() {
    return {
      props: {
        hubs: (
          await supabase.from('hubs').select('name,id,scripts').throwOnError()
        ).body
      }
    }
  }
</script>

<script>
  import { browser } from '$app/env'
  import { goto } from '$app/navigation'
  import AddTo from '@fluentui/svg-icons/icons/collections_add_20_regular.svg?raw'
  import { user } from '$lib/supabase'
  $: browser && !$user && goto('/', { replaceState: true })
  export let hubs
</script>

<svelte:head>
  <title>Hubs</title>
</svelte:head>

<section>
  <a href="/hub/new"
    ><h1>Create a hub</h1>
    <p>
      After creation, just click the <span
        aria-label="Add to hub"
        title="Add to hub">{@html AddTo}</span
      > button on a script page and select your script to add it to the hub.
    </p></a
  >
  {#each hubs as hub (hub.id)}
    <a href="/hub/{hub.id}"
      ><h1>{hub.name}</h1>
      <p>It has {hub.scripts.length} scripts.</p></a
    >
  {/each}
</section>

<style>
  section {
    column-count: auto;
    column-width: 250px;
    column-gap: 1em;
  }
  p {
    fill: currentColor;
    white-space: pre-wrap;
  }
  section a {
    box-sizing: border-box;
    display: inline-block;
    word-wrap: break-word;
    width: 100%;
    margin: 0 0 1em;
    padding: 1rem;
    background: var(--fds-solid-background-secondary);
    border-radius: 1em;
    color: var(--fds-text-primary);
  }
</style>
