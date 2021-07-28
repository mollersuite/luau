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
  import { createClient } from '@supabase/supabase-js'
  import '../app.css'
  import { fly } from 'svelte/transition'
  import { writable } from 'svelte/store'
  import { browser } from '$app/env'

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  // @ts-ignore
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const user = writable(supabase.auth.user())
  supabase.auth.onAuthStateChange((_, { user: newuser }) => {
    user.set(newuser)
  })
  export let path
  /** @type {number} */
  let height
  /** @type {{name: string, goto: string | (() => unknown), icon: string}[]} */
  $: links = [
    {
      name: 'Home',
      goto: '/',
      icon: 'house'
    },
    {
      name: 'Scripts',
      goto: '/scripts/1',
      icon: 'code'
    },
    {
      name: 'Submit',
      goto: '/new',
      icon: 'add'
    },
    !$user
      ? {
          name: 'Login',
          goto: () => {
            supabase.auth.signIn({
              provider: 'discord'
            })
          },
          icon: 'login'
        }
      : {
          name: 'Logout',
          goto: () => {
            supabase.auth.signOut()
          },
          icon: 'logout'
        }
  ]

  /** @type {boolean} */
  let hovering = true

  async function test() {
    console.log($user)
  }
  $: user && browser && test()
</script>

<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
/>
<footer
  on:mouseenter={() => (hovering = true)}
  on:mouseleave={() => (hovering = false)}
>
  {#if hovering}
    <nav
      class="taskbar"
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

<main>
  <slot />
</main>

<style>
  img {
    border-radius: 50%;
  }
  footer {
    width: 100vw;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    min-height: 100px;
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1ch;
    flex-direction: row;
  }

  .taskbar {
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

  @media (prefers-color-scheme: light) {
    .taskbar {
      background: white;
    }
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

  .selected {
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
