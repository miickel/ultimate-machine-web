import React, {useState} from 'react'
import SubmitButton from './SubmitButton.js'
import {newsletterSubscribe} from '../api.js'

const states = {
  idle: 'idle',
  submitting: 'submitting',
  submitted: 'submitted',
}

const NewsletterForm = () => {
  const [email, setEmail] = useState('')
  const [state, setState] = useState(states.idle)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email) return
    setState(states.submitting)
    try {
      await newsletterSubscribe(email)
      setState(states.submitted)
    } catch (err) {
      alert(`Could not subscribe ${email}. Perhaps you are already subscribed?`)
      setState(states.idle)
    }
  }

  if (state === states.submitted)
    return (
      <div>
        <p>
          <strong>Check your email!</strong> ✉️ 👀
          <br />
          Click the link in the email sent to you to{' '}
          <strong>confirm your subscription</strong>.<br />
          The link expires in 2 days from now.
        </p>
        <p>
          <strong>Psst!</strong> Also check your Spam folder, just in case! ✅
        </p>
      </div>
    )

  return (
    <>
      <p>
        Get my <strong>best content</strong> by email.
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={state === states.submitting}>
          <label>
            <span>E-mail address</span>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <div className="buttons">
            <SubmitButton
              type="submit"
              isSubmitting={state === states.submitting}
              disabled={!Boolean(email)}
            >
              Subscribe
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </>
  )
}

export default NewsletterForm
