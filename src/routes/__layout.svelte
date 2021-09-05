<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page: { path } }) {
    return {
      props: {
        path
      }
    }
  }
</script>

<script>
  import { user, supabase } from '$lib/supabase.js'
  import '../app.css'
  import { fly } from 'svelte/transition'

  export let path
  /** @type {number} */
  let height
  /** @type {{name: string, goto: string | (() => unknown), icon: string, rel?: string}[]} */
  $: links = [
    {
      name: 'Home',
      goto: '/',
      icon: 'house'
    },
    {
      name: 'Scripts',
      goto: '/scripts/0',
      icon: 'code'
    },
    {
      name: 'Search',
      goto: '/search',
      icon: 'search',
      rel: 'search'
    },
    $user && {
      name: 'Submit',
      goto: '/new',
      icon: 'add'
    },
    $user && {
      name: 'Hubs',
      goto: '/hubs',
      icon: 'list'
    },
    {
      name: 'Discord',
      goto: 'https://discord.gg/HAw7Zf8GF5',
      icon: 'forum'
    },
    $user
      ? {
          name: 'Logout',
          goto: supabase.auth.signOut.bind(supabase.auth),
          icon: 'logout'
        }
      : {
          name: 'Login',
          goto: () =>
            supabase.auth.signIn({
              provider: 'discord'
            }),
          icon: 'login'
        }
  ].filter(Boolean)

  /** @type {boolean} */
  let hovering = true
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
  <meta name="theme-color" value="#F7D7C4" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Luau" />
</svelte:head>

<main>
  <slot />
</main>

<footer
  on:mouseenter={() => (hovering = true)}
  on:mouseleave={() => (hovering = false)}
>
  {#if hovering}
    <nav
      in:fly={{ duration: 300, y: height, opacity: 1 }}
      out:fly={{
        duration: 300,
        delay: (links.length + 1) * 100,
        opacity: 1,
        y: 100
      }}
      bind:offsetHeight={height}
    >
      {#each links as link, i}
        {#if typeof link.goto === 'string'}
          <a
            sveltekit:prefetch
            rel={link.rel}
            class:selected={link.goto === path}
            href={link.goto}
            aria-label={link.name}
            in:fly={{
              duration: 300,
              delay: (i + 2) * 100,
              opacity: 1,
              y: 100
            }}
            out:fly={{
              duration: 300,
              delay: (i + 1) * 100,
              opacity: 1,
              y: 100
            }}
          >
            {#if link.icon.startsWith('https://') || link.icon.startsWith('data:')}
              <img src={link.icon} alt={link.name} height="24" width="24" />
            {:else}
              <span class="material-icons">
                {link.icon}
              </span>
            {/if}
          </a>
        {:else}
          <button
            on:click={link.goto}
            aria-label={link.name}
            in:fly={{
              duration: 300,
              delay: (i + 2) * 100,
              opacity: 1,
              y: 100
            }}
            out:fly={{
              duration: 300,
              delay: (i + 1) * 100,
              opacity: 1,
              y: 100
            }}
          >
            {#if link.icon.startsWith('https://') || link.icon.startsWith('data:')}
              <img src={link.icon} alt={link.name} height="24" width="24" />
            {:else}
              <span class="material-icons">
                {link.icon}
              </span>
            {/if}
          </button>
        {/if}
      {/each}
    </nav>
  {/if}
</footer>

<style>
  img {
    border-radius: 50%;
    background: #36393f;
  }
  footer {
    min-width: 50vw;
    max-width: 100vw;
    left: 50%;
    transform: translate(-50%);
    overflow: hidden;
    position: fixed;
    bottom: 0;
    min-height: 100px;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1ch;
    flex-direction: row;
  }

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1ch;
    overflow-x: auto;
    overflow-y: hidden;
    flex-direction: row;
    top: 0;
    min-width: 50vw;
    max-width: 100vw;
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    color: white;
    min-height: 100px;
    text-align: center;
    background: darkslategray;
  }

  a,
  button {
    cursor: default;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: relative;
    background: none;
    border: none;
    color: white;
    padding: 1em;
    border-radius: 1em;
    transition: background 0.3s, gap 0.3s;
  }
  a:focus,
  button:focus {
    border: solid 1px white;
  }
  a:hover,
  button:hover {
    gap: 1ch;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.3);
  }

  a::after,
  button::after {
    font-family: 'moller', 'Segoe UI', sans-serif;
    content: attr(aria-label);
    transition: font-size 0.3s;
    font-size: 0;
    margin: 0;
    padding: 0;
  }

  a:hover::after,
  button:hover::after {
    font-size: small;
  }

  a.selected {
    border: solid 1px gray;
  }
  a:active,
  button:active {
    background: rgba(255, 255, 255, 0.7);
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
