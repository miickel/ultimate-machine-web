import React from 'react'
import classnames from 'classnames'
import {graphql, useStaticQuery} from 'gatsby'
import ArticleCard from './ArticleCard.js'
import styles from './BlogRoll.module.sass'

export const BlogRollTemplate = ({posts = [], limit}) => {
  const cl = classnames({
    [styles.roll]: true,
    [styles.wrap]: limit !== undefined ? limit > 3 : true,
  })

  return (
    <ul className={cl}>
      {posts.slice(0, limit).map(({node: post}) => (
        <li key={post.id}>
          <ArticleCard
            slug={post.fields ? post.fields.slug : ''}
            title={post.frontmatter.title}
            featuredImage={post.frontmatter.featuredImage}
            date={post.frontmatter.date}
          />
        </li>
      ))}
    </ul>
  )
}

const BlogRoll = ({limit}) => {
  const data = useStaticQuery(graphql`
    query BlogRollQuery {
      allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]}
        filter: {frontmatter: {template: {eq: "BlogPost"}}}
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

  const {edges: posts = []} = data.allMarkdownRemark

  return <BlogRollTemplate posts={posts} limit={limit} />
}

export default BlogRoll
