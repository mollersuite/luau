<script context="module">
  import ld from '$lib/ld'
  export const prerender = true
</script>

<script>
  import { goto } from '$app/navigation'
  import { TextBox } from 'fluent-svelte'

  let value = ''
  const search = () =>
    goto('/search?q=' + value, {
      keepfocus: true
    })
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
  <h1 class="center">
    The scripting platform.<sup>
      <svg
        viewBox="0 0 15 15"
        width="15"
        fill="#ff4539"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m 12,11 v 3 h 3 v -3 z" />
        <path d="m 8,11 v 3 h 3 v -3 z" />
        <path d="m 0,11 v 1.5 L 1.5,14 H 7 v -3 z" />
        <path d="m 9.6230469,7 v 3 H 12.623047 V 7 Z" />
        <path d="M 3.5,0 2,1.5 V 3 10 H 7 9 V 6 h 3 V 3 h 2 V 1.5 L 12.5,0 Z" />
      </svg></sup
    >
  </h1>
  <form action="/search" on:submit|preventDefault={search}>
    <TextBox
      required
      name="q"
      style="font-size: 1.5em;height:2em;"
      autofocus
      placeholder="Search for a script"
      type="search"
      bind:value
      on:search={search}
    />
  </form>
</section>
<section>
  <h1>Roadmap</h1>
  <ul>
    <li>
      add captcha to submit script endpoint<sup
        >mau could spam my db otherwise</sup
      >
    </li>
    <li>display names and pfps from Discord</li>
    <li>thumbnails</li>
    <li>
      likes and dislikes <sup
        >hard to do securely<sup
          >a threat actor could figure out who liked/disliked their script<sup
            >bad because they'd blacklist people who dont like their script</sup
          ></sup
        ></sup
      >
    </li>
    <li>
      reporting (possibly using serverless discord interactions so I can just
      click a Delete button)
    </li>
    <li>
      have any ideas? <a href="https://discord.gg/HAw7Zf8GF5"
        >join the discord.</a
      >
    </li>
  </ul>
</section>
<section>
  <h1 class="mo">Luau.ml is made of Mollybdenum</h1>
  <p>three* people making dumb lego hacking tools</p>
  <nav>
    <article id="luau">
      <h1>Luau.ml</h1>
      <em>You're on it right now.</em>
    </article>
    <article id="mollermethod">
      <h1>mollermethod</h1>
      <em>We made a script hub.</em><sup>upcoming</sup>
    </article>
    <article id="trollsmile">
      <h1>trollsmile</h1>
      <em>The command invoker.</em><sup>upcoming</sup>
    </article>
  </nav>
  <small
    >*trollsmile by Jack & Auxnos; mollermethod by Jack, Glitchy, and Auxnos;
    Luau.ml by Jack</small
  >
</section>

<style>
  .center {
    text-align: center;
  }
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
  section nav > * {
    flex-grow: 1;
    text-decoration: none;
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
      url(/trollsmile.png);
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
      url(/mthd.png);
    background-size: 100%;
    background-position: center;
  }
</style>
