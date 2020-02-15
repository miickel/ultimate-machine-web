import React from 'react'
import {kebabCase} from 'lodash'
import {graphql} from 'gatsby'
import Layout from '../components/Layout.js'
import Content from '../components/Content.js'
import HTMLContent from '../components/HTMLContent.js'
import TagList from '../components/TagList.js'
import SEO from '../components/SEO.js'

export const BlogPostTemplate = ({
  title,
  description,
  tags = [],
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
      <TagList tags={tags} linkFn={tag => `/tags/${kebabCase(tag)}`} />
    </section>
  )
}

const BlogPost = ({data}) => {
  const {markdownRemark: post} = data
  const {title, description, tags} = post.frontmatter

  return (
    <Layout>
      <BlogPostTemplate
        title={title}
        description={description}
        tags={tags}
        content={post.html}
        contentComponent={HTMLContent}
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
    }
  }
`
