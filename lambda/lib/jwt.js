const jwt = require('jsonwebtoken')
const {JWT_SECRET} = process.env

function sign(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '2 days',
  })
}

function verify(payload) {
  return jwt.verify(payload, JWT_SECRET)
}

module.exports = {
  sign,
  verify,
}
