import React from "react"
import Tag from "./Tag.js"
import styles from "./TagList.module.sass"

const TagList = ({ tags }) => {
  return (
    <ul className={styles.list}>
      {tags.map(tag => (
        <li key={`tag-${tag}`}>
          <Tag>{tag}</Tag>
        </li>
      ))}
    </ul>
  )
}

export default TagList
