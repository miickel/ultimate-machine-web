import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout.js"
import BlogRoll from "../components/BlogRoll.js"
import styles from "./Home.module.sass"

export const HomeTemplate = ({ title }) => (
  <Layout>
    <div className={styles.hero}>
      <h1>
        Hi! I'm Mickel - a consistent person doing whimsical things. Sort of
        like a toddler.
      </h1>
    </div>
    <div className={styles.header}>
      <h3>Articles</h3>
      <Link to="/articles">All Articles</Link>
    </div>
    <BlogRoll />
    <div className={styles.header}>
      <h3>Products</h3>
      <Link to="/products">All Products</Link>
    </div>
    <BlogRoll />
  </Layout>
)

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return <HomeTemplate title={frontmatter.title} />
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
