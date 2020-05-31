const jwt = require('./lib/jwt.js')
const {client, listConfirmSubscription} = require('./lib/db.js')

const {NEWSLETTER_WELCOME_URL, NEWSLETTER_EXPIRED_URL} = process.env

exports.handler = async (event, context) => {
  const {secret} = event.queryStringParameters
  let Location = NEWSLETTER_WELCOME_URL

  try {
    const {subscriberId, listId} = await jwt.verify(secret)
    const isConfirmed = listConfirmSubscription(subscriberId, listId)
    if (!isConfirmed) throw 'invalid'
  } catch (err) {
    Location = NEWSLETTER_EXPIRED_URL
  } finally {
    await client.end().catch(() => {})
  }

  return {
    statusCode: 303,
    body: '',
    headers: {
      Location,
    },
  }
}
