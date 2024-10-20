import { createContext, useState } from 'react'
import { axiosInstance } from '../libs/utils'

const initialState = {
  user: null,
  isLoading: false,
  error: '',
}

export const AuthContext = createContext(initialState)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const signin = async (email, password) => {
    try {
      setIsLoading(true)
      setError(null)

      const res = await axiosInstance.post('/auth/login', { email, password })
      setUser(res.data.user)
      localStorage.setItem('token', res.data.token)
    } catch (error) {
      setError('Error while logging in!!!')
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async () => {}

  const logout = async () => {
    setIsLoading(true)
    setError(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, signin, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
