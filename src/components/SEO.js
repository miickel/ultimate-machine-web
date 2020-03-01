import React, {useEffect, useState} from 'react'
import Helmet from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'

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
  const [fallbackPathname, setFallbackPathname] = useState()

  useEffect(() => {
    if (!pathname) {
      setFallbackPathname(window.location.pathname)
    }
  }, [pathname])

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

  const canonicalUrl = `${site.siteMetadata.siteUrl}${pathname ||
    fallbackPathname}`

  const metaDescription = description || site.siteMetadata.description

  const ogMeta = socialImage
    ? [
        {
          name: 'og:image',
          content: `${site.siteMetadata.siteUrl}${socialImage.childImageSharp.fluid.src}`,
        },
        {
          name: 'og:image:width',
          content: socialImage.childImageSharp.fluid.presentationWidth,
        },
        {
          name: 'og:image:height',
          content: socialImage.childImageSharp.fluid.presentationHeight,
        },
        {
          name: 'image',
          content: `${site.siteMetadata.siteUrl}${socialImage.childImageSharp.fluid.src}`,
        },
      ]
    : []

  let ogAuthor = []

  if (type === 'article') {
    ogAuthor = [
      {
        name: 'article:publisher',
        content: site.siteMetadata.siteUrl,
      },
      {
        name: 'article:author',
        content: site.siteMetadata.authorUrl,
      },
      {
        name: 'article:published_time',
        content: publishDate,
      },
      {
        name: 'article:modified_time',
        content: site.buildTime,
      },
      ...tags.map(tag => ({
        name: 'article:tag',
        content: tag,
      })),
    ]
    if (tags.length !== 0) {
      ogAuthor.push({
        name: 'article:section',
        content: tags[tags.length - 1],
      })
    }
  }

  const metaTags = [
    {
      name: 'description',
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
      property: 'og:description',
      content: metaDescription,
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
