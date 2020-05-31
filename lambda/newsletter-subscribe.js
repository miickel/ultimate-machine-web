const {signConfirm, signUnsubscribe} = require('./lib/jwt.js')
const {listSubscribe} = require('./lib/emailList.js')
const {sendTemplatedEmail} = require('./lib/ses.js')
const validateEmail = require('./lib/validateEmail.js')

const {NETLIFY_FUNCTIONS_ROOT, NEWSLETTER_LIST_ID} = process.env

const listId = parseInt(NEWSLETTER_LIST_ID, 10)

exports.handler = async (event, context) => {
  const {email, name} = event.body

  try {
    if (!validateEmail(email) || !name) throw 'invalid'

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
  }
}
