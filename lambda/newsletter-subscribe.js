const {validate} = require('email-validator')
const {getSheet} = require('./lib/sheets.js')

exports.handler = async (event, context) => {
  const {email} = event.queryStringParameters

  try {
    if (!validate(email)) throw 'invalid'

    await subscribe(email)

    return {
      statusCode: 200,
    }
  } catch (err) {
    return {
      statusCode: 400,
    }
  }
}

async function subscribe(email) {
  const sheet = await getSheet()
  const rows = await sheet.getRows()
  const existing = rows.find(row => row.email === email)

  if (existing) throw 'email already subscribed'

  const secret = createSecret(email)

  await sheet.addRow({
    email,
    secret,
    createdAt: new Date(),
  })

  console.log('subscribed!')
}
