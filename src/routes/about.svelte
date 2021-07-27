<script context="module">
  export const hydrate = true
  export const router = true
  export const prerender = true
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="content">
  <h1>Luau.ml</h1>

  <h2>The easiest way to share scripts</h2>
  <ol>
    <li>Click the plus</li>
    <li>Paste your script code</li>
    <li>Provide a title and description</li>
    <li>Optionally provide a list of supported games</li>
    <li>Click submit</li>
    <li>You're done!</li>
  </ol>
</div>

<style>
  .content {
    width: 100%;
    max-width: var(--column-width);
    margin: var(--column-margin-top) auto 0 auto;
  }
</style>
