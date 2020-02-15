import React from "react"
import { Link } from "gatsby"
import Container from "./Container.js"
import LogoIcon from "./LogoIcon.js"
import styles from "./Footer.module.sass"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <hr />
        <ul>
          <li>
            <a href={`https://github.com/miickel/um-blog/tree/master/src`}>
              Discuss on <strong>Twitter</strong>
            </a>
          </li>
          <li>
            <a href={`https://github.com/miickel/um-blog/tree/master/src`}>
              Edit on <strong>GitHub</strong>
            </a>
          </li>
          <li>
            <a href={`https://github.com/miickel/um-blog/tree/master/src`}>
              Send an <strong>E-mail</strong>
            </a>
          </li>
        </ul>
        <Link to="/" title="Ultimate Machine">
          <LogoIcon alt="Ultimate Machine logo icon" />
        </Link>
      </Container>
    </footer>
  )
}

export default Footer
