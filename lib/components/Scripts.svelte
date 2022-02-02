<script>
  import Copy from '@fluentui/svg-icons/icons/copy_16_regular.svg?raw'
  import { ContextMenu, MenuFlyoutItem } from 'fluent-svelte'
  import { fly } from 'svelte/transition'

  /** @type {{name: string, id: string, description: string}[]}*/
  export let scripts = []
  export let host = 'luau.ml'
  function copy(script) {
    navigator.clipboard.writeText(
      `loadstring(game:HttpGet("${host}/script/${script.id}"), ${JSON.stringify(
        script?.name
      )})()`
    )
  }
</script>

<section>
  <slot />
  {#each scripts ?? [] as script, i}
    <ContextMenu>
      <a
        rel="ugc"
        sveltekit:prefetch
        href="/script/{script?.id || ''}"
        in:fly={{ delay: (i / (scripts?.length | 1)) * 500, y: -50 }}
      >
        <h1>{script.name}</h1>
        <p>{script.description}</p>
      </a>
      <svelte:fragment slot="menu">
        <MenuFlyoutItem on:click={() => copy(script)}>
          {@html Copy}
          Copy</MenuFlyoutItem
        >
      </svelte:fragment>
    </ContextMenu>
  {:else}
    <a sveltekit:prefetch in:fly={{ y: -50 }} href="/new">
      <h1><slot name="notfound">You've reached the end!</slot></h1>
      <p>Maybe add your own script?</p>
    </a>
  {/each}
</section>

<style>
  section {
    fill: currentColor;
  }
  section :global(h1) {
    font-size: 1em;
  }
  section {
    column-count: auto;
    column-width: 250px;
    column-gap: 1em;
  }
  section :global(p) {
    white-space: pre-wrap;
  }
  section :global(a) {
    box-sizing: border-box;
    max-height: 300px;
    overflow-y: auto;
    display: inline-block;
    word-wrap: break-word;
    width: 100%;
    margin: 0 0 1em;
    padding: 1rem;
    background: var(--fds-solid-background-secondary);
    border-radius: 1em;
    color: var(--fds-text-primary);
  }
  section :global(a):hover {
    text-decoration: none;
  }
  @supports (grid-template-rows: masonry) {
    section {
      display: grid;
      column-gap: initial;
      column-count: initial;
      column-width: initial;
      gap: 0 1em;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-template-rows: masonry;
    }
  }
</style>
