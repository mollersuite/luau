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
  import {
    Home,
    Code,
    Search,
    Add,
    List,
    ChatBubbles,
    AddFriend
  } from '$lib/fluent'
  export let path
  /** @type {number} */
  let height
  /** @type {{name: string, goto: string | (() => unknown), icon: string, rel?: string}[]} */
  $: links = [
    {
      name: 'Home',
      goto: '/',
      icon: Home
    },
    {
      name: 'Scripts',
      goto: '/script/0',
      icon: Code
    },
    {
      name: 'Search',
      goto: '/search',
      icon: Search,
      rel: 'search'
    },
    $user && {
      name: 'Submit',
      goto: '/new',
      icon: Add
    },
    // $user && {
    //   name: 'Hubs',
    //   goto: '/hubs',
    //   icon: List
    // },
    {
      name: 'Discord',
      goto: 'https://discord.gg/HAw7Zf8GF5',
      icon: ChatBubbles
    },
    !$user && {
      name: 'Login',
      goto: () =>
        supabase.auth.signIn({
          provider: 'discord'
        }),
      icon: AddFriend
    }
  ].filter(Boolean)
</script>

<svelte:head>
  <title>Luau.ml</title>
</svelte:head>
<a class="skip-to-content-link" href="#main">Skip to content</a>
<header>
  <h1>📜 Luau.ml</h1>
  {#each links as link, i}
    {#if typeof link.goto === 'string'}
      <a
        sveltekit:prefetch
        rel={link.rel}
        class:selected={link.goto === path}
        href={link.goto}
        title={link.name}
        data-icon={link.icon}
      >
        {link.name}
      </a>
    {:else}
      <button on:click={link.goto} data-icon={link.icon} title={link.name}>
        {link.name}
      </button>
    {/if}
  {/each}
</header>
<main id="main">
  <slot />
</main>

<style>
  header {
    width: 100%;
    background: black;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1ch;
    flex-direction: row;
  }
  header h1 {
    font-size: small;
  }
  a::before,
  button::before {
    content: attr(data-icon);
    font-family: 'icon';
    font-size: 16px;
  }
  header a,
  button {
    padding: 16px;
    font-family: 'moller', 'Segoe UI', sans-serif;
    font-size: 0;
    margin: 0;
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
    border-radius: 16px;
    transition: background 0.3s, gap 0.3s, font-size 0.3s;
  }

  header a:hover,
  button:hover,
  header a:focus-visible,
  button:focus-visible {
    font-size: small;
    outline: 0;
    gap: 1ch;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.3);
  }
  header a:focus,
  button:focus {
    border: solid 1px white;
  }
  a.selected {
    border: solid 1px gray;
  }
  header a:active,
  button:active {
    background: rgba(255, 255, 255, 0.7);
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    /* max-width: 1024px; */
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  .skip-to-content-link {
    background: #e77e23;
    height: 30px;
    left: 50%;
    padding: 8px;
    position: absolute;
    transform: translateY(-100%);
    transition: transform 0.3s;
  }

  .skip-to-content-link:focus {
    transform: translateY(0%);
  }

  @media (max-width: 500px) {
    header h1 {
      display: none;
    }
    header {
      justify-content: center;
    }
    header a,
    button {
      padding: 5px;
    }
    header a:hover,
    button:hover {
      font-size: 0;
    }
  }
</style>
