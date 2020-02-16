import React from 'react'
import {graphql} from 'gatsby'
import Layout from '../components/Layout.js'
import HTMLContent from '../components/HTMLContent.js'
import Content from '../components/Content.js'
import SEO from '../components/SEO.js'

export const AboutTemplate = ({title, content, contentComponent}) => {
  const PostContent = contentComponent || Content
  return (
    <Layout>
      <SEO title={title} />
      <h1>{title}</h1>
      <PostContent content={content} />
    </Layout>
  )
}

const AboutPage = ({data}) => {
  const {frontmatter, html} = data.markdownRemark
  return (
    <AboutTemplate
      title={frontmatter.title}
      content={html}
      contentComponent={HTMLContent}
    />
  )
}

export default AboutPage

export const pageQuery = graphql`
  query AboutTemplate {
    markdownRemark(frontmatter: {template: {eq: "About"}}) {
      html
      frontmatter {
        title
      }
    }
  }
`
