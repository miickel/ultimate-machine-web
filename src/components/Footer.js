import React from 'react'
import {Link} from 'gatsby'
import Obfuscate from 'react-obfuscate'
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
              href={`https://github.com/miickel/um-blog/tree/master/src`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Discuss on <strong>Twitter</strong>
            </a>
          </li>
          <li>
            <a
              href={`https://github.com/miickel/um-blog/tree/master/src`}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Edit on <strong>GitHub</strong>
            </a>
          </li>
          <li>
            <Obfuscate
              obfuscateChildren={false}
              email="mickel@ultimatemachine.se"
              headers={{
                body: '\n\n\nSent via ultimatemachine.se',
              }}
            >
              Send an <strong>E-mail</strong>
            </Obfuscate>
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
