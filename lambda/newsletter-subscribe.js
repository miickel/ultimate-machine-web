const {validate} = require('email-validator')
const {getSheet} = require('./lib/sheets.js')
const {sign} = require('./lib/jwt.js')
const {sendTemplatedEmail} = require('./lib/ses.js')

const {NETLIFY_FUNCTIONS_ROOT} = process.env

exports.handler = async (event, context) => {
  const {email} = event.queryStringParameters

  try {
    if (!validate(email)) throw 'invalid'

    const secret = await subscribe(email)

    await sendTemplatedEmail({
      email,
      template: 'verify-email',
      templateData: {
        verifyUrl: `${NETLIFY_FUNCTIONS_ROOT}/newsletter-confirm?secret=${encodeURI(
          secret
        )}`,
        unsubscribeUrl: `${NETLIFY_FUNCTIONS_ROOT}/newsletter-unsubscribe?email=${encodeURI(
          email
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

async function subscribe(email) {
  const sheet = await getSheet()
  const rows = await sheet.getRows()
  const existing = rows.find(row => row.email === email)

  if (existing) {
    if (existing.confirmedAt) throw 'exists'
    await existing.delete()
  }

  const secret = sign({
    email,
  })

  await sheet.addRow({
    email,
    secret,
    createdAt: new Date().getTime(),
  })

  return secret
}
