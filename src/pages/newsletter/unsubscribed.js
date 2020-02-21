import React from 'react'
import {Link} from 'gatsby'
import Layout from '../../components/Layout.js'

const NewsletterUnsubscribed = () => {
  return (
    <Layout>
      <h1>Unsubscribed</h1>
      <p>
        <strong>You are unsubscribed. The sadness!</strong>
      </p>
      <img
        className="full-width"
        src="https://media.giphy.com/media/KcW2FVEJnzKeiZkVI1/giphy.gif"
        alt="Sad cat"
      />
      <p>
        Feel free to join the <Link to="/newsletter">newsletter</Link> again,
        whenever you like. I'm also on{' '}
        <a href="https://twitter.com/miickel">twitter/miickel</a>, if email is
        not your jam.
      </p>
      <p>
        Check out the <Link to="/newsletter/archive">newsletter archive</Link>{' '}
        if you feel nostalgic.
      </p>
    </Layout>
  )
}

export default NewsletterUnsubscribed
