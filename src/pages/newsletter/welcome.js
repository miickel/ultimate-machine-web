import React from 'react'
import {Link} from 'gatsby'
import Layout from '../../components/Layout.js'

const NewsletterWelcome = () => {
  return (
    <Layout>
      <h1>All Set</h1>
      <p>
        <strong>Thanks for confirming your e-mail address.</strong>
      </p>
      <img
        className="full-width"
        src="https://media.giphy.com/media/KI5JqBqOKCPjG/giphy.gif"
        alt="Surprised cat"
      />
      <p>
        You are now subscribed to the <Link to="/newsletter">newsletter</Link>{' '}
        and can expect to get the next one. I try to keep a fairly consistent
        schedule of at least one e-mail a month.
      </p>
      <p>Talk to you soon!</p>
    </Layout>
  )
}

export default NewsletterWelcome
