const jwt = require('./lib/jwt.js')

const {NEWSLETTER_WELCOME_URL, NEWSLETTER_EXPIRED_URL} = process.env

exports.handler = async (event, context) => {
  const {secret} = event.queryStringParameters
  let Location = NEWSLETTER_WELCOME_URL

  try {
    await jwt.verify(secret)
  } catch (err) {
    Location = NEWSLETTER_EXPIRED_URL
  }

  return {
    statusCode: 303,
    headers: {
      Location,
    },
  }
}
