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
export async function get({ params }) {
  // the `slug` parameter is available because this file
  // is called [slug].json.js
  const { id } = params
  if (
    id &&
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi.test(
      id
    )
  ) {
    const [script] =
      (await supabase.from('scripts').select('id,name,games,description,user_id,hidden').match({ id })).body || []
    if (script) {
      return {
        body: script
      }
    }
  } else {
    return {
      status: 400
    }
  }
}
