import React from 'react'
import {Link, graphql} from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import {BlogRollTemplate} from '../components/BlogRoll.js'

const Tag = ({data, pageContext}) => {
  const {allMarkdownRemark} = data
  const posts = allMarkdownRemark.edges
  const tag = pageContext.tag
  const totalCount = allMarkdownRemark.totalCount
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
  } tagged with “${tag}”`

  return (
    <Layout>
      <SEO title={`Posts about ${tag}`} />
      <h1>Browse Tag</h1>
      <h2>{tagHeader}</h2>
      <BlogRollTemplate posts={posts} />
      <p style={{marginTop: '3rem'}}>
        <Link to="/tags">All tags</Link>
      </p>
    </Layout>
  )
}

export default Tag

export const browseTagPageQuery = graphql`
  query BrowseTag($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {frontmatter: {tags: {in: [$tag]}}}
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
