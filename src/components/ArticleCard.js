import React from "react"
import { Link } from "gatsby"
import Card from "./Card.js"
import PreviewCompatibleImage from "./PreviewCompatibleImage.js"
import styles from "./ArticleCard.module.sass"

const ArticleCard = ({ slug, featuredImage, title, date }) => {
  return (
    <Card Elem={Link} to={slug} className={styles.card}>
      <article>
        <header>
          {featuredImage &&
          false && ( // TODO: enable featured images
              <PreviewCompatibleImage
                imageInfo={{
                  image: featuredImage,
                  alt: `Featured image thumbnail for post "${title}"`,
                }}
              />
            )}
          {title}
        </header>
      </article>
      <div className={styles.date}>{date}</div>
    </Card>
  )
}

export default ArticleCard
