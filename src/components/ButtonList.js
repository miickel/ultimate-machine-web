import React from "react"
import styles from "./ButtonList.module.sass"

const ButtonList = ({ children }) => {
  return (
    <ul className={styles.buttons}>
      {children.map((Child, i) => (
        <li key={`bl-${i}`}>{Child}</li>
      ))}
    </ul>
  )
}

export default ButtonList
