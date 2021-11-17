<script context="module">
  import { supabase } from '$lib/supabase'
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, session }) {
    if (session.exploit) {
      return {
        status: 301,
        redirect: `/hub/${page.params.id}.lua`
      }
    }
    const id = page.params.id
    const {
      body: [hub]
    } = await supabase.from('hubs').select('*').match({ id }).throwOnError()
    if (!hub) {
      return {}
    }
    return {
      props: {
        host: page.host,
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
  import { Delete } from '$lib/fluent'
  import { Button, ProgressRing } from 'fluent-svelte'
  import { goto } from '$app/navigation'
  import Snippet from '$lib/components/Snippet.svelte'

  export let hub
  /** @type {{
      id: string,
      name: string
    }[]}*/
  export let scripts
  export let host
  $: code = `loadstring(game:HttpGet("https://${host}/hub/${
    hub?.id
  }"), ${JSON.stringify(hub?.name)})()`
  function del(i) {
    scripts = scripts.filter((_, j) => j !== i)
    supabase
      .from('hubs')
      .update({ scripts: scripts?.map((script) => script.id) })
      .match({ id: hub.id })
      .then(() => {})
  }
</script>

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
          )}><span class="icon">{Delete}</span>Remove</Button
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
          ><span class="icon">{Delete}</span>Remove</Button
        >
      </li>
    {:else}
      <p>Your hub has no scripts. <a href="/script/p_0">Try adding some.</a></p>
    {/each}
  </ul>
{:else}
  <h1>Loading...</h1>
  <ProgressRing />
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
    font-family: 'icon';
    padding-right: 1ch;
  }
  .script {
    display: inline-block;
  }
</style>
