import React from 'react'
import Tag from './Tag.js'
import styles from './TagList.module.sass'

const TagList = ({tags, linkFn}) => {
  if (!tags || tags.length === 0) return null

  const getProps = tag => (linkFn ? {to: linkFn(tag)} : {})

  return (
    <ul className={styles.list}>
      {tags.map(tag => (
        <li key={`tag-${tag}`}>
          <Tag {...getProps(tag)}>{tag}</Tag>
        </li>
      ))}
    </ul>
  )
}

export default TagList
