<script context="module">
  export const router = true
  export const prerender = true
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Yet another script sharing website" />
</svelte:head>

<section>
  <h1>📜 Luau.ml</h1>

  <h2>Yet another script sharing website.</h2>

  by Jack & Charlie
</section>
<!-- <section>
  <h1>Introducing <a sveltekit:prefetch href="hubs">Hubs</a></h1>
  <p>The world's easiest way to make a script hub.</p>
  <em>Note: You need to be signed in</em>
</section> -->
<style>
  strong {
    background: #f0f0f0;
    color: #333;
    padding: 0.5em;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  h1 {
    width: 100%;
  }
</style>
