import getExploit from '$lib/exploit'

export function getSession(request) {
  const exploit = getExploit(request.headers)
  return {
    exploit
  }
}
