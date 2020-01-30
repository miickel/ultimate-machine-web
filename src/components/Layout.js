import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../utils/prism-theme.css"
import "./Layout.sass"
import Header from "./Header.js"
import Footer from "./Footer.js"
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
      <Footer />
    </>
  )
}

export default Layout
