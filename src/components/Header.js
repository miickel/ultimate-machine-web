import React from "react"
import { Link } from "gatsby"
import Container from "./Container.js"
import Logo from "./Logo.js"
import LogoIcon from "./LogoIcon.js"
import NavMenu from "./NavMenu.js"
import styles from "./Header.module.sass"

const Header = ({ isDarkMode, onDarkModeToggle }) => {
  return (
    <div className={styles.header}>
      <div className={styles.line} />
      <Container className={styles.container}>
        <Link to="/" className={styles.logo} title="Ultimate Machine">
          <Logo alt="Ultimate Machine logo" />
          <LogoIcon alt="Ultimate Machine logo icon" />
        </Link>
        <NavMenu isDarkMode={isDarkMode} onDarkModeToggle={onDarkModeToggle} />
      </Container>
    </div>
  )
}

export default Header
