import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import ProductListItem from "./ProductListItem.js"
import styles from "./ProductList.module.sass"

const ProductList = () => {
  const data = useStaticQuery(graphql`
    query ProductListQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___startDate] }
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
              url
              template
              startDate(formatString: "MMMM YYYY")
              endDate(formatString: "MMMM YYYY")
              exitDescription
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 2048, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              tags
            }
          }
        }
      }
    }
  `)

  const { edges: posts = [] } = data.allMarkdownRemark

  return (
    <ul className={styles.list}>
      {posts.map(({ node: { id, fields, frontmatter } }) => (
        <ProductListItem
          key={id}
          title={frontmatter.title}
          description={frontmatter.description}
          url={frontmatter.url}
          tags={frontmatter.tags}
          slug={fields.slug}
          featuredImage={frontmatter.featuredImage}
          startDate={frontmatter.startDate}
          endDate={frontmatter.endDate}
          exitDescription={frontmatter.exitDescription}
        />
      ))}
    </ul>
  )
}

export default ProductList
