import { Link } from 'react-router-dom'

export default function Navbar() {
	return (
		<div className='flex p-5 space-x-2 bg-gray-100'>
			<Link to={'/'}>Home</Link>
			<Link to={'/login'}>Login</Link>
			<Link to={'/register'}>Register</Link>
			<Link to={'/dashboard'}>Dashboard</Link>
		</div>
	)
}
