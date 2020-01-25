import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <h1>{data.site.siteMetadata.title}</h1>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}
          {` `}
          <a href="https://www.ultimatemachine.se">Ultimate Machine</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
