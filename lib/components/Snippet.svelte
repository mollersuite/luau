<script>
  import CodeButton from './CodeButton.svelte'
  import { Copy } from '../fluent'
  import { browser } from '$app/env'

  export let code = ''
</script>

<pre>
  {code}
  {#if browser}
  <CodeButton on:click={() => navigator.clipboard.writeText(code)}>
    {Copy}
  </CodeButton>
  {/if}
</pre>
