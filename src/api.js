const fn = name => `/.netlify/functions/${name}`

export const newsletterSubscribe = email =>
  plainFetch(`${fn('newsletter-subscribe')}?email=${encodeURI(email)}`)

async function plainFetch(url, options = {}, method = 'get') {
  console.info(url)

  const req = {
    method,
    ...options,
  }

  const res = await fetch(url, req)
  const data = await res.text()
  if (res.status === 200) return data

  const error = new Error(data)
  error.status = res.status
  throw error
}
