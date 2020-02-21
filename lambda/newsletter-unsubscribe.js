const {getSheet} = require('./lib/sheets.js')

const {NEWSLETTER_UNSUBSCRIBE_URL} = process.env

exports.handler = async (event, context) => {
  const {email} = event.queryStringParameters

  try {
    const sheet = await getSheet()
    const rows = await sheet.getRows()
    const row = rows.find(row => row.email === email && !row.unsubscribedAt)

    if (!row) {
      return {
        statusCode: 200,
        body: 'You are already unsubscribed.',
      }
    }

    row.unsubscribedAt = new Date().getTime()
    await row.save()

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
  }
}
