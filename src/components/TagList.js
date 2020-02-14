import React from "react"
import { Link } from "gatsby"
import Tag from "./Tag.js"
import styles from "./TagList.module.sass"

const TagList = ({ tags, linkFn }) => {
  if (!tags || tags.length === 0) return null

  const El = linkFn ? Link : "span"

  const getProps = tag => {
    const props = {
      key: `tag-${tag}`,
    }
    return linkFn
      ? {
          ...props,
          to: linkFn(tag),
        }
      : props
  }

  return (
    <ul className={styles.list}>
      {tags.map(tag => (
        <li>
          <El {...getProps(tag)}>
            <Tag>{tag}</Tag>
          </El>
        </li>
      ))}
    </ul>
  )
}

export default TagList
