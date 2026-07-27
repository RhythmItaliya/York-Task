import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { seedDemoAccount } from './lib/mockAuth'

function App() {
  useEffect(() => {
    seedDemoAccount()
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/resume" element={<Dashboard />} />
      <Route path="/profile" element={<Dashboard />} />
      <Route path="/agent" element={<Dashboard />} />
      <Route path="/coaching" element={<Dashboard />} />
      <Route path="/interview" element={<Dashboard />} />
    </Routes>
  )
}

export default App
