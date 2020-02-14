import React from "react"
import Helmet from "react-helmet"
import { kebabCase } from "lodash"
import { graphql } from "gatsby"
import Layout from "../components/Layout.js"
import Content from "../components/Content.js"
import HTMLContent from "../components/HTMLContent.js"
import TagList from "../components/TagList.js"

export const BlogPostTemplate = ({
  title,
  description,
  tags = [],
  content,
  helmet,
  contentComponent,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section>
      {helmet || ""}
      <h1>{title}</h1>
      <p>{description}</p>
      <PostContent content={content} />
      <TagList tags={tags} linkFn={tag => `/tags/${kebabCase(tag)}`} />
    </section>
  )
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  const { title, description, tags } = post.frontmatter

  return (
    <Layout>
      <BlogPostTemplate
        title={title}
        description={description}
        tags={tags}
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
          </Helmet>
        }
      />
    </Layout>
  )
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
