import React from "react"
import { Link } from "gatsby"
import Container from "./Container.js"
import Logo from "./Logo.js"
import NavMenu from "./NavMenu.js"
import styles from "./Header.module.sass"

const Header = ({ isDarkMode, onDarkModeToggle }) => {
  return (
    <div className={styles.header}>
      <div className={styles.line} />
      <Container className={styles.container}>
        <Link to="/">
          <Logo />
        </Link>
        <NavMenu isDarkMode={isDarkMode} onDarkModeToggle={onDarkModeToggle} />
      </Container>
    </div>
  )
}

export default Header
