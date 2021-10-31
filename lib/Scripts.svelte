<script>
  import { blur } from 'svelte/transition'
  /** @type {{name: string, id: string, description: string}[]}*/
  export let scripts = []
</script>

<section>
  {#each scripts as script, i}
    <a
      sveltekit:prefetch
      href="/script/{script.id}"
      in:blur={{ delay: (i / scripts.length) * 500, amount: 5 }}
    >
      <h1>{script.name}</h1>
      <p>{script.description}</p>
    </a>
  {:else}
    <a sveltekit:prefetch in:blur={{ amount: 5 }} href="/new">
      <h1><slot>You've reached the end!</slot></h1>
      <p>Maybe add your own script?</p>
    </a>
  {/each}
</section>

<style>
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
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1em;
    color: var(--heading-color);
  }
  a:hover {
    text-decoration: none;
  }
</style>
