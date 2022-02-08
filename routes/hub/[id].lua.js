// TODO

import { createClient } from '@supabase/supabase-js'
import { encode } from '$lib/lua'
import exploit from '$lib/exploit'
import script from './_hub.lua?raw'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_SERVICE_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, key, {
  fetch: fetch.bind(globalThis)
})

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params: { id }, request: { headers }, url }) {
  if (!exploit(headers)) {
    return {
      status: 301,
      headers: {
        Location: '/hub/' + id
      }
    }
  }
  const {
    body: [hub]
  } = await supabase.from('hubs').select('*').match({ id })
  const { body: scripts } = await supabase
    .from('scripts')
    .select('name,games,id,name')
    .in('id', hub.scripts)
  
  return {
    body: script
      .replace('_scripts', encode(scripts))
      .replace('_origin', url.origin)
      .replace('_name', JSON.stringify(hub.name))
  }
}
