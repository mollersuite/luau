<script>
  import { scripts } from './script/_scripts'
</script>

<svelte:head>
  <title>Scripts</title>
</svelte:head>

<section>
  {#each Object.entries(scripts) as [id, script]}
    <article>
      <a href={`/script/${id}`}>
        <h1>{script.name}</h1>
        <p>{script.description}</p>
      </a>
    </article>
  {/each}
</section>

<style>
  h1 {
    font-size: 1em;
  }
  section {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: masonry;
  }
  article {
    padding: 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1em;
  }
  a {
    color: var(--heading-color);
  }
  a:hover {
    text-decoration: none;
  }
</style>
