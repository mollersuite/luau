<script context="module">
  import { browser } from '$app/env'

  // if the client-side router is already loaded
  // (i.e. we came here from elsewhere in the app), use it
  export const router = browser

  // there is obviously dynamic data here
  export const prerender = true
</script>

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
