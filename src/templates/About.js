import React from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import Layout from "../components/Layout.js"
import HTMLContent from "../components/HTMLContent.js"
import Content from "../components/Content.js"

export const AboutTemplate = ({
  title,
  content,
  contentComponent,
  helmet = "",
}) => {
  const PostContent = contentComponent || Content
  return (
    <Layout>
      {helmet}
      <h1>{title}</h1>
      <PostContent content={content} />
    </Layout>
  )
}

const AboutPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  const { siteMetadata } = data.site
  return (
    <AboutTemplate
      title={frontmatter.title}
      content={html}
      contentComponent={HTMLContent}
      helmet={
        <Helmet>
          <title>
            {frontmatter.title} | {siteMetadata.title}
          </title>
          <meta
            name="description"
            content="Personal blog by Mickel Andersson."
          />
        </Helmet>
      }
    />
  )
}

export default AboutPage

export const pageQuery = graphql`
  query AboutTemplate {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { template: { eq: "About" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
