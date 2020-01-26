import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout.js"

export const HomeTemplate = ({ title }) => (
  <div>
    <h2>{title}</h2>
    <p>Hello from HomeTemplate!</p>
  </div>
)

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <HomeTemplate title={frontmatter.title} />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query HomeTemplate {
    markdownRemark(frontmatter: { template: { eq: "Home" } }) {
      frontmatter {
        title
      }
    }
  }
`
