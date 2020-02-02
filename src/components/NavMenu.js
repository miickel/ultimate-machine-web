import React from "react"
import { Link } from "gatsby"
import ButtonList from "./ButtonList.js"
import Button from "./Button.js"
import styles from "./NavMenu.module.sass"

const links = [
  { title: "Products", url: "/products" },
  { title: "Articles", url: "/articles" },
  { title: "About", url: "/about" },
]

const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <ButtonList>
        {links.map(({ title, url }) => (
          <Button Elem={Link} to={url} key={`nav-link-${url}`}>
            {title}
          </Button>
        ))}
      </ButtonList>
    </nav>
  )
}

export default NavMenu
