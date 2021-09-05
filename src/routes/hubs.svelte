<script context="module">
  export const router = true
</script>

<script>
  import { browser } from '$app/env'
  import { user } from '$lib/supabase'
  $: browser && !$user && (location.href = '/')
</script>
