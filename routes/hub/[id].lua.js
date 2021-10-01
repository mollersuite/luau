import exploit from '$lib/exploit'

// TODO

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params: { id }, headers }) {
  if (!exploit(headers)) {
    return {
      status: 301,
      headers: {
        Location: '/hub/' + id
      }
    }
  }
  
}
