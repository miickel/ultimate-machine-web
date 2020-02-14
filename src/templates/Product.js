import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/Layout.js"
import Content from "../components/Content.js"
import HTMLContent from "../components/HTMLContent.js"

export const ProductTemplate = ({
  title,
  description,
  content,
  helmet,
  contentComponent,
}) => {
  const PostContent = contentComponent || Content
  return (
    <section>
      {helmet}
      <h1>{title}</h1>
      <p>{description}</p>
      <PostContent content={content} />
    </section>
  )
}

const Product = ({ data }) => {
  const { markdownRemark: post } = data
  const { title, description } = post.frontmatter

  return (
    <Layout>
      <ProductTemplate
        title={title}
        description={description}
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

export default Product

export const pageQuery = graphql`
  query ProductPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
`
