import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoutes from './components/ProtectedRoutes'
import { AuthProvider } from './contexts/AuthContext'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SendMoney from './pages/SendMoney'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main className="p-5 md:mt-10">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/send" element={<SendMoney />} />
            </Route>
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  )
}
