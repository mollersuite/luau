import { scripts } from './_scripts.js'
/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get({ params }) {
  // the `slug` parameter is available because this file
  // is called [slug].json.js
  const { id } = params

  if (isNaN(Number(id))) {
    return {
      status: 400,
      body: 'ID must be a number'
    }
  }

  if (scripts[Number(id)]) {
    return {
      body: scripts[Number(id)]
    }
  }
}
