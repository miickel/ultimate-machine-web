import React from 'react'
import classnames from 'classnames'
import styles from './ButtonList.module.sass'

const ButtonList = ({children, className}) => {
  const cl = classnames(
    {
      [styles.buttons]: true,
    },
    className
  )
  return (
    <ul className={cl}>
      {children.map((Child, i) => (
        <li key={`bl-${i}`}>{Child}</li>
      ))}
    </ul>
  )
}

export default ButtonList
