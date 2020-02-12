import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout.js"
import HTMLContent from "../components/HTMLContent.js"

export const AboutTemplate = ({ title, content }) => (
  <Layout>
    <h1>{title}</h1>
    <HTMLContent content={content} />
  </Layout>
)

const AboutPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  return <AboutTemplate title={frontmatter.title} content={html} />
}

export default AboutPage

export const pageQuery = graphql`
  query AboutTemplate {
    markdownRemark(frontmatter: { template: { eq: "About" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
