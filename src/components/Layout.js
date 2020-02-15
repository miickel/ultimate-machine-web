import React, { useEffect, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import "../utils/prism-theme.css"
import "./Layout.sass"
import Header from "./Header.js"
import Footer from "./Footer.js"
import SEO from "./SEO.js"
import Container from "./Container.js"

const DARK_SIDE = "um-theme-dark"

const Layout = ({ children }) => {
  const [isDarkMode, setDarkMode] = useState()

  useEffect(() => {
    const detectDarkMode = () => {
      const ls = localStorage.getItem(DARK_SIDE)
      if (ls) return ls === "true"
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      )
    }
    setDarkMode(detectDarkMode())
  }, [])

  useEffect(() => {
    document.body.className = isDarkMode ? "theme--dark" : "theme--light"
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem(DARK_SIDE, isDarkMode)
  }, [isDarkMode])

  const {
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <>
      <SEO title={null} />
      <Header
        isDarkMode={isDarkMode}
        onDarkModeToggle={() => setDarkMode(!isDarkMode)}
      />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  )
}

export default Layout
