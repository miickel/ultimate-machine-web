import React from 'react'
import classnames from 'classnames'
import styles from './Button.module.sass'

const Button = ({Elem = 'button', className, children, ...props}) => {
  const cl = classnames(
    {
      [styles.button]: true,
    },
    className
  )

  return (
    <Elem className={cl} {...props}>
      {children}
    </Elem>
  )
}

export default Button
