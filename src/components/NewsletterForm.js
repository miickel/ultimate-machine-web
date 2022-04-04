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
  const [name, setName] = useState('')
  const [state, setState] = useState(states.idle)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!email || !name) return
    setState(states.submitting)
    try {
      await newsletterSubscribe(email, name)
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
          <strong>Check your email!</strong>{' '}
          <span role="img" aria-label="E-mail letter">
            ✉️
          </span>{' '}
          <span role="img" aria-label="Eyes looking at letter">
            👀
          </span>
          <br />
          Click the link in the email sent to you to{' '}
          <strong>confirm your subscription</strong>.<br />
          The link expires in 14 days from now.
        </p>
        <p>
          <strong>Fun fact:</strong> Roughly 47% who submitted their email did
          not verify. Will you?
        </p>
        <p>
          <strong>Psst!</strong> Also check your Spam folder, just in case!{' '}
          <span role="img" aria-label="Checkmark">
            ✅
          </span>
        </p>
      </div>
    )

  return (
    <>
      <p>
        Get my best content by email. Emails are sent out no more than once a month. Your email address is safe and will not be shared with 3rd parties.
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={state === states.submitting}>
          <label>
            <span>E-mail address</span>
            <input
              type="email"
              value={email}
              required
              onChange={e => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>First name</span>
            <input
              type="text"
              value={name}
              required
              onChange={e => setName(e.target.value)}
            />
          </label>
          <div className="buttons">
            <SubmitButton
              type="submit"
              isSubmitting={state === states.submitting}
              disabled={!Boolean(email) || !Boolean(name)}
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
