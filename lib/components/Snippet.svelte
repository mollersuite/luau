<script>
  import CodeButton from './CodeButton.svelte'
  import { Copy } from '../fluent'
  import { browser } from '$app/env'

  export let code = ''
</script>

<pre>{code}{#if browser}<CodeButton on:click={() => navigator.clipboard.writeText(code)}
    >{Copy}</CodeButton
  >{/if}</pre>

<style>
  @import '@fontsource/jetbrains-mono';
  pre {
    font-size: 13px;
    font-family: 'JetBrains Mono', ui-monospace, 'Input Mono', 'Cascadia Mono',
      'Segoe UI Mono', 'Ubuntu Mono', 'Roboto Mono', Menlo, Monaco, Consolas,
      monospace;
    background-color: var(--fds-solid-background-secondary);
    border-radius: 3px;
    padding: 0.5em;
    overflow-x: auto;
    color: var(--fds-text-primary);
  }
</style>
