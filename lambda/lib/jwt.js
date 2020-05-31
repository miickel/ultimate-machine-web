const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

function sign(payload, options) {
  return jwt.sign(payload, JWT_SECRET, options)
}

function signConfirm(subscriberId, listId) {
  return sign(
    {
      subscriberId,
      listId,
      action: 'confirm',
    },
    {
      expiresIn: '14 days',
    }
  )
}

function signUnsubscribe(subscriberId, listId) {
  return sign({
    subscriberId,
    listId,
    action: 'unsubscribe',
  })
}

function verify(payload) {
  return jwt.verify(payload, JWT_SECRET)
}

module.exports = {
  signConfirm,
  signUnsubscribe,
  verify,
}
