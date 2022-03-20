// this is a shadow endpoint
// which means `body` turns into the props

import { supabase } from '$lib/supabase'
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params, locals }) {

  if (locals.exploit) {
    return {
      status: 301,
      headers: {
        location: `/script/lua/${params.id}`,
        Vary: 'User-Agent'
      }
    }
  }
  const [script] =
    (
      await supabase
        .from('scripts')
        .select('name,games,description,user_id,hidden,source')
        .match({ id: params.id })
    ).body || []
  if (script) {
    return {
      body: {
        script,
        id: params.id
      },
      headers: {
        Vary: 'User-Agent'
      }
    }
  } else {
    return {
      body: {
        id: params.id
      },
      headers: {
        Vary: 'User-Agent'
      }
    }
  }
}
