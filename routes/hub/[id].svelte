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
  import { Button } from 'fluent-svelte'
  import { goto } from '$app/navigation'
  import Snippet from '$lib/Snippet.svelte'

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
  <h1 class="big">404</h1>
  <pre>Hub not found.</pre>
{/if}

<style>
  .icon {
    font-family: 'icon';
    padding-right: 1ch;
  }
  .script {
    display: inline-block;
  }
  .big {
    pointer-events: none;
    user-select: none;
    z-index: -1;
    font-size: 30vw;
    position: absolute;
    top: -15vw;
    left: -5vw;

    background: var(--accent-color);
    background: -webkit-linear-gradient(to right, black, var(--accent-color));
    background: linear-gradient(to right, black, var(--accent-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
</style>
