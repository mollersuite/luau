import getExploit from '$lib/exploit'

export function getSession(request) {
  const exploit = getExploit(request.headers)
  return {
    exploit
  }
}

export function handleError() {
  if (import.meta.env.PROD && import.meta.env.VITE_WEBHOOK) {
    fetch(
      // @ts-ignore
      import.meta.env.VITE_WEBHOOK,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: import.meta.env.VITE_ERROR,
          allowed_mentions: []
        })
      }
    )
  }
}
