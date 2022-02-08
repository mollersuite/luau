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
  import { navigating } from '$app/stores'
  import { user, supabase } from '$lib/supabase.js'
  import Header from '$lib/components/Header.svelte'
  import Button from '$lib/components/Button.svelte'
  import { TextBox } from 'fluent-svelte'
  import { goto } from '$app/navigation'
  import '$lib/app.css'
  export let path = ''

  let value = ''
  const search = () =>
    goto('/search?q=' + value, {
      keepfocus: true
    })

  import Add from '@fluentui/svg-icons/icons/add_20_regular.svg?raw'
  import Code from '@fluentui/svg-icons/icons/code_20_regular.svg?raw'
  import AddFriend from '@fluentui/svg-icons/icons/person_add_20_regular.svg?raw'
  import List from '@fluentui/svg-icons/icons/list_20_regular.svg?raw'

  /** @type {{name: string, goto: string | (() => unknown), icon: string}[]} */
  $: links = [
    {
      name: 'Scripts',
      goto: '/script/p_0',
      icon: Code
    },
    ...($user
      ? [
          {
            name: 'Hubs',
            goto: '/hub',
            icon: List
          },
          {
            name: 'Submit',
            goto: '/new',
            icon: Add
          }
        ]
      : [
          {
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
        ]),
    {
      name: 'Discord',
      goto: 'https://discord.gg/HAw7Zf8GF5',
      icon:
        '<svg role="img" viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>'
    }
  ].filter(Boolean)
</script>

<svelte:head>
  <title>{path} - Luau.ml</title>
</svelte:head>
<!-- for warnings -->
<!-- <strong>seems like SSR is broken, idk how the hell this keeps happening</strong> -->

<Header {links} {path}>
  <Button href="/" label="Luau.ml" selected={'/' === path}>
    <svg viewBox="0 0 15 15" fill="#ff4539" width="15" class:load={$navigating}>
      <path d="m 12,11 v 3 h 3 v -3 z" class="bottom_right" />
      <path d="m 8,11 v 3 h 3 v -3 z" class="bottom_left" />
      <path d="m 0,11 v 1.5 L 1.5,14 H 7 v -3 z" />
      <path d="m 9.6230469,7 v 3 H 12.623047 V 7 Z" class="top" />
      <path d="M 3.5,0 2,1.5 V 3 10 H 7 9 V 6 h 3 V 3 h 2 V 1.5 L 12.5,0 Z" />
    </svg>
  </Button>

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
</Header>

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
    max-width: 1200px;
    margin: 0 auto;
    box-sizing: border-box;
  }
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  .load .top,
  .load .bottom_left,
  .load .bottom_right {
    animation: blink 2s infinite;
  }
  .load .bottom_left {
    animation-delay: 0.2s;
  }
  .load .bottom_right {
    animation-delay: 0.4s;
  }
</style>
