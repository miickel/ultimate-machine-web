import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

const ProductList = () => {
  const data = useStaticQuery(graphql`
    query ProductListQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { template: { eq: "Product" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              description
              template
              date(formatString: "MMMM DD, YYYY")
              featuredImage
            }
          }
        }
      }
    }
  `)

  const { edges: posts = [] } = data.allMarkdownRemark

  return (
    <ul>
      {posts.map(({ node: { id, fields, frontmatter } }) => (
        <li key={id}>
          <Link to={fields.slug}>{frontmatter.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export default ProductList
