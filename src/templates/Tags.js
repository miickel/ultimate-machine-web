import React from "react"
import Helmet from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import { BlogRollTemplate } from "../components/BlogRoll.js"

const Tags = ({ data, pageContext }) => {
  const { allMarkdownRemark, site } = data
  const posts = allMarkdownRemark.edges
  const postLinks = posts.map(post => (
    <li key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>
        <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
      </Link>
    </li>
  ))
  const tag = pageContext.tag
  const title = site.siteMetadata.title
  const totalCount = allMarkdownRemark.totalCount
  const tagHeader = `${totalCount} article${
    totalCount === 1 ? "" : "s"
  } tagged with “${tag}”`

  return (
    <Layout>
      <Helmet title={`${tag} | ${title}`} />
      <h1>Tags</h1>
      <h2>{tagHeader}</h2>
      <BlogRollTemplate posts={posts} />
    </Layout>
  )
}

export default Tags

export const tagsPageQuery = graphql`
  query TagPage($tag: String) {
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
