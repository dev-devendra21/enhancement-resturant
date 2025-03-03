import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const {history} = props

  const submitForm = async () => {
    const data = {username, password}
    const options = {
      method: 'Post',
      body: JSON.stringify(data),
    }
    const res = await fetch('https://apis.ccbp.in/login', options)
    const result = await res.json()
    if (res.ok) {
      setError('')
      Cookies.set('jwt_token', result.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      setError(result.error_msg)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    submitForm()
  }
  const token = Cookies.get('jwt_token')
  if (token) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-bg-container">
      <div className="form-card-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="username-container">
            <label className="label-text" htmlFor="username">
              USERNAME
            </label>
            <input
              placeholder="Username"
              id="username"
              type="text"
              value={username}
              className="input"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="password-container">
            <label className="label-text" htmlFor="password">
              PASSWORD
            </label>
            <input
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              className="input"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {error ? <p className="error-msg">{error}</p> : ''}
        </form>
      </div>
    </div>
  )
}

export default Login
