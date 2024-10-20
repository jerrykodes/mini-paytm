import { Link } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'

export default function Navbar() {
  const { user, logoutUser } = useAuthContext()

  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl normal-case">
          Mini PayTM
        </Link>
      </div>
      <div className="flex-none">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/dashboard" className="justify-between">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/send">Send Money</Link>
              </li>
              <li>
                <button onClick={logoutUser}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
