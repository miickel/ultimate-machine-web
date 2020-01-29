import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout.js"
import BlogRoll from "../components/BlogRoll.js"

export const HomeTemplate = ({ title }) => <BlogRoll />

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
