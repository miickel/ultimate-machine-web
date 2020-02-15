import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout.js"
import BlogRoll from "../components/BlogRoll.js"
import ArticleRoll from "../components/ArticleRoll.js"
import Button from "../components/Button.js"
import HTMLContent from "../components/HTMLContent.js"
import { MdChevronRight } from "react-icons/md"
import styles from "./Home.module.sass"

export const HomeTemplate = ({ title, heroText, content }) => (
  <Layout>
    <div className={styles.hero}>
      <h1>{heroText}</h1>
    </div>

    <HTMLContent content={content} />

    <div className={styles.header}>
      <h3>
        <Link to="/products">Products</Link>
      </h3>
      <Button Elem={Link} to="/products">
        <MdChevronRight /> All Products
      </Button>
    </div>
    <ArticleRoll limit={3} />

    <div className={styles.header}>
      <h3>
        <Link to="/articles">Articles</Link>
      </h3>
      <Button Elem={Link} to="/articles">
        <MdChevronRight /> All Articles
      </Button>
    </div>
    <BlogRoll limit={3} />
  </Layout>
)

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark
  return (
    <HomeTemplate
      title={frontmatter.title}
      heroText={frontmatter.heroText}
      content={html}
    />
  )
}

export default IndexPage

export const pageQuery = graphql`
  query HomeTemplate {
    markdownRemark(frontmatter: { template: { eq: "Home" } }) {
      html
      frontmatter {
        title
        heroText
      }
    }
  }
`
