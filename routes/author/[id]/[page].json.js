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
  const page = params.page

  if (!params.id) {
    return {
      status: 400,
      body: 'Missing id'
    }
  }

  if (!page) {
    return {
      status: 400,
      body: 'page is required'
    }
  }

  if (isNaN(Number(page))) {
    return {
      status: 400,
      body: 'page must be a number'
    }
  }
  const pg = Number(page)

  const scripts = await supabase
    .from('scripts')
    .select('id,name,description,user_id')
    .match({ user_id: params.id })
    .range(pg * 500, (pg + 1) * 500)

  return {
    body: scripts.body
  }
}
