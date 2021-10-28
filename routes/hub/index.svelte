<script context="module">
  import { supabase } from '$lib/supabase'
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, session }) {
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
  import { AddTo } from '$lib/fluent'
  import { user } from '$lib/supabase'
  $: browser && !$user && goto('/', { replaceState: true })
  export let hubs
</script>

<h1>Hubs</h1>
<section>
  <a href="/hub/new"
    ><h1>Create a hub</h1>
    <p>
      After creation, just click the <span
        class="icon"
        aria-label="Add to hub"
        title="Add to hub">{AddTo}</span
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
  .icon {
    font-family: 'icon';
  }
  section {
    column-count: auto;
    column-width: 250px;
    column-gap: 1em;
  }
  p {
    white-space: pre-wrap;
  }
  section a {
    box-sizing: border-box;
    display: inline-block;
    word-wrap: break-word;
    width: 100%;
    margin: 0 0 1em;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1em;
    color: var(--heading-color);
  }
</style>
