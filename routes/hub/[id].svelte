<script context="module">
  import { supabase } from '$lib/supabase'
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params, url }) {
    const id = params.id
    const {
      body: [hub]
    } = await supabase.from('hubs').select('*').match({ id }).throwOnError()
    if (!hub) {
      return {}
    }
    return {
      props: {
        host: url.origin,
        hub,
        scripts: (
          await supabase
            .from('scripts')
            .select('name,id')
            .in('id', [hub.scripts])
            .throwOnError()
        ).body
      }
    }
  }
</script>

<script>
  import Delete from '@fluentui/svg-icons/icons/delete_20_regular.svg?raw'
  import { Button } from 'fluent-svelte'
  import { goto } from '$app/navigation'
  import Snippet from '$lib/components/Snippet.svelte'

  export let hub
  /** @type {{
      id: string,
      name: string
    }[]}*/
  export let scripts
  export let host
  $: code = `loadstring(game:HttpGet("${host}/hub/${
    hub?.id
  }.lua"), ${JSON.stringify(hub?.name)})()`
  function del(i) {
    scripts = scripts.filter((_, j) => j !== i)
    supabase
      .from('hubs')
      .update({ scripts: scripts?.map((script) => script.id) })
      .match({ id: hub.id })
      .then(() => {})
  }
</script>

<svelte:head>
  <title>{hub?.name || 'Loading'}</title>
</svelte:head>
{#if hub}
  <h1>
    {hub.name}
    <Button
      on:click={() =>
        supabase
          .from('hubs')
          .delete()
          .match({ id: hub.id })
          .then(() =>
            goto('/hub', {
              replaceState: true
            })
          )}><span class="icon">{@html Delete}</span>Remove</Button
    >
  </h1>
  <h2>Loader</h2>
  <Snippet {code} />
  <h2>Scripts</h2>
  <ul>
    {#each scripts as script, i}
      <li>
        <a class="script" href="/script/{script.id}">{script.name}</a>
        <Button on:click={() => del(i)}
          ><span class="icon">{@html Delete}</span>Remove</Button
        >
      </li>
    {:else}
      <p>Your hub has no scripts. <a href="/script/p_0">Try adding some.</a></p>
    {/each}
  </ul>
{:else}
  <h1>Loading...</h1>
  <svg viewBox="0 0 15 15" fill="#ff4539">
    <path d="m 12,11 v 3 h 3 v -3 z" class="bottom_right" />
    <path d="m 8,11 v 3 h 3 v -3 z" class="bottom_left" />
    <path d="m 0,11 v 1.5 L 1.5,14 H 7 v -3 z" />
    <path d="m 9.6230469,7 v 3 H 12.623047 V 7 Z" class="top" />
    <path d="M 3.5,0 2,1.5 V 3 10 H 7 9 V 6 h 3 V 3 h 2 V 1.5 L 12.5,0 Z" />
  </svg>

  <noscript>
    <h2>This page requires JavaScript.</h2>
    <p>
      <a href="https://www.enable-javascript.com/">Enable JavaScript</a> to view
      this page.
    </p>
    <p>
      Why? Hubs are supposed to only appear for the person who made them.
      Supabase uses LocalStorage to store auth tokens; this means I cannot do
      server-side auth. It uses Discord for auth anyway, which also requires
      JavaScript.
    </p>
  </noscript>
{/if}

<style>
  .icon {
    padding-right: 1ch;
    fill: currentColor;
  }
  .script {
    display: inline-block;
  }
  svg {
    width: 128px;
    height: 128px;
  }
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .top,
  .bottom_left,
  .bottom_right {
    animation: blink 2s infinite;
  }
  .bottom_left {
    animation-delay: 0.2s;
  }
  .bottom_right {
    animation-delay: 0.4s;
  }
</style>
