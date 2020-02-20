const {validate} = require('email-validator')
const {getSheet} = require('./lib/sheets.js')
const {sign} = require('./lib/jwt.js')

exports.handler = async (event, context) => {
  const {email} = event.queryStringParameters

  try {
    if (!validate(email)) throw 'invalid'

    await subscribe(email)

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

  if (existing) throw 'exists'

  const secret = sign({
    email,
  })

  await sheet.addRow({
    email,
    secret,
    createdAt: new Date(),
  })
}
