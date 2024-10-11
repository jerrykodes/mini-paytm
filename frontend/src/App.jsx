import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import Navbar from './Navbar'

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' index element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/send' element={<SendMoney />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
