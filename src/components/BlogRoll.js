import React from "react"
import { graphql, StaticQuery } from "gatsby"
import ArticleCard from "./ArticleCard.js"
import styles from "./BlogRoll.module.sass"

const BlogRoll = ({ data }) => {
  const { edges: posts = [] } = data.allMarkdownRemark
  return (
    <ul className={styles.roll}>
      {posts.map(({ node: post }) => (
        <li key={post.id}>
          <ArticleCard
            slug={post.fields.slug}
            title={post.frontmatter.title}
            featuredImage={post.frontmatter.featuredImage}
            date={post.frontmatter.date}
          />
        </li>
      ))}
    </ul>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { template: { eq: "BlogPost" } } }
          limit: 3
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
                date(formatString: "MMMM DD, YYYY")
                isFeatured
                featuredImage
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
