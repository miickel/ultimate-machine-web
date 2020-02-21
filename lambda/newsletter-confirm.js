const jwt = require('./lib/jwt.js')
const {getSheet} = require('./lib/sheets.js')

const {NEWSLETTER_WELCOME_URL, NEWSLETTER_EXPIRED_URL} = process.env

exports.handler = async (event, context) => {
  const {secret} = event.queryStringParameters
  let Location = NEWSLETTER_WELCOME_URL

  try {
    const {email} = await jwt.verify(secret)
    const sheet = await getSheet()
    const rows = await sheet.getRows()
    const row = rows.find(row => row.email === email)
    if (!row) throw 'invalid'
    row.secret = ''
    row.confirmedAt = new Date().getTime()
    await row.save()
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
