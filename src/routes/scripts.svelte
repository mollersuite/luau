<script>
  import { fly } from 'svelte/transition'
  import { scripts } from './script/_scripts'
</script>

<svelte:head>
  <title>Scripts</title>
</svelte:head>
<h1>Scripts</h1>
<section>
  {#each Object.entries(scripts) as [id, script], i}
      <a href={`/script/${id}`} in:fly={{ delay: i * 100, y: 50 }}>
        <h1>{script.name}</h1>
        <p>{script.description}</p>
      </a>
  {/each}
</section>

<style>
  section h1 {
    font-size: 1em;
  }
  section {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: masonry;
  }
  a {
    display: block;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1em;
    color: var(--heading-color);
  }
  a:hover {
    text-decoration: none;
  }
</style>
