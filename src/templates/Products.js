import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout.js"
import HTMLContent from "../components/HTMLContent.js"

export const ProductsTemplate = ({ title, content }) => (
  <Layout>
    <h1>{title}</h1>
    <HTMLContent content={content} />
  </Layout>
)

const ProductsPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  return <ProductsTemplate title={frontmatter.title} content={html} />
}

export default ProductsPage

export const pageQuery = graphql`
  query Products {
    markdownRemark(frontmatter: { template: { eq: "Products" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
