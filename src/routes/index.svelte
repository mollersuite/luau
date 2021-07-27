<script context="module">
  export const router = true
  export const prerender = true
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section>
  <h1>Introducing Luau.ml</h1>

  <h2>Yet another script sharing website.</h2>
  <div>
    <img
      src="https://5079.ml/5079mlicon.svg"
      height="100"
      alt="mollersuite logo"
    />
    moller software <small>(Jack & Charlie)</small>
  </div>
</section>

<style>
  small {
    font-size: 11px;
  }
  div {
    font-family: 'moller', 'Inter Black', 'inter';
    font-size: 2em;
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 1ch;
    flex-direction: row;
  }
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
