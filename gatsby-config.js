module.exports = {
  siteMetadata: {
    title: 'Ultimate Machine',
    description: 'Personal blog by Mickel Andersson.',
    authorName: 'Mickel Andersson',
    authorTwitter: '@miickel',
    authorUrl: 'https://twitter.com/miickel',
    siteUrl: 'https://ultimatemachine.se',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            title: 'Ultimate Machine | Articles',
            output: '/articles.xml',
            serialize: serializeRssItems,
            query: `
              {
                allMarkdownRemark(
                  sort: {order: DESC, fields: [frontmatter___date]}
                  filter: {frontmatter: {template: {eq: "BlogPost"}}}
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        description
                        date
                      }
                    }
                  }
                }
              }
            `,
          },
          {
            title: 'Ultimate Machine | Products',
            output: '/products.xml',
            serialize: serializeRssItems,
            query: `
              {
                allMarkdownRemark(
                  sort: {order: DESC, fields: [frontmatter___startDate]}
                  filter: {frontmatter: {template: {eq: "Product"}}}
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        description
                        date: startDate
                      }
                    }
                  }
                }
              }
            `,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-158821676-1',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
        name: 'images',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ultimate-machine-web`,
        short_name: `um-web`,
        start_url: `/`,
        background_color: `#1C2A3E`,
        theme_color: `#8BFFAC`,
        display: `minimal-ui`,
        icon: `src/images/ultimate-machine-favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 668,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 700,
              withWebp: {
                quality: 80,
              },
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '+',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

function serializeRssItems({query: {site, allMarkdownRemark}}) {
  return allMarkdownRemark.edges.map(({node}) => ({
    ...node.frontmatter,
    url: site.siteMetadata.siteUrl + node.fields.slug,
    guid: site.siteMetadata.siteUrl + node.fields.slug,
    custom_elements: [
      {
        'content:encoded': node.html,
      },
    ],
  }))
}
