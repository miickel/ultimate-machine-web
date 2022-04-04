import React from 'react'
import {Link} from 'gatsby'
import Container from './Container.js'
import LogoIcon from './LogoIcon.js'
import styles from './Footer.module.sass'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <hr />
        <ul>
          <li>
            <a
              href={`https://twitter.com/miickel`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Discuss on <strong>Twitter</strong>
            </a>
          </li>
          <li>
            <a
              href={`https://github.com/miickel/ultimate-machine-web`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Edit on <strong>GitHub</strong>
            </a>
          </li>
          <li>
            <a
              href={`https://aemail.com/pggy`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
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
