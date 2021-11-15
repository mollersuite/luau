<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page: { path, host } }) {
    return {
      props: {
        path,
        host
      }
    }
  }
</script>

<script>
  import { user, supabase } from '$lib/supabase.js'
  import '$lib/app.css'
  import 'fluent-svelte/theme.css'
  import { TextBox } from 'fluent-svelte'
  import { Home, Code, Add, List, ChatBubbles, AddFriend, EaseOfAccess } from '$lib/fluent'
  import { goto } from '$app/navigation'
  export let path
  export let host = 'Luau.ml'
  /** @type {{name: string, goto: string | (() => unknown), icon: string}[]} */
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
    $user && {
      name: 'Hubs',
      goto: '/hub',
      icon: List
    },
    $user && {
      name: 'Submit',
      goto: '/new',
      icon: Add
    },
    {
      name: 'Discord',
      goto: 'https://discord.gg/HAw7Zf8GF5',
      icon: ChatBubbles
    },
    !$user && {
      name: 'Login',
      goto: () =>
        supabase.auth.signIn(
          {
            provider: 'discord'
          },
          {
            redirectTo: location.origin || 'https://' + host
          }
        ),
      icon: AddFriend
    }
  ].filter(Boolean)
  let value = ''
  const search = () =>
    goto('/search?q=' + value, {
      keepfocus: true
    })
</script>

<svelte:head>
  <title>{host}</title>
</svelte:head>
<!-- for warnings -->
<!-- <strong></strong> -->
<header>
  <h1>📜 {host}</h1>
  <a class="skip-to-content-link" href="#main" data-icon={EaseOfAccess}>Skip to content</a>
  <form action="/search" on:submit|preventDefault={search}>
    <TextBox
      required
      name="q"
      placeholder="Search for a script"
      type="search"
      bind:value
      on:search={search}
    />
  </form>
  {#each links as link}
    {#if typeof link.goto === 'string'}
      <a
        sveltekit:prefetch
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
  /* strong {
    width: 100vw;
    text-align: center;
    background: rgb(64, 32, 16);
    padding: 1em;
    border-bottom-left-radius: 1em;
    box-sizing: border-box;
    border-bottom-right-radius: 1em;
  } */
  header {
    position: sticky;
    top: 0;
    width: 100vw;
    overflow-x: auto;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(50px);
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
    /* padding: 16px; */
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
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
  .skip-to-content-link:not(:focus) {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  @media (max-width: 768px) {
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

  @media (max-width: 425px) {
    /* strong {
      display: none;
    } */
    header :global(input) {
      max-width: 40vw;
    }
    header :global(form button) {
      display: none !important;
    }
  }
  @media (min-width: 1200px) {
    header {
      max-width: 1200px;
      margin: auto;
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
    }
  }
</style>
