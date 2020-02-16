import React from 'react'
import {Link} from 'gatsby'
import styles from './Tag.module.sass'

const Tag = ({children, ...props}) => {
  return (
    <Link className={styles.tag} {...props}>
      {children}
    </Link>
  )
}

export default Tag
