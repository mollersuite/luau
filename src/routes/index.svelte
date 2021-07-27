<script context="module">
  export const router = true
  export const prerender = true
</script>

<script>
  import Counter from '$lib/Counter.svelte'
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <h1>Introducing Luau.ml</h1>

  <h2>
    Yet another script sharing website.
  </h2>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }

  h1 {
    width: 100%;
  }
</style>
