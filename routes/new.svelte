<script context="module">
  export const router = true
  export const prerender = true
</script>

<script>
  import { browser } from '$app/env'
  import { goto } from '$app/navigation'
  import { TextBox, Button } from 'fluent-svelte'
  import { supabase, user } from '$lib/supabase'
  $: browser &&
    !$user &&
    goto('/', {
      replaceState: true
    })

  let source = ''
  let title = ''
  let description = ''
  let games = ''

  async function submit(e) {
    const {
      body: [{ id }]
    } = await supabase
      .from('scripts')
      .insert({
        name: title,
        source,
        games: games ? games.split(',') : null,
        description,
        user_id: $user.id
      })
      .throwOnError()
    goto(`/script/${id}`)
  }
</script>

<svelte:head>
  <title>New - Luau</title>
</svelte:head>
<h1>New Script</h1>
<p>You will be able to edit these after your script is created.</p>
<form on:submit|preventDefault={submit}>
  <TextBox name="name" required placeholder="Script name" bind:value={title} />
  <textarea
    placeholder="-- Source"
    bind:value={source}
    name="source"
    maxlength="10000000"
    required
  />
  <small>The source of your script.</small>
  <br />
  <textarea
    bind:value={description}
    placeholder="Description"
    name="description"
    maxlength="10000"
  />
  <br />
  <small
    >Place IDs (NOT GAME IDS) seperated by commas.<br />Get a place ID from the
    game's URL, or <code>game.PlaceId</code>.<br />Keep this empty if your
    script supports all games.</small
  >
  <TextBox
    name="games"
    placeholder="Supported games"
    bind:value={games}
  />
  <Button type="submit">Upload</Button>
  <Checkbox>Hidden</Checkbox>
</form>

<style>
  textarea {
    border: 0;
  }
</style>
