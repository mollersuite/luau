/** @type {import('@sveltejs/kit').ParamMatcher} */
// is a uuid
export function match(param) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
    param
  )
}
