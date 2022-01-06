<script>
  import { Copy } from '$lib/fluent'
  import {
    ContextMenu,
    MenuFlyoutItem
  } from 'fluent-svelte'

  import { blur } from 'svelte/transition'
  /** @type {{name: string, id: string, description: string, user_id: string}[]}*/
  export let scripts = []
  export let host = 'luau.ml'
  function copy(script) {
    console.log('clicked')
    navigator.clipboard.writeText(
      `loadstring(game:HttpGet("${host}/script/${script.id}"), ${JSON.stringify(
        script?.name
      )})()`
    )
  }
</script>

<section>
  {#each scripts ?? [] as script, i}
    <ContextMenu>
      <a
        sveltekit:prefetch
        href="/script/{script?.id || ''}"
        in:blur={{ delay: (i / (scripts?.length | 1)) * 500, amount: 5 }}
      >
        <h1>{script.name}</h1>
        <p>{script.description}</p>
      </a>
      <svelte:fragment slot="menu">
        <MenuFlyoutItem on:click={() => copy(script)}
          ><span class="icon-button">{Copy}</span>
          Copy</MenuFlyoutItem
        >
      </svelte:fragment>
    </ContextMenu>
  {:else}
    <a sveltekit:prefetch in:blur={{ amount: 5 }} href="/new">
      <h1><slot>You've reached the end!</slot></h1>
      <p>Maybe add your own script?</p>
    </a>
  {/each}
</section>

<style>
  .icon-button {
    margin-right: 0.5em;
  }
  section h1 {
    font-size: 1em;
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
    background: var(--fds-solid-background-secondary);
    border-radius: 1em;
    color: var(--fds-text-primary);
  }
  a:hover {
    text-decoration: none;
  }
</style>
