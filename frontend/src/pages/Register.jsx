import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/forms/ErrorMessage'
import useAuthContext from '../hooks/useAuthContext'

export default function RegisterForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { registerUser, isLoading, error } = useAuthContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!firstName || !lastName || !email || !password) {
      return
    }

    const registered = await registerUser({
      firstName,
      lastName,
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
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          className="input input-bordered w-full"
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          className="input input-bordered w-full"
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
