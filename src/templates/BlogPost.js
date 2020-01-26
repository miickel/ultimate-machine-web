import React from "react"
import Helmet from "react-helmet"
import { kebabCase } from "lodash"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout.js"
import HTMLContent from "../components/HTMLContent.js"

export const BlogPostTemplate = ({
  title,
  description,
  tags = [],
  content,
  helmet,
}) => {
  return (
    <section>
      {helmet}
      <h1>{title}</h1>
      <p>{description}</p>
      <HTMLContent content={content} />
      {tags.length > 0 && (
        <ul>
          {tags.map(tag => (
            <li key={`tag-${tag}`}>
              <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      )}
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