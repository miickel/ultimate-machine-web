import React from 'react'
import {Link} from 'gatsby'
import ExternalLink from './ExternalLink.js'
import styles from './ProductListItem.module.sass'

const ProductListItem = ({
  title,
  description,
  slug,
  url,
  startDate,
  endDate,
  exitDescription,
}) => {
  return (
    <li className={styles.item}>
      <div className={styles.content}>
        <h2>
          <Link to={slug}>{title}</Link>
        </h2>
        <p>{description}</p>
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
