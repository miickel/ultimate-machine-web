import React from 'react'
import classnames from 'classnames'
import styles from './LightSpinner.module.sass'

const LightSpinner = ({size = 24, thickness = 4, className, ...props}) => (
  <div
    className={classnames(styles.spinner, className)}
    style={{
      width: size,
      height: size,
      borderWidth: thickness,
    }}
    {...props}
  />
)

export default LightSpinner
