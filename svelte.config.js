// import workers from '@sveltejs/adapter-cloudflare-workers'
import vercel from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: vercel(),
    files: {
      lib: 'lib',
      routes: 'routes',
      hooks: 'hooks',
      template: 'app.html'
    }
  }
}
export default config
