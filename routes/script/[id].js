// this is a shadow endpoint
// which means `body` turns into the props

import { supabase } from '$lib/supabase'
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params, request, locals }) {
  if (!isNaN(Number(params.id))) {
    return {
      fallthrough: true
    }
  }

  if (locals.exploit) {
    return {
      status: 301,
      headers: {
        location: `/script/lua/${params.id}`
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
        host: new URL(request.url).origin,
        id: params.id
      }
    }
  } else {
    return {
      body: {
        host: new URL(request.url).origin,
        id: params.id
      }
    }
  }
}
