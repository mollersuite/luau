import exploit from '$lib/exploit'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  event.locals.exploit = exploit(event.request.headers)

  return resolve(event)
}
