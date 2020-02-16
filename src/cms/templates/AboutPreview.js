import React from 'react'
import {AboutTemplate} from '../../templates/About.js'

const ArticlePreview = ({entry, widgetFor}) => {
  return (
    <AboutTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
    />
  )
}

export default ArticlePreview
