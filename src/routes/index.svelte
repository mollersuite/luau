<script context="module">
  export const router = true
  export const prerender = true
</script>

<svelte:head>
  <meta name="description" content="Yet another script sharing website" />
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://luau.ml",
      "potentialAction": [{
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://luau.ml/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }]
    }
  </script>
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
<section class="mollermethod">
  <h1>A brand new <b>method</b>, coming soon.</h1>
  <p>
    mollermethod - the sequel to Luau Hub, will be miles ahead of our
    competitors, including the entire featureset of all Domain Hubs.
  </p>
  <h2>Compare</h2>
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Domain Hub X</th>
        <th>mollermethod</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>No keys</th>
        <th>Premium</th>
        <th>✔</th>
      </tr>
      <tr>
        <th>Themes & Wallpapers</th>
        <th>Premium</th>
        <th>✔</th>
      </tr>
      <tr>
        <th>Join codes</th>
        <th>Premium</th>
        <th>✔</th>
      </tr>
      <tr>
        <th>Cloud Scripts</th>
        <th>✖</th>
        <th>✔</th>
      </tr>
      <tr>
        <th>Anti-kick</th>
        <th>✔</th>
        <th>✔</th>
      </tr>
      <tr>
        <th>Favorite pet</th>
        <th>cta ✖</th>
        <th>bragle ✔</th>
      </tr>
      <tr>
        <th>Developers</th>
        <th>&GreaterEqual;5</th>
        <th>2</th>
      </tr>
    </tbody>
  </table>
</section>

<style>
  table {
    border: solid 1px white;
    border-radius: 5px;
  }
  tbody tr:nth-child(odd) {
    background: rgba(0, 0, 0, 0.5);
  }
  .mollermethod p {
    max-width: 500px;
  }
  .mollermethod {
    background: url(mollermethod.png);
    background-position: 700px 0;
    background-repeat: no-repeat;
    height: 700px;
  }
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
