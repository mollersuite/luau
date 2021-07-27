export function getSession(request) {
  return {
    exploit: !!(request.headers['user-agent']?.startsWith('synx') || Object.keys(request.headers).find(key => key.endsWith('-fingerprint')))
  }
}
