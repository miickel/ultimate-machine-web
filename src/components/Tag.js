import React from 'react'
import styles from './Tag.module.sass'

const Tag = ({children}) => {
  const Elem = 'div'
  return <Elem className={styles.tag}>{children}</Elem>
}

export default Tag
