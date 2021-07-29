<script context="module">
  export const router = true
  export const prerender = true
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, session }) {
    if (session.exploit) {
      return {
        status: 301,
        redirect: `/gui.lua`
      }
    }

    return {
      props: {
        hub: `getgenv().request = request or (http and http.request) or (syn and syn.request) or (lib and lib.request)
loadstring(request({
  Url = "https://${page.host}",
  Method = 'GET'
}).Body, "Luau")()`
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100vh;
  }

  h1 {
    width: 100%;
  }
</style>
