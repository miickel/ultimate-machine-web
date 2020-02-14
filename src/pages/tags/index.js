import React from "react"
import { graphql, Link } from "gatsby"
import { kebabCase } from "lodash"
import Layout from "../../components/Layout.js"

const Tags = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  return (
    <Layout>
      <h1>Tags</h1>
      <ul>
        {group.map(({ fieldValue, totalCount }) => (
          <li key={fieldValue}>
            <Link to={`/tags/${kebabCase(fieldValue)}`}>{fieldValue}</Link> -{" "}
            {totalCount} {totalCount === 1 ? "post" : "posts"}
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Tags

export const allTagsPageQuery = graphql`
  query AllTagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
