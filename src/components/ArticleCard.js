import React from 'react'
import {Link} from 'gatsby'
import Card from './Card.js'
import BackgroundImage from 'gatsby-background-image'
import styles from './ArticleCard.module.sass'

const ArticleCard = ({slug, featuredImage, title, date}) => {
  return (
    <Card Elem={Link} to={slug} className={styles.card}>
      <article>
        <header>{title}</header>
      </article>
      {featuredImage && (
        <div className={styles.featWrap}>
          <BackgroundImage
            fluid={featuredImage.childImageSharp.fluid}
            className={styles.featuredImage}
          />
        </div>
      )}
      <div className={styles.date}>
        <span>{date}</span>
      </div>
    </Card>
  )
}

export default ArticleCard
