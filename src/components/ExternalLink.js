import React from 'react'
import classnames from 'classnames'
import {MdOpenInBrowser} from 'react-icons/md'
import styles from './ExternalLink.module.sass'

const getHostname = url => {
  if (!url) return
  const u = new URL(url)
  return u.hostname
}

const ExternalLink = ({href, prefix, className, children, ...props}) => {
  const cl = classnames(
    {
      [styles.link]: true,
    },
    className
  )

  return (
    <a
      href={href}
      {...props}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={cl}
    >
      <MdOpenInBrowser /> {prefix}
      {children || getHostname(href)}
    </a>
  )
}

export default ExternalLink
