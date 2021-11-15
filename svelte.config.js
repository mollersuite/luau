import workers from '@sveltejs/adapter-cloudflare-workers'

let num = 0
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: workers(),
    vite: {
      
    },
    files: {
      lib: 'lib',
      assets: 'assets',
      routes: 'routes',
      hooks: 'hooks',
      template: 'app.html'
    }
  }
}
export default config
