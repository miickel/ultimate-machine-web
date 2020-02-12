import React from "react"
import classnames from "classnames"
import styles from "./Card.module.sass"

const Card = ({ children, className, Elem = "a", ...props }) => {
  const cl = classnames(
    {
      [styles.card]: true,
    },
    className
  )
  return (
    <Elem className={cl} {...props}>
      {children}
    </Elem>
  )
}

export default Card
