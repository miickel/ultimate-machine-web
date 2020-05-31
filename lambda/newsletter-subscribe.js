const {validate} = require('email-validator')
const {signConfirm, signUnsubscribe} = require('./lib/jwt.js')
const {client, listSubscribe} = require('./lib/db.js')

const {NETLIFY_FUNCTIONS_ROOT, NEWSLETTER_LIST_ID} = process.env

const listId = parseInt(NEWSLETTER_LIST_ID, 10)

exports.handler = async (event, context) => {
  const {email, name} = event.queryStringParameters

  try {
    if (!validate(email) || !name) throw 'invalid'

    await client.connect()

    const subscriber = await listSubscribe({
      email,
      name,
      listId,
    })

    const secretConfirm = signConfirm(subscriber.id, listId)
    const secretUnsubscribe = signUnsubscribe(subscriber.id, listId)

    await sendTemplatedEmail({
      email,
      template: 'verify-email',
      templateData: {
        name,
        verifyUrl: `${NETLIFY_FUNCTIONS_ROOT}/newsletter-confirm?secret=${encodeURI(
          secretConfirm
        )}`,
        unsubscribeUrl: `${NETLIFY_FUNCTIONS_ROOT}/newsletter-unsubscribe?secret=${encodeURI(
          secretUnsubscribe
        )}`,
      },
    })

    return {
      statusCode: 200,
      body: 'ok',
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 400,
      body: 'fail',
    }
  } finally {
    await client.end().catch(() => {})
  }
}
