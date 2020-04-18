const got = require('got')
const {validate} = require('email-validator')

const {LISTMONK_API_ROOT} = process.env

exports.handler = async (event, context) => {
  const {email, name} = event.queryStringParameters

  try {
    if (!validate(email) || !name) throw 'invalid'

    const {body} = await got.post(`${LISTMONK_API_ROOT}/subscribers`, {
      json: {
        email,
        name,
        status: 'enabled',
        lists: [3],
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
