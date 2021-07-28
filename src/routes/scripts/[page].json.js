import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// @ts-ignore
const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  // the `slug` parameter is available because this file
  // is called [slug].json.js
  const { page } = params
  if (isNaN(Number(page))) {
    return {
      status: 400,
      body: 'Page must be a number'
    }
  }
  const pg = Number(page)
  const scripts = await supabase
    .from('scripts')
    .select('*')
    .range(pg * 100, (pg + 1) * 100)
  return {
    body: scripts.body
  }
}
