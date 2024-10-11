import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className="flex space-x-2 bg-gray-100 p-5">
      <Link to={'/'}>Home</Link>
      <Link to={'/login'}>Login</Link>
      <Link to={'/register'}>Register</Link>
      <Link to={'/dashboard'}>Dashboard</Link>
    </div>
  )
}
