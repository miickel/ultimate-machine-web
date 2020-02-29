const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const {promisify} = require('util')
const writeFileAsync = promisify(fs.writeFile)

async function renderImageFromHtml({
  cacheDir,
  browser,
  templatePath,
  title,
  description,
  featuredImage,
  colors,
  width = 2400,
  height = 1350,
  type = 'png',
}) {
  const page = await browser.newPage()
  await page.setCacheEnabled(false)
  await page.goto(`file://${templatePath}`)

  await page.evaluate(
    ({title, description, featuredImage, colors}) => {
      document.querySelector('#title').innerHTML = title
      document.querySelector('#description').innerHTML = description
      document.querySelector(
        '#featuredImage'
      ).style.backgroundImage = `url('${featuredImage}')`

      if (colors && colors.length >= 2) {
        const root = document.documentElement
        root.style.setProperty('--colorBg', colors[0])
        root.style.setProperty('--colorFg', colors[1])
      }
    },
    {title, description, featuredImage, colors}
  )

  await page.evaluateHandle('document.fonts.ready')

  await page.setViewport({
    width,
    height,
  })

  const file = await page.screenshot({type})

  const key = title + description + featuredImage + (colors || []).join('')

  return writeCachedFile(cacheDir, key, file, type)
}

async function writeCachedFile(CACHE_DIR, key, contents, extension) {
  const fileName =
    crypto
      .createHash('md5')
      .update(key)
      .digest('hex') +
    '.' +
    extension
  const absolutePath = path.resolve(CACHE_DIR, fileName)
  await writeFileAsync(absolutePath, contents)
  return absolutePath
}

module.exports = renderImageFromHtml
