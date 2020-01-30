import React from "react"
import Container from "./Container.js"
import LogoIcon from "./LogoIcon.js"
import styles from "./Footer.module.sass"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <ul>
          <li>
            <a href={`https://github.com/miickel/um-blog/tree/master/src`}>
              Discuss on Twitter
            </a>
          </li>
          <li>
            <a href={`https://github.com/miickel/um-blog/tree/master/src`}>
              Edit on GitHub
            </a>
          </li>
          <li>
            <a href={`https://github.com/miickel/um-blog/tree/master/src`}>
              Get in touch
            </a>
          </li>
        </ul>
        <LogoIcon />
      </Container>
    </footer>
  )
}

export default Footer
