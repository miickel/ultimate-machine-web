import React, {useEffect, useState} from 'react'
import '../utils/prism-theme.css'
import './Layout.sass'
import Header from './Header.js'
import Footer from './Footer.js'
import SEO from './SEO.js'
import Container from './Container.js'

const isWindowThemeDark = () => window.__theme === 'theme--dark'

const Layout = ({children}) => {
  const [isDarkMode, setDarkMode] = useState(isWindowThemeDark())

  useEffect(() => {
    const checkTheme = () => setDarkMode(isWindowThemeDark())
    window.onThemeChange = checkTheme
    checkTheme()
    return () => (window.onThemeChange = () => {})
  }, [])

  return (
    <>
      <SEO title={null} />
      <Header
        isDarkMode={isDarkMode}
        onDarkModeToggle={() =>
          window.setTheme(isDarkMode ? 'theme--light' : 'theme--dark')
        }
      />
      <Container>
        <main>{children}</main>
      </Container>
      <Footer />
    </>
  )
}

export default Layout
