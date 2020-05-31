const fn = name => `/.netlify/functions/${name}`

export const newsletterSubscribe = (email, name) =>
  postJson(`${fn('newsletter-subscribe')}`, {
    data: {
      email,
      name,
    },
  })

async function plainFetch(url, options = {}, method = 'get') {
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

function getJson(url, options) {
  return jsonFetch(url, options, 'get')
}

function postJson(url, options) {
  return jsonFetch(url, options)
}

async function jsonFetch(url, options = {}, method = 'post') {
  const {data, idToken, apiToken, ...props} = options

  const req = {
    method,
    ...props,
  }

  req.headers = {
    ...req.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (idToken) {
    const freshIdToken = await auth().currentUser.getIdToken()
    req.headers['x-id-token'] = freshIdToken
  }

  if (apiToken) {
    req.headers['x-api-key'] = apiToken
  }

  if (data) req.body = JSON.stringify(data)

  const res = await fetch(url, req)
  const json = await res.json()

  if (res.status === 200) return json
  throw json
}
