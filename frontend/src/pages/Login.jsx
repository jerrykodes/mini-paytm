import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/forms/ErrorMessage'
import useAuthContext from '../hooks/useAuthContext'

export default function LoginForm() {
  const [email, setEmail] = useState('mark.freeman@test.com')
  const [password, setPassword] = useState('')
  const { loginUser, isLoading, error } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      return
    }

    const loggedIn = await loginUser({ email, password })

    if (loggedIn) {
      navigate('/dashboard')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-4 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl">Login</h2>

      {error && <ErrorMessage message={error} />}

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="input input-bordered w-full"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="input input-bordered w-full"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in!!' : 'Sign In'}
        </button>
      </div>
    </form>
  )
}
