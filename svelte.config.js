// import workers from '@sveltejs/adapter-cloudflare-workers'
import auto from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: auto(),
    csp: {
      directives: {
        'script-src': ['self']
      }
    },
    files: {
      lib: 'lib',
      routes: 'routes',
      hooks: 'hooks',
      template: 'app.html'
    }
  }
}
export default config
