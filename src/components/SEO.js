import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import {useStaticQuery, graphql} from 'gatsby'

function SEO({description, lang, meta, title, socialImage}) {
  const {site} = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

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
      ]
    : []

  const metaTags = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: ogMeta.length === 0 ? 'summary' : 'summary_large_image',
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
    ...ogMeta,
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

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  socialImage: PropTypes.object,
}

export default SEO
