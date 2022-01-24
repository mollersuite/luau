<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ url }) {
    return {
      props: {
        path: url?.pathname
      }
    }
  }
</script>

<script>
  import { user, supabase } from '$lib/supabase.js'
  import Header from '$lib/components/Header.svelte'
  import '$lib/app.css'
  export let path = ''

  import Add from '@fluentui/svg-icons/icons/add_20_regular.svg?raw'
  import Code from '@fluentui/svg-icons/icons/code_20_regular.svg?raw'
  import ChatBubbles from '@fluentui/svg-icons/icons/chat_20_regular.svg?raw'
  import AddFriend from '@fluentui/svg-icons/icons/person_add_20_regular.svg?raw'
  import List from '@fluentui/svg-icons/icons/list_20_regular.svg?raw'
  import { InfoBadge } from 'fluent-svelte'

  /** @type {{name: string, goto: string | (() => unknown), icon: string}[]} */
  $: links = [
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
<!-- <strong>seems like SSR is broken, idk how the hell this keeps happening</strong> -->

<Header {links} {path} />
<main id="main">
  <slot />

  {#if import.meta.env.DEV}
    <InfoBadge severity="information"
      >{import.meta.env.MODE} - not final!</InfoBadge
    >
  {/if}
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
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
