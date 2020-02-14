import React from "react"

const Content = ({ content, ...props }) => {
  return <div {...props}>{content}</div>
}

export default Content
