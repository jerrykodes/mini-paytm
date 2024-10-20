import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/forms/ErrorMessage'
import useAuthContext from '../hooks/useAuthContext'

export default function RegisterForm() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { registerUser, isLoading, error } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstname || !lastname || !email || !password) {
      return
    }

    const registered = await registerUser({
      firstname,
      lastname,
      email,
      password,
    })

    if (registered) {
      navigate('/dashboard')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mb-4 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl">Register</h2>

      {error && <ErrorMessage message={error} />}

      {/* First Name */}
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="firstname"
        >
          First Name
        </label>
        <input
          className="input input-bordered w-full"
          id="firstname"
          type="text"
          placeholder="Enter your first name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="lastname"
        >
          Last Name
        </label>
        <input
          className="input input-bordered w-full"
          id="lastname"
          type="text"
          placeholder="Enter your last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
      </div>

      {/* Email */}
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

      {/* Password */}
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

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </form>
  )
}
