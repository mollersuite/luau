<script>
  import { scripts } from './script/_scripts'
</script>

<svelte:head>
  <title>Scripts</title>
</svelte:head>

{#each Object.entries(scripts) as [id, script]}
  <a href={`/script/${id}`}>
    <article>
      <h2>{script.name}</h2>
      <h3>{script.description}</h3>
    </article>
  </a>
{/each}

<style>
  a {
    color: var(--heading-color);
  }
  a:hover {
    text-decoration: none;
  }
</style>
