import { createContext, useState } from 'react'
import { axiosInstance } from '../libs/utils'

const initialState = {
  user: null,
  isLoading: false,
  error: '',
  loginUser: async () => {},
  registerUser: async () => {},
  logoutUser: async () => {},
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const loginUser = async ({ email, password }) => {
    try {
      setIsLoading(true)
      setError(null)

      const res = await axiosInstance.post('/auth/login', { email, password })
      setUser(res.data.user)

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      return res.data.type === 'success'
    } catch (error) {
      setError('Error while logging in!!!')
    } finally {
      setIsLoading(false)
    }
  }

  const registerUser = async ({ firstName, lastName, email, password }) => {
    try {
      setIsLoading(true)
      setError(null)

      const res = await axiosInstance.post('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      })

      setUser(res.data.user)

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      return res.data.type === 'success'
    } catch (error) {
      setError('Error while registering user!!!')
    } finally {
      setIsLoading(false)
    }
  }

  const logoutUser = async () => {
    setIsLoading(false)
    setError(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, loginUser, registerUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
