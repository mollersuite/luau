<script context="module">
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
<section>
  <h1>the lego hacking one-stop shop</h1>
  <p>so basically its cloud scripts</p>
  <p>(the thing shlex and showerhead have attempted to make but failed)</p>
</section>
<section>
  <h1><span class="new">NEW</span> Hubs</h1>
  <p>You can now create script hubs, without writing a line of code.</p>
  <p>
    Our hubs are like playlists; click "Add to hub" on a script's page to start.
  </p>
  {#if !$user}
    <Button variant="accent" disabled>Create a hub (login first)</Button>
  {:else}
    <Button href="/hub" variant="accent">Create a hub</Button>
  {/if}
</section>
<section>
  <h1>Roadmap</h1>
  <ul>
    <li>proper display names</li>
    <li>after display names, verified badge</li>
    <li>
      changelogs that automatically detect the last version you used and shows
      you whats been added
    </li>
    <li>
      have any ideas? <a href="https://discord.gg/HAw7Zf8GF5"
        >join the discord.</a
      >
    </li>
  </ul>
</section>
<section>
  <h1 class="mo">Made of Mollybdenum</h1>
  <p>three people making dumb lego hacking tools</p>
  <nav>
    <article id="luau">
      <h1>Luau.ml</h1>
      <em>You're on it right now.</em>
    </article>
    <article id="mollermethod">
      <h1>mollermethod</h1>
      <em>The script hub that makes sense.</em><sup>upcoming</sup>
    </article>
    <article id="trollsmile">
      <h1>trollsmile</h1>
      <em>The command invoker.</em><sup>upcoming</sup>
    </article>
  </nav>
</section>

<style>
  .mo {
    color: #ff4539;
    font-family: 'Segoe UI Variable Display', 'Segoe UI Variable', 'moller',
      'Segoe UI';
    font-weight: normal;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1ch;
    flex-direction: row;
  }
  article {
    flex-grow: 1;
    color: white;
    display: inline-block;
    background: #ff4539;
    border-radius: 5px;
    padding: 0.5em;
  }
  article h1 {
    margin-top: 0;
  }
  #trollsmile {
    background: white;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(https://cdn.discordapp.com/emojis/817185536661389322.png?size=1024);
    background-size: 100%;
    background-position: center;
  }
  #luau {
    background-color: black;
    background-image: url(/icon.svg);
    background-size: 20%;
    background-position: center right;
    background-repeat: no-repeat;
  }
  #mollermethod {
    background: white;
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(https://mthd.ml/icon.png);
    background-size: 100%;
    background-position: center;
  }
  .new {
    font-size: 50%;
    border-radius: 1em;
    padding: 0.3rem;
    user-select: none;
    color: var(--fds-text-on-accent-primary);
    background: var(--fds-accent-default);
  }
</style>
