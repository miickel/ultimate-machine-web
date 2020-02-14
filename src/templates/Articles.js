import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/Layout.js"
import BlogRoll from "../components/BlogRoll.js"
import HTMLContent from "../components/HTMLContent.js"

export const ArticlesTemplate = ({ title, content, helmet = "" }) => (
  <Layout>
    {helmet}
    <h1>{title}</h1>
    <HTMLContent content={content} />
    <BlogRoll />
  </Layout>
)

const ArticlesPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  const { siteMetadata } = data.site
  return (
    <ArticlesTemplate
      title={frontmatter.title}
      content={html}
      helmet={
        <Helmet>
          <title>
            {frontmatter.title} | {siteMetadata.title}
          </title>
          <meta
            name="description"
            content="Blog posts and articles made by Ultimate Machine."
          />
        </Helmet>
      }
    />
  )
}

export default ArticlesPage

export const pageQuery = graphql`
  query Articles {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { template: { eq: "Articles" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
