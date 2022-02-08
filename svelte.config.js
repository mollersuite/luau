// import workers from '@sveltejs/adapter-cloudflare-workers'
import vercel from '@sveltejs/adapter-vercel'
import { searchForWorkspaceRoot } from 'vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: vercel(),
    csp: {
      directives: {
        'default-src': ['self', 'https://zngvnlwfhxhjjqnutxfp.supabase.co']
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
