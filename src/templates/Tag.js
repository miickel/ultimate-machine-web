import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import { BlogRollTemplate } from "../components/BlogRoll.js"

const Tag = ({ data, pageContext }) => {
  const { allMarkdownRemark, site } = data
  const posts = allMarkdownRemark.edges
  const tag = pageContext.tag
  const title = site.siteMetadata.title
  const totalCount = allMarkdownRemark.totalCount
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with “${tag}”`

  return (
    <Layout>
      <Helmet title={`${tag} | ${title}`} />
      <h1>Browse Tag</h1>
      <p>
        Can’t find what you’re looking for?{" "}
        <Link to="/tags">Browse all tags</Link>.
      </p>
      <h2>{tagHeader}</h2>
      <BlogRollTemplate posts={posts} />
    </Layout>
  )
}

export default Tag

export const browseTagPageQuery = graphql`
  query BrowseTag($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
            date(formatString: "MMMM DD, YYYY")
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
`
