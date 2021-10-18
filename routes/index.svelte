<script context="module">
  import ld from '$lib/ld'
  export const router = false
  export const prerender = true
  export const hydrate = false
  const phrases = [
    'The smartest script hub',
    'The future of exploiting',
    'Your favorite script hub',
    'Your next script hub',
    'A hub superior to DomainX'
  ]
</script>

<svelte:head>
  <meta name="description" content="Yet another script sharing website" />
  {@html ld({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://luau.ml',
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://luau.ml/search?q={search_term_string}'
        },
        'query-input': 'required name=search_term_string'
      }
    ]
  })}
</svelte:head>
<h1>📜 Luau.ml</h1>
<article>
  <h1>
    It's like the Cloud Scripts in <cite
      title="Yes, Script-Ware® is trademarked. See UK00003615817"
      >Script<span class="dash">-</span>Ware®</cite
    >, but
  </h1>
  <ul>
    <li>Works on all exploits</li>
    <li>No private scripts yet</li>
    <li>Script hub creator soon</li>
  </ul>
</article>

<!-- <section>
  <h1>Introducing <a sveltekit:prefetch href="hubs">Hubs</a></h1>
  <p>The world's easiest way to make a script hub.</p>
  <em>Note: You need to be signed in</em>
</section> -->
<article class="mollermethod">
  <h1>
    {phrases[~~(Math.random() * phrases.length)]}, in alpha.
    <sup>
      <img src="/mollermethod.png" alt="mollermethod" height="16" />
    </sup>
  </h1>
  <p>note: mollermethod will have actual scripts on launch</p>
  <p><del>not rn lol</del>i could add an autofarm right now</p>
  <code>
    loadstring (game:HttpGet 'https://mthd.ml') {'{}'}
  </code>
</article>

<style>
  .mollermethod code {
    width: max-content;
    background: var(--accent-color);
    color: black;
    border-radius: 5px;
  }
  .mollermethod {
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
    /* flex-direction: row; */
    /* width: max-content; */
    padding-left: 1em;
    padding-right: 1em;
    background-color: black;
    border-radius: 1em;
  }
  .mollermethod h1 {
    /* display: inline; */
    width: max-content;
  }
  .dash {
    color: rgb(66, 155, 251);
  }
  cite {
    font-family: Poppins, moller, sans-serif;
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
