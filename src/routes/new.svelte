<script context="module">
  import { text } from 'svelte/internal'

  export const router = true
  export const prerender = true
</script>

<h1>New Script</h1>
<p>You will be able to edit these after your script is created.</p>
<form>
  <input type="text" name="name" placeholder="Script name" required />
  <textarea placeholder="Source" value="" maxlength="10000000" required />
  <small>The source of your script.</small>
  <br />
  <textarea placeholder="Description" value="" maxlength="10000" />
  <small>Max 10k characters.</small>
  <br />
  <small
    >Place IDs (NOT GAME IDS) seperated by commas.<br />Get a place ID from the
    game's URL, or <code>game.PlaceId</code>.<br />Keep this empty if your
    script supports all games.</small
  >
  <input type="text" placeholder="Supported games" />
  <input type="submit" value="Upload" />
</form>

<style>
  input:not([type='checkbox']) {
    display: block;
  }
  textarea {
    border: 0;
  }
</style>
