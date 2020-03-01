import React from 'react'
import Helmet from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'
import {globalHistory} from '@reach/router'

function SEO({
  description = '',
  lang = 'en',
  meta = [],
  title,
  socialImage,
  type = 'website',
  pathname,
  publishDate,
  tags = [],
}) {
  const {site} = useStaticQuery(
    graphql`
      query {
        site {
          buildTime
          siteMetadata {
            title
            description
            authorName
            authorTwitter
            authorUrl
            siteUrl
          }
        }
      }
    `
  )

  const canonicalUrl = `${site.siteMetadata.siteUrl}${
    pathname ? pathname : globalHistory.location.pathname
  }`

  const metaDescription = description || site.siteMetadata.description

  let ogMeta = []

  if (socialImage) {
    ogMeta = [
      {
        name: 'image',
        property: 'og:image',
        content: `${site.siteMetadata.siteUrl}${socialImage.childImageSharp.fluid.src}`,
      },
      {
        property: 'og:image:width',
        content: socialImage.childImageSharp.fluid.presentationWidth,
      },
      {
        property: 'og:image:height',
        content: socialImage.childImageSharp.fluid.presentationHeight,
      },
      {
        name: 'twitter:image',
        content: `${site.siteMetadata.siteUrl}${socialImage.childImageSharp.fluid.src}`,
      },
    ]
  }

  let ogAuthor = []

  if (type === 'article') {
    ogAuthor = [
      {
        property: 'article:publisher',
        content: site.siteMetadata.siteUrl,
      },
      {
        property: 'article:author',
        content: site.siteMetadata.authorUrl,
      },
      {
        property: 'article:published_time',
        content: publishDate,
      },
      {
        property: 'article:modified_time',
        content: site.buildTime,
      },
      ...tags.map(tag => ({
        property: 'article:tag',
        content: tag,
      })),
    ]
    if (tags.length !== 0) {
      ogAuthor.push({
        property: 'article:section',
        content: tags[tags.length - 1],
      })
    }
  }

  const metaTags = [
    {
      name: 'description',
      property: 'og:description',
      content: metaDescription,
    },
    {
      name: 'author',
      content: site.siteMetadata.authorName,
    },

    // Open Graph
    {
      property: 'og:type',
      content: type,
    },
    {
      property: 'og:title',
      content: title,
    },
    {
      property: 'og:site_name',
      content: site.siteMetadata.title,
    },
    {
      property: 'og:locale',
      content: lang,
    },
    {
      property: 'og:url',
      content: canonicalUrl,
    },

    // Twitter
    {
      name: 'twitter:card',
      content: ogMeta.length === 0 ? 'summary' : 'summary_large_image',
    },
    {
      name: 'twitter:creator',
      content: site.siteMetadata.authorTwitter,
    },
    {
      name: 'twitter:title',
      content: title,
    },
    {
      name: 'twitter:description',
      content: metaDescription,
    },

    // Extras
    ...ogMeta,
    ...ogAuthor,
    ...meta,
  ]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title ? title : site.siteMetadata.title}
      titleTemplate={title ? `%s | ${site.siteMetadata.title}` : `%s`}
      meta={metaTags}
    />
  )
}

export default SEO
