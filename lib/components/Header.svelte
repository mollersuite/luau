<script>
  import EaseOfAccess from '@fluentui/svg-icons/icons/accessibility_16_regular.svg?raw'
  export let path
  /** @type {{name: string, goto: string | (() => unknown), icon: string}[]} */
  export let links
</script>

<header>
  <a class="skip-to-content-link" href="#main">
    {@html EaseOfAccess}
    <b>Skip to content</b>
  </a>
  <slot />
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
  header :global(a),
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

  header :global(a b),
  header button b {
    transition: font-size 0.3s;
    font-size: 0;
  }
  header :global(a:hover b),
  button:hover b,
  header :global(a:focus-visible b),
  button:focus-visible b {
    font-size: small;
  }

  header :global(a:hover),
  button:hover,
  header :global(a:focus-visible),
  button:focus-visible {
    outline: 0;
    gap: 1ch;
    text-decoration: none;
    background: rgba(255, 255, 255, 0.3);
  }

  header :global(a:focus),
  button:focus {
    border: solid 1px var(--fds-text-primary);
  }
  header :global(a.selected) {
    border: solid 1px gray;
  }
  header :global(a:active),
  button:active {
    background: rgba(255, 255, 255, 0.7);
  }

  @media (prefers-color-scheme: light) {
    header {
      background: rgba(255, 255, 255, 0.5);
    }

    header :global(a:hover),
    button:hover,
    header :global(a:focus-visible),
    button:focus-visible {
      background: rgba(0, 0, 0, 0.1);
    }
    header :global(a:active),
    button:active {
      background: rgba(0, 0, 0, 0.3);
    }
  }
  .skip-to-content-link:not(:focus) {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  @media (max-width: 659px) {
    header {
      justify-content: center;
    }
    header a,
    button {
      padding: 5px;
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
