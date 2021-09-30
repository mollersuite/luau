<script>
  export const label = 'Copy'
</script>
<button class="material-icons" aria-label={label} on:click><slot /></button>
<style>
  button {
    background: none;
    color: white;
    float: right;
    border: 0;
    cursor: pointer;
    transition: background 0.3s;
    padding: 5px;
    border-radius: 8px;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  button:active {
    background: rgba(255, 255, 255, 0.5);
  }
  button:focus {
    border: solid 1px white;
  }
</style>
