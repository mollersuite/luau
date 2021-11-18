import cf from '@sveltejs/adapter-cloudflare'

let num = 0
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: cf(),
    files: {
      lib: 'lib',
      routes: 'routes',
      hooks: 'hooks',
      template: 'app.html'
    }
  }
}
export default config
