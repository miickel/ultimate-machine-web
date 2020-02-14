import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/Layout.js"
import HTMLContent from "../components/HTMLContent.js"
import ProductList from "../components/ProductList.js"

export const ProductsTemplate = ({ title, content, helmet = "" }) => (
  <Layout>
    {helmet}
    <h1>{title}</h1>
    <HTMLContent content={content} />
    <ProductList />
  </Layout>
)

const ProductsPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  const { siteMetadata } = data.site
  return (
    <ProductsTemplate
      title={frontmatter.title}
      content={html}
      helmet={
        <Helmet>
          <title>
            {frontmatter.title} | {siteMetadata.title}
          </title>
          <meta
            name="description"
            content="Products, tools and services made by Ultimate Machine."
          />
        </Helmet>
      }
    />
  )
}

export const pageQuery = graphql`
  query Products {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { template: { eq: "Products" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default ProductsPage
