<script context="module">
  export const router = true
  export const prerender = true
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, session }) {
    return {
      props: {
        hub: `loadstring(game:HttpGet("https://${page.host}/gui.lua"), 'Luau')()`
      }
    }
  }
</script>

<script>
  import CodeButton from '$lib/CodeButton.svelte'
  export let hub = '-- Soon™'
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Yet another script sharing website" />
</svelte:head>

<section>
  <h1>Luau.ml</h1>

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
<section>
  <h1>Introducing the Luau Hub</h1>
  <p>The fastest way to use Luau.ml</p>
  <code
    >{hub}<CodeButton on:click={() => navigator.clipboard.writeText(hub)}
      >content_copy</CodeButton
    ></code
  >
</section>

<style>
  code {
    white-space: pre-wrap;
  }

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
    display: grid;
    place-content: center;
    gap: 1ch;
    width: 100%;
    height: 100vh;
  }

  h1 {
    width: 100%;
  }
</style>
