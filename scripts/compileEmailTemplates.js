const fs = require('fs')
const path = require('path')
const glob = require('glob')
const compileMjml = require('mjml')
const templateData = JSON.stringify(
  require('../src/email-templates/template-data.js')
)

const FILE_GLOB = 'src/email-templates/*.mjml'

const templatesPath = path.join(__dirname, '../src/email-templates')

const mjmlOptions = {
  minify: true,
  filePath: path.join(templatesPath, '/email-templates'),
}

glob(FILE_GLOB, (err, files) => {
  if (err) return console.error(err.stack)

  files.forEach(file => {
    const mjmlContent = fs.readFileSync(file, 'utf8')
    const {html, errors} = compileMjml(mjmlContent, mjmlOptions)

    if (errors.length > 0) {
      console.error(`\n\nSkipping file due to template errors: ${file}`)
      console.log(JSON.stringify(errors, null, 2))
      return 0
    }

    const sesTemplateFile = path.basename(file).replace('.mjml', '.json')
    const sesTemplate = require(`../src/email-templates/${sesTemplateFile}`)
    const filename = path.basename(sesTemplateFile, '.json')
    const newSesTemplate = JSON.stringify(
      {
        ...sesTemplate,
        Template: {
          ...sesTemplate.Template,
          TemplateName: filename,
          HtmlPart: html,
        },
      },
      null,
      2
    )
    fs.writeFileSync(path.join(templatesPath, sesTemplateFile), newSesTemplate)

    const sesSendContent = JSON.stringify(
      {
        Source: 'mickel@ultimatemachine.se',
        Template: filename,
        Destination: {
          ToAddresses: ['mickel@ultimatemachine.se'],
        },
        TemplateData: templateData,
      },
      null,
      2
    )
    fs.writeFileSync(
      path.join(templatesPath, filename + '-send.json'),
      sesSendContent
    )
  })
})
