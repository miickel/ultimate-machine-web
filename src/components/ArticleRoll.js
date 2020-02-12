import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { BlogRollTemplate } from "./BlogRoll.js"

const ArticleRoll = ({ limit }) => {
  const data = useStaticQuery(graphql`
    query ArticleRollQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___startDate] }
        filter: { frontmatter: { template: { eq: "Product" } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              description
              template
              date: startDate(formatString: "MMMM DD, YYYY")
              isFeatured
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 200, quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const { edges: posts = [] } = data.allMarkdownRemark

  return <BlogRollTemplate posts={posts} limit={limit} />
}

export default ArticleRoll
