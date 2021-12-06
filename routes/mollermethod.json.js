import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, supabaseAnonKey,{
  fetch: fetch.bind(globalThis)
})

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {
  const game = query.get('game')

  if (!game) {
    return {
      status: 400,
      body: 'game is required'
    }
  }

  if (!parseInt(game)) {
    return {
      status: 400,
      body: 'game must be a placeid'
    }
  }

  const scripts = await supabase
    .from('scripts')
    .select('id,name,description')
    .contains('games', [game])

  return {
    body: scripts.body
  }
}
