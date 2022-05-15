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
  section nav > a {
    display: contents;
  }
  section nav article {
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
