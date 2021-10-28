// TODO

import { createClient } from '@supabase/supabase-js'
import dedent from 'dedent'

// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
// @ts-ignore
const key = import.meta.env.VITE_SUPABASE_SERVICE_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, key)

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params: { id }, headers }) {
  // if (!exploit(headers)) {
  //   return {
  //     status: 301,
  //     headers: {
  //       Location: '/hub/' + id
  //     }
  //   }
  // }
  const {
    body: [hub]
  } = await supabase.from('hubs').select('*').match({ id })
  const { body: scripts } = await supabase
    .from('scripts')
    .select('name,games,id')
    .in('id', hub.scripts)
  const games = new Set(scripts.map((a) => a.games)).size
  return {
    body: dedent`
      -- 📜 ${hub.name}, powered by Luau.ml
      -- ${hub.name} has ${
      hub.scripts.length
    } scripts, supporting ${games} games.
      local scripts = game:GetService('HttpService'):JSONDecode(${JSON.stringify(
        JSON.stringify(scripts)
      )})
      local works_here = {}
      for _,v in pairs(scripts) do
        if table.find(v.games, game.PlaceId) or not v.games then
          table.insert(works_here, v)
        end
      end
      
    `
  }
}
