import workers from '@sveltejs/adapter-cloudflare-workers'
import node from '@sveltejs/adapter-node'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    adapter: node(), //workers(),
    vite: {}
  }
}

export default config
