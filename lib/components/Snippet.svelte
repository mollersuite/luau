<script>
  import CodeButton from './CodeButton.svelte'
  import { browser } from '$app/env'
  import Copy from '@fluentui/svg-icons/icons/copy_16_regular.svg?raw'

  export let code = ''
</script>

<pre>
  {code}
  {#if browser}
  <CodeButton on:click={() => navigator.clipboard.writeText(code)}>
    {@html Copy}
  </CodeButton>
  {/if}
</pre>
