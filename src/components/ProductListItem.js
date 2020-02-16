import React from 'react'
import {Link} from 'gatsby'
import {kebabCase} from 'lodash'
import Card from './Card.js'
import ButtonList from './ButtonList.js'
import Button from './Button.js'
import TagList from './TagList.js'
import PreviewCompatibleImage from './PreviewCompatibleImage.js'
import ExternalLink from './ExternalLink.js'
import styles from './ProductListItem.module.sass'

const ProductListItem = ({
  title,
  description,
  slug,
  url,
  tags,
  featuredImage,
  startDate,
  endDate,
  exitDescription,
}) => {
  const FeaturedImage = (
    <PreviewCompatibleImage
      imageInfo={{
        image: featuredImage,
        alt: `Ultimate Machine - ${title}`,
      }}
    />
  )
  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <h2>
          <Link to={slug}>{title}</Link>
        </h2>
        <p>{description}</p>
        {false && FeaturedImage}
        <footer className={styles.footer}>
          <div>
            {url && <ExternalLink href={url} prefix={`View “${title}” on `} />}
          </div>
          <div className={styles.date}>
            <span>{startDate}</span>{' '}
            {endDate && (
              <>
                {' - '}
                <span title={exitDescription}>{endDate}</span>
              </>
            )}
          </div>
        </footer>
      </div>
    </li>
  )
}

export default ProductListItem
