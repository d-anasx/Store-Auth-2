import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const AuthPage = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.isAuthenticated)
  const [error , setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ email, password }))
    isLoggedIn ? nav('/'): setError('Invalid email or password')
    console.log(isLoggedIn)
    setEmail('')
    setPassword('')
  }


  const handleLogout = () => {
    dispatch(logout())
    nav('/')
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      {isLoggedIn ? (
        <button onClick={handleLogout} className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors">
          Logout
        </button>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
              />
              {error.length > 0 && <p className="text-red-500">{error}</p>}
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
              Login
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default AuthPage
