<script context="module">
  export function load({ error, status }) {
    return {
      props: {
        status,
        message: error
      }
    }
  }
</script>

<script>
  /** @type {number} */
  export let status
  /** @type {Error} */
  export let message
</script>

<h1 class="big">{status}</h1>
<pre>{message.stack}</pre>

<style>
  .big {
    pointer-events: none;
    user-select: none;
    z-index: -1;
    font-size: 30vw;
    position: absolute;
    top: -15vw;
    left: -5vw;

    background: var(--accent-color);
    background: -webkit-linear-gradient(to right, black, var(--accent-color));
    background: linear-gradient(to right, black, var(--accent-color));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
</style>
