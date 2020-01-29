import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../utils/prism-theme.css"
import "./Layout.sass"
import Header from "./Header.js"
import Container from "./Container.js"

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
      <Header />
      <Container>
        <main>{children}</main>
      </Container>
      <footer>
        © {new Date().getFullYear()}
        {` `}
        <a href="https://www.ultimatemachine.se">Ultimate Machine</a>
        <button onClick={() => setDarkMode(!isDarkMode)}>
          {isDarkMode ? "Light" : "Dark"}
        </button>
      </footer>
    </>
  )
}

export default Layout
