import React from 'react'
import Button from './Button.js'
import LightSpinner from './LightSpinner.js'

const SubmitButton = ({isSubmitting, children, ...props}) => {
  const Spinner = isSubmitting && <LightSpinner size={16} />

  return (
    <Button {...props}>
      {Spinner}
      {children}
    </Button>
  )
}

export default SubmitButton
