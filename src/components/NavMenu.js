import React from "react"
import { Link } from "gatsby"
import ButtonList from "./ButtonList.js"
import Button from "./Button.js"
import DarkModeToggle from "./DarkModeToggle.js"
import styles from "./NavMenu.module.sass"

const links = [
  { title: "Products", url: "/products" },
  { title: "Articles", url: "/articles" },
  { title: "About", url: "/about" },
  { ls: true },
]

const NavMenu = ({ isDarkMode, onDarkModeToggle }) => {
  return (
    <nav className={styles.nav}>
      <ButtonList className={styles.list}>
        {links.map(({ title, url, ls }) =>
          ls ? (
            <DarkModeToggle
              key="lights"
              isDarkMode={isDarkMode}
              onToggle={onDarkModeToggle}
            />
          ) : (
            <Button Elem={Link} to={url} key={`nav-link-${url}`}>
              {title}
            </Button>
          )
        )}
      </ButtonList>
    </nav>
  )
}

export default NavMenu
