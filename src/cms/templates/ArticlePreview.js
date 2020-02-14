import React from "react"
import { BlogPostTemplate } from "../../templates/BlogPost.js"

const ArticlePreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"])
  return (
    <BlogPostTemplate
      title={entry.getIn(["data", "title"])}
      description={entry.getIn(["data", "description"])}
      tags={tags && tags.toJS()}
      content={widgetFor("body")}
    />
  )
}

export default ArticlePreview
