import React from "react"
import classnames from "classnames"
import styles from "./Container.module.sass"

const Container = ({ children, className, ...props }) => {
  const cl = classnames(
    {
      [styles.container]: true,
    },
    className
  )
  return <div className={cl}>{children}</div>
}

export default Container
