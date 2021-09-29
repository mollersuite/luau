import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ query }) {
  const search = query.get('q')

  if (!search) {
    return {
      status: 400,
      body: 'q is required'
    }
  }

  const scripts = await supabase
    .from('scripts')
    .select('id,name,description')
    .textSearch('name', search, {
      type: 'websearch',
      config: 'english'
    })

  return {
    body: scripts.body
  }
}
