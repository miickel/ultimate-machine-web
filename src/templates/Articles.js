import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout.js"
import BlogRoll from "../components/BlogRoll.js"
import HTMLContent from "../components/HTMLContent.js"
import SEO from "../components/SEO.js"

export const ArticlesTemplate = ({ title, content }) => (
  <Layout>
    <SEO
      title={title}
      description="Blog posts and articles by Ultimate Machine."
    />
    <h1>{title}</h1>
    <HTMLContent content={content} />
    <BlogRoll />
  </Layout>
)

const ArticlesPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  return <ArticlesTemplate title={frontmatter.title} content={html} />
}

export default ArticlesPage

export const pageQuery = graphql`
  query Articles {
    markdownRemark(frontmatter: { template: { eq: "Articles" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
