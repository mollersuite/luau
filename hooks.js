import getExploit from '$lib/exploit'

export function getSession(request) {
  const exploit = getExploit(request.request.headers)
  return {
    exploit
  }
}
