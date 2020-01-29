import React from "react"
import { Link } from "gatsby"
import styles from "./NavMenu.module.sass"

const links = [
  { title: "Products", url: "/products" },
  { title: "Articles", url: "/articles" },
  { title: "About", url: "/about" },
]

const NavMenu = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        {links.map(({ title, url }) => (
          <li key={`nav-link-${url}`}>
            <Link to={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavMenu
