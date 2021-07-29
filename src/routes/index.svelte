<script context="module">
  export const router = true
  export const prerender = true
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Yet another script sharing website" />
</svelte:head>

<section>
  <h1>Introducing Luau.ml</h1>

  <h2>Yet another script sharing website.</h2>

  <a href="https://github.com/mollersuite">
    <div>
      part of
      <img
        src="https://5079.ml/5079mlicon.svg"
        height="100"
        alt="mollersuite logo"
      />
      mollersuite
    </div>
  </a>
</section>

<style>
  a {
    color: white;
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
