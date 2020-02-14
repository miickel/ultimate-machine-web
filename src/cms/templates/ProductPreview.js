import React from "react"
import { ProductTemplate } from "../../templates/Product.js"

const ProductPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"])
  return (
    <ProductTemplate
      title={entry.getIn(["data", "title"])}
      description={entry.getIn(["data", "description"])}
      tags={tags && tags.toJS()}
      content={widgetFor("body")}
    />
  )
}

export default ProductPreview
