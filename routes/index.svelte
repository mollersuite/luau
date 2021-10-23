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
<article>
  <div class="big" aria-hidden="true">📜</div>
  <h1>The Roblox script sharing platform.</h1>
  <p>
    No more running in the wrong game. No more outdated scripts. Just <a
      href="/search"
      sveltekit:prefetch
      >search,
    </a> run and exploit.
  </p>
  <p>
    note: we dont have much scripts here because nobody uses this site lmaoo
  </p>
  <p>
    at least we arent a slow ass wordpress blog like <a
      rel="nofollow"
      href="https://robloxscripts.com">robloxscripts.com</a
    > or has virus popups like rbxscripts.xyz (DO NOT VISIT)
  </p>
</article>

<article class="mollermethod">
  <h1>
    {phrases[~~(Math.random() * phrases.length)]}, nowhere close to complete.
    <sup>
      <img src="/mollermethod.png" alt="mollermethod" height="16" />
    </sup>
  </h1>
  <p>currently trying to fix performance bugs, add more ui  lib inputs, and add scripts</p>
  <code>
    loadstring (game:HttpGet 'https://mthd.ml') {'{}'}
  </code>
</article>
<article>
  <h1>upcoming features</h1>
  <ul>
    <li>proper display names</li>
    <li>
      script hub (maybe call it playlists) creator (how the fuck would i handle
      scripts getting deleted)
    </li>
    <li>after display names, verified badge</li>
    <li>
      changelogs that automatically detect the last version you used and shows
      you whats been added
    </li>
    <li>integration in mollermethod</li>
    <li>
      have any ideas? <a href="https://discord.gg/HAw7Zf8GF5"
        >join the discord.</a
      >
    </li>
  </ul>
</article>

<style>
  .big {
    float: right;
    pointer-events: none;
    user-select: none;
    font-size: 20rem;
    background: url('/stars.webp') fixed right;
    -webkit-background-clip: text;
    background-clip: text;
    color: rgba(0, 0, 0, 0.1);
  }
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
  h1 {
    width: 100%;
  }
  @media (max-width: 1024px) {
    .big {
      display: none;
    }
  }
</style>
