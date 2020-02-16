import React from 'react'
import {kebabCase} from 'lodash'
import {graphql} from 'gatsby'
import Layout from '../components/Layout.js'
import Content from '../components/Content.js'
import HTMLContent from '../components/HTMLContent.js'
import TagList from '../components/TagList.js'
import ExternalLink from '../components/ExternalLink.js'
import SEO from '../components/SEO.js'

export const ProductTemplate = ({
  title,
  description,
  tags = [],
  url,
  content,
  contentComponent,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section>
      <SEO title={title} description={description} />
      <h1>{title}</h1>
      <p>{description}</p>
      <PostContent content={content} />
      {url && (
        <p>
          <ExternalLink href={url} prefix={`View “${title}” on `} />
        </p>
      )}
      <TagList tags={tags} linkFn={tag => `/tags/${kebabCase(tag)}`} />
    </section>
  )
}

const Product = ({data}) => {
  const {markdownRemark: post} = data
  const {title, description, tags, url} = post.frontmatter

  return (
    <Layout>
      <ProductTemplate
        title={title}
        description={description}
        tags={tags}
        url={url}
        content={post.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  )
}

export default Product

export const pageQuery = graphql`
  query ProductPostByID($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        url
      }
    }
  }
`
