const {GoogleSpreadsheet} = require('google-spreadsheet')

const {
  GOOGLE_SHEETS_SHEET_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
} = process.env

async function getSheet() {
  const doc = new GoogleSpreadsheet(GOOGLE_SHEETS_SHEET_ID)

  await doc.useServiceAccountAuth({
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(
      new RegExp('\\\\n', 'g'),
      '\n'
    ),
  })

  await doc.loadInfo()

  return doc.sheetsByIndex[0]
}

module.exports = {
  getSheet,
}
