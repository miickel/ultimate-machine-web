const AWS = require('aws-sdk')

const {
  AWS_SES_REGION,
  AWS_SES_ACCESS_KEY_ID,
  AWS_SES_SECRET_ACCESS_KEY,
  NEWSLETTER_SENDER,
  NEWSLETTER_REPLY_TO,
} = process.env

const ses = new AWS.SES({
  apiVersion: '2010-12-01',
  region: AWS_SES_REGION,
  accessKeyId: AWS_SES_ACCESS_KEY_ID,
  secretAccessKey: AWS_SES_SECRET_ACCESS_KEY,
})

function sendTemplatedEmail({email, template, templateData}) {
  const params = {
    Source: NEWSLETTER_SENDER,
    Destination: {
      ToAddresses: [email],
    },
    ReplyToAddresses: [NEWSLETTER_REPLY_TO],
    Template: template,
    TemplateData: JSON.stringify(templateData),
  }
  return ses.sendTemplatedEmail(params).promise()
}

module.exports = {
  sendTemplatedEmail,
}
