export function getSession(request) {
  return {
    exploit: !!(
      request.headers['user-agent']?.startsWith('synx') ||
      request.headers['user-agent']?.startsWith('ScriptWare') ||
      Object.keys(request.headers).find((key) => key.endsWith('-fingerprint'))
    )
  }
}
