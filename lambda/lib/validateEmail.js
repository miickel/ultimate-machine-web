const re = /\S+@\S+\.\S+/

function validateEmail(email) {
  if (!email) return false
  return re.test(email)
}

module.exports = validateEmail
