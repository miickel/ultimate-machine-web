import React from 'react'
import {Link} from 'gatsby'
import Layout from '../../components/Layout.js'

const NewsletterExpired = () => {
  return (
    <Layout>
      <h1>Link Expired</h1>
      <p>
        <strong>The verification link is no longer valid.</strong>
      </p>
      <img
        className="full-width"
        src="https://media.giphy.com/media/Nm8ZPAGOwZUQM/giphy.gif"
        alt="Surprised cat"
      />
      <p>
        Please try to <Link to="/newsletter">subscribe</Link> again. The link in
        the verification email sent to you immediately when subscribing expires
        2 days after being sent.
      </p>
      <p>Thanks!</p>
    </Layout>
  )
}

export default NewsletterExpired
