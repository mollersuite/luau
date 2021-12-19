import pages from '@sveltejs/adapter-cloudflare'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: pages(),
    files: {
      lib: 'lib',
      routes: 'routes',
      hooks: 'hooks',
      template: 'app.html'
    },
    vite: {
      optimizeDeps: {
        include: ['bezier-easing']
      }
    }
  }
}
export default config
