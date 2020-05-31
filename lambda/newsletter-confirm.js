const jwt = require('./lib/jwt.js')
const {listConfirmSubscription} = require('./lib/emailList.js')

const {NEWSLETTER_WELCOME_URL, NEWSLETTER_EXPIRED_URL} = process.env

exports.handler = async (event, context) => {
  const {secret} = event.queryStringParameters
  let Location = NEWSLETTER_WELCOME_URL

  try {
    const {subscriberId, listId} = await jwt.verify(secret)
    const isConfirmed = await listConfirmSubscription(subscriberId, listId)
    if (!isConfirmed) throw 'invalid'
  } catch (err) {
    Location = NEWSLETTER_EXPIRED_URL
  }

  return {
    statusCode: 303,
    body: '',
    headers: {
      Location,
    },
  }
}
