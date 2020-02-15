import React from 'react'

const HTMLContent = ({content}) => {
  return <div dangerouslySetInnerHTML={{__html: content}} />
}

export default HTMLContent
