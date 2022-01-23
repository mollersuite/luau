<script>
  import { InfoBadge, TextBox } from 'fluent-svelte'
  import EaseOfAccess from '@fluentui/svg-icons/icons/accessibility_16_regular.svg?raw'

  import { goto } from '$app/navigation'
  export let path
  /** @type {{name: string, goto: string | (() => unknown), icon: string}[]} */
  export let links
  let value = ''
  const search = () =>
    goto('/search?q=' + value, {
      keepfocus: true
    })
</script>

<header>
  <h1>
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
    </svg>
    Luau.ml
    {#if import.meta.env.DEV}
      <InfoBadge>dev</InfoBadge>
    {/if}
  </h1>
  <a class="skip-to-content-link" href="#main"
    >{@html EaseOfAccess} Skip to content</a
  >
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
      >
        {@html link.icon}
        <b>{link.name}</b>
      </a>
    {:else}
      <button on:click={link.goto} title={link.name}>
        {@html link.icon}
        <b>{link.name}</b>
      </button>
    {/if}
  {/each}
</header>

<style>
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1ch;
    flex-direction: row;
  }
  header {
    flex-wrap: wrap;
    position: sticky;
    top: 0;
    width: 100vw;
    overflow-x: auto;
    z-index: 2;
    background: rgba(0, 0, 0, 0.5);
    color: var(--fds-text-primary);
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
  header a,
  button {
    /* padding: 16px; */
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    font-family: 'moller', 'Segoe UI', sans-serif;
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
    color: var(--fds-text-primary);
    border-radius: 16px;
    gap: 0;
    fill: currentColor;
    /* border-bottom-right-radius: 16px; */
    /* border-top-left-radius: 16px; */
    transition: background 0.3s, gap 0.3s, font-size 0.3s;
  }

  header a b,
  header button b {
    transition: font-size 0.3s;
    font-size: 0;
  }
  header a:hover b,
  button:hover b,
  header a:focus-visible b,
  button:focus-visible b {
    font-size: small;
  }

  header a:hover,
  button:hover,
  header a:focus-visible,
  button:focus-visible {
    outline: 0;
    gap: 1ch;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.3);
  }

  header a:focus,
  button:focus {
    border: solid 1px var(--fds-text-primary);
  }
  a.selected {
    border: solid 1px gray;
  }
  header a:active,
  button:active {
    background: rgba(255, 255, 255, 0.7);
  }

  @media (prefers-color-scheme: light) {
    header {
      background: rgba(255, 255, 255, 0.5);
    }

    header a:hover,
    button:hover,
    header a:focus-visible,
    button:focus-visible {
      background: rgba(0, 0, 0, 0.1);
    }
    header a:active,
    button:active {
      background: rgba(0, 0, 0, 0.3);
    }
  }
  .skip-to-content-link:not(:focus) {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  @media (max-width: 659px) {
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

  @media (max-width: 380px) {
    header :global(input) {
      width: 90vw !important;
    }
    header :global(form button) {
      display: none !important;
    }
  }

  @media (max-width: 130px) {
    header {
      margin: 0;
      position: static;
      padding: 0;
      flex-direction: column;
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
