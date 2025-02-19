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
      Cookies.set('token', result.jwt_token, {expires: 1})
      history.replace('/')
    } else {
      setError(result.error_msg)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    submitForm()
  }
  const token = Cookies.get('token')
  if (token) {
    return <Redirect to="/" />
  }
  return (
    <div className="container">
      <main>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter Your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="error-msg">{error || ''}</p>
          <div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Login
