import React from "react"
import { BlogPostTemplate } from "../../templates/BlogPost.js"

const BlogPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"])
  return (
    <BlogPostTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  )
}

export default BlogPostPreview
