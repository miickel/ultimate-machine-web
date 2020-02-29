import React from 'react'
import {kebabCase} from 'lodash'
import {graphql} from 'gatsby'
import Layout from '../components/Layout.js'
import Content from '../components/Content.js'
import HTMLContent from '../components/HTMLContent.js'
import TagList from '../components/TagList.js'
import SEO from '../components/SEO.js'
import InlineNewsletter from '../components/InlineNewsletter.js'

export const BlogPostTemplate = ({
  title,
  description,
  tags = [],
  content,
  contentComponent,
  socialImage,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section>
      <SEO title={title} description={description} socialImage={socialImage} />
      <h1>{title}</h1>
      <PostContent content={content} />
      <InlineNewsletter />
      <TagList tags={tags} linkFn={tag => `/tags/${kebabCase(tag)}`} />
    </section>
  )
}

const BlogPost = ({data}) => {
  const {markdownRemark: post} = data
  const {title, description, tags} = post.frontmatter
  const {socialImage} = post.fields

  return (
    <Layout>
      <BlogPostTemplate
        title={title}
        description={description}
        tags={tags}
        content={post.html}
        contentComponent={HTMLContent}
        socialImage={socialImage}
      />
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
      fields {
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
