<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ url }) {
    return {
      props: {
        path: url.pathname
      }
    }
  }
</script>

<script>
  import { user, supabase } from '$lib/supabase.js'
  import Header from '$lib/components/Header.svelte'
  import '$lib/app.css'
  export let path = ''
  import { Home, Code, Add, List, ChatBubbles, AddFriend } from '$lib/fluent'
  /** @type {{name: string, goto: string | (() => unknown), icon: string}[]} */
  $: links = [
    {
      name: 'Home',
      goto: '/',
      icon: Home
    },
    {
      name: 'Scripts',
      goto: '/script/p_0',
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
            redirectTo: location.origin
          }
        ),
      icon: AddFriend
    }
  ].filter(Boolean)
</script>

<svelte:head>
  <title>{path} - Luau.ml</title>
</svelte:head>
<!-- for warnings -->
<!-- <strong>once again, scripts are broken</strong> -->
<Header {links} {path} />
<main id="main">
  <slot />
</main>

<style>
  /* strong {
    width: 100vw;
    text-align: center;
    background: var(--fds-system-background-caution);
    color: var(--fds-system-caution);
    padding: 1em;
    border-bottom-left-radius: 1em;
    box-sizing: border-box;
    border-bottom-right-radius: 1em;
  } */

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
</style>
