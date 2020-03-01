import React from 'react'
import {kebabCase} from 'lodash'
import {graphql} from 'gatsby'
import Layout from '../components/Layout.js'
import Content from '../components/Content.js'
import HTMLContent from '../components/HTMLContent.js'
import TagList from '../components/TagList.js'
import ExternalLink from '../components/ExternalLink.js'
import SEO from '../components/SEO.js'
import InlineNewsletter from '../components/InlineNewsletter.js'

export const ProductTemplate = ({
  title,
  description,
  tags = [],
  url,
  content,
  contentComponent,
  socialImage,
  slug,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section>
      <SEO
        title={title}
        description={description}
        socialImage={socialImage}
        pathname={slug}
      />
      <h1>{title}</h1>
      <PostContent content={content} />
      <InlineNewsletter />
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
  const {slug, socialImage} = post.fields

  return (
    <Layout>
      <ProductTemplate
        title={title}
        description={description}
        tags={tags}
        url={url}
        content={post.html}
        contentComponent={HTMLContent}
        socialImage={socialImage}
        slug={slug}
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
      fields {
        slug
        socialImage {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 90) {
              src
              presentationWidth
              presentationHeight
            }
          }
        }
      }
    }
  }
`
