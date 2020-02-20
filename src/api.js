const fn = name => `/.netlify/functions/${name}`

export const newsletterSubscribe = email =>
  plainFetch(`${fn('newsletter-subscribe')}?email=${encodeURI(email)}`)

/**
 * Helper methods
 */

function getJson(url, options) {
  return jsonFetch(url, options, 'get')
}

async function jsonFetch(url, options = {}, method = 'post') {
  const {data, ...props} = options

  const req = {
    method,
    ...props,
  }

  req.headers = {
    ...req.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (data) req.body = JSON.stringify(data)

  const res = await fetch(url, req)
  const json = await res.json()

  if (res.status === 200) return json
  throw json
}

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
