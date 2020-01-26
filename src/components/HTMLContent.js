import React from "react"

const HTMLContent = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ _html: content }} />
}

export default HTMLContent
