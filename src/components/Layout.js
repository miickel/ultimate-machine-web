import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import "./Layout.sass"

const Layout = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.className = isDarkMode ? "theme--dark" : "theme--light"
  }, [isDarkMode])

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
      <div
        style={{
          margin: `30px auto`,
          maxWidth: 680,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}
          {` `}
          <a href="https://www.ultimatemachine.se">Ultimate Machine</a>
          <button onClick={() => setDarkMode(!isDarkMode)}>
            {isDarkMode ? "Light" : "Dark"}
          </button>
        </footer>
      </div>
    </>
  )
}

export default Layout
