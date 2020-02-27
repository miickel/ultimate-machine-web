import React from 'react'
import {Link, graphql} from 'gatsby'
import Layout from '../components/Layout.js'
import BlogRoll from '../components/BlogRoll.js'
import ProductRoll from '../components/ProductRoll.js'
import Button from '../components/Button.js'
import HTMLContent from '../components/HTMLContent.js'
import {MdChevronRight} from 'react-icons/md'
import styles from './Home.module.sass'

export const HomeTemplate = ({title, heroText, content}) => (
  <Layout>
    <div className={styles.hero}>
      <h1>{heroText}</h1>
    </div>

    <HTMLContent content={content} />

    <div className={styles.header}>
      <h3>Products</h3>
      <Button Elem={Link} to="/products">
        <MdChevronRight /> All Products
      </Button>
    </div>
    <ProductRoll limit={3} />

    <div className={styles.header}>
      <h3>Articles</h3>
      <Button Elem={Link} to="/articles">
        <MdChevronRight /> All Articles
      </Button>
    </div>
    <BlogRoll limit={3} />
  </Layout>
)

const IndexPage = ({data}) => {
  const {frontmatter, html} = data.markdownRemark
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
    markdownRemark(frontmatter: {template: {eq: "Home"}}) {
      html
      frontmatter {
        title
        heroText
      }
    }
  }
`
