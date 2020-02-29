const _ = require('lodash')
const path = require('path')
const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const {createFilePath} = require('gatsby-source-filesystem')
const {createFileNode} = require('gatsby-source-filesystem/create-file-node')
const {fmImagesToRelative} = require('gatsby-remark-relative-images')
const renderImageFromHtml = require('./scripts/renderImageFromHtml.js')

let browser = null

exports.onPreInit = async () => {
  browser = await puppeteer.launch({
    headless: true,
  })
}

exports.onPostBuild = async () => {
  await browser.close()
}

exports.createPages = ({actions, graphql}) => {
  const {createPage} = actions

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              template
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMarkdownRemark.edges

    posts.forEach(edge => {
      const id = edge.node.id
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.template)}.js`
        ),
        context: {
          id,
        },
      })
    })

    let tags = []

    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })

    tags = _.uniq(tags)

    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/Tag.js`),
        context: {
          tag,
        },
      })
    })
  })
}

exports.onCreateNode = async ({
  node,
  actions,
  getNode,
  createNodeId,
  store,
  cache,
}) => {
  const {createNodeField, createNode} = actions
  const {program} = store.getState()

  const CACHE_DIR = path.resolve(`${program.directory}/.cache/social`)
  await fs.ensureDir(CACHE_DIR)

  fmImagesToRelative(node)

  if (node.internal.type === `MarkdownRemark`) {
    const {title, description, featuredImage, colors} = node.frontmatter

    if (featuredImage) {
      try {
        const ogImage = await renderImageFromHtml({
          cacheDir: CACHE_DIR,
          browser,
          title,
          description,
          featuredImage: getBase64Image(
            path.join(program.directory, featuredImage.replace('../../../', ''))
          ),
          templatePath: path.join(
            program.directory,
            'html-templates/social-card/index.html'
          ),
          colors,
        })

        const ogImageNode = await createGatsbySourceFilesystemNode({
          path: ogImage,
          createNode,
          createNodeId,
          parentNodeId: node.id,
        })

        createNodeField({
          name: `socialImage___NODE`,
          node,
          value: ogImageNode.id,
        })
      } catch (err) {
        console.error(err)
      }
    }

    const value = createFilePath({node, getNode})
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

async function createGatsbySourceFilesystemNode({
  path,
  createNode,
  createNodeId,
  parentNodeId,
}) {
  const fileNode = await createFileNode(path, createNodeId)
  fileNode.parent = parentNodeId
  createNode(fileNode, {
    name: 'gatsby-source-filesystem',
  })
  return fileNode
}

function getBase64Image(file) {
  const bitmap = fs.readFileSync(file)
  const buffer = Buffer.from(bitmap).toString('base64')
  const ext = path.extname(file).substr(1)
  return `data:image/${ext};base64,${buffer}`
}
