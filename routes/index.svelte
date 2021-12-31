<script context="module">
  import Snippet from '$lib/components/Snippet.svelte'
  import ld from '$lib/ld'
  import { user } from '$lib/supabase'
  import { Button } from 'fluent-svelte'
  export const prerender = true
</script>

<svelte:head>
  <title>Luau.ml</title>
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
  <h1>The Roblox script platform.</h1>
  <p>
    No more linkvertises. No more outdated scripts. Just search, run and
    exploit.
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
<article>
  <h1>Introducing Hubs</h1>
  <p>You can now create script hubs, without writing a line of code.</p>
  <p>Hubs are private; however the loader works for everyone.</p>
  <p>jk i havent made the roblox gui for hubs yet</p>
  {#if !$user}
    <Button variant="accent" disabled>Create a hub (login first)</Button>
  {:else}
    <Button href="/hub" variant="accent">Create a hub</Button>
  {/if}
</article>
<article>
  <h1>Roadmap</h1>
  <ul>
    <li>proper display names</li>
    <li>after display names, verified badge</li>
    <li>
      changelogs that automatically detect the last version you used and shows
      you whats been added
    </li>
    <li>make script hubs, like actually work</li>
    <li>
      have any ideas? <a href="https://discord.gg/HAw7Zf8GF5"
        >join the discord.</a
      >
    </li>
  </ul>
</article>
<footer><small>Luau.ml is <a href="https://twitter.com/mollersuite">made of mollybdenum</a></small></footer>
