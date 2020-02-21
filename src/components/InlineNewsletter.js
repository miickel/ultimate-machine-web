import React from 'react'
import NewsletterForm from './NewsletterForm.js'
import styles from './InlineNewsletter.module.sass'

const InlineNewsletter = () => {
  return (
    <div className={styles.wrap}>
      <div>
        <h3>Newsletter</h3>
        <NewsletterForm />
      </div>
    </div>
  )
}

export default InlineNewsletter
