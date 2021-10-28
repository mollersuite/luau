<script>
  import { browser } from '$app/env'
  import { goto } from '$app/navigation'
  import { supabase, user } from '$lib/supabase'

  $: browser && !$user && goto('/', { replaceState: true })
  let name = ''
  async function submit() {
    const {
      body: [{ id }]
    } = await supabase.from('hubs').insert({
      scripts: [],
      name,
      user_id: $user.id
    }).throwOnError()
    goto(`/hub/${id}`)
  }
</script>

<h1>Create a hub</h1>
<form on:submit|preventDefault={submit}>
  <input
    placeholder="Name"
    type="text"
    name="name"
    required
    bind:value={name}
  />
  <button type="submit">Create</button>
</form>
