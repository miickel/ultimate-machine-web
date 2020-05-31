const jwt = require('./lib/jwt.js')
const {client, listUnsubscribe} = require('./lib/db.js')

const {NEWSLETTER_UNSUBSCRIBE_URL} = process.env

exports.handler = async (event, context) => {
  const {secret} = event.queryStringParameters

  try {
    await client.connect()

    const {subscriberId, listId} = await jwt.verify(secret)
    const isUnsubscribed = await listUnsubscribe(subscriberId, listId)

    if (!isUnsubscribed) {
      return {
        statusCode: 200,
        body: 'You are already unsubscribed.',
      }
    }

    return {
      statusCode: 303,
      body: '',
      headers: {
        Location: NEWSLETTER_UNSUBSCRIBE_URL,
      },
    }
  } catch (err) {
    return {
      statusCode: 200,
      body:
        'Could not unsubscribe. Please try again and contact support if the problem persists.',
    }
  } finally {
    await client.end().catch(() => {})
  }
}
