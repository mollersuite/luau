import exploit from '$lib/exploit'
import game_detector from './_games.client.lua?raw'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_SERVICE_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, key, {
  fetch: fetch.bind(globalThis)
})

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params, request: { headers } }) {
  const { id } = params
  if (!exploit(headers)) {
    return {
      status: 301,
      headers: {
        Location: '/script/' + id
      }
    }
  }

  const [script] =
    (await supabase.from('scripts').select('id,source,games').match({ id }))
      .body || []

  if (!script) {
    return {
      status: 404,
      body: 'error("Script not found.")'
    }
  }

  if (script.games?.length) {
    script.source =
      game_detector.replace('_games', script.games.join(', ')) +
      '\n' +
      script.source
  }
  return {
    body: script.source
  }
}
