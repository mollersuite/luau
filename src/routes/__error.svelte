<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        status,
        message: error,
      }
    }
  }
</script>

<script>
  export let status
  export let message
</script>

<h1>{status}</h1>
<h2>That's an error.</h2>
<pre>{message.stack}</pre>
<style>
  h1,h2 {
    text-align: center;
  }
</style>
