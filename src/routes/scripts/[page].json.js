import { scripts } from '$lib/scripts.js'
function chunk(array, size = 1) {
  let chunk = []
  return array.reduce((acc, curr, idx, arr) => {
    chunk.push(curr)
    if (chunk.length === size) {
      acc.push(chunk)
      chunk = []
    }
    if (chunk.length > 0 && idx === arr.length - 1) {
      acc.push(chunk)
    }
    return acc
  }, [])
}

const scriptschunked = chunk(
  Array.from({ ...scripts, length: Object.keys(scripts).length + 1 }),
  10
)
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
      body: 'ID must be a number'
    }
  }
  console.log(scriptschunked)
  return {
    body: (scriptschunked[Number(page) - 1] || []).filter(Boolean)
  }
}
