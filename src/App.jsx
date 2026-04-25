import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth }      from '@/hooks/useAuth'
import { LoginPage }   from '@/pages/LoginPage'
import { EditorPage }  from '@/pages/EditorPage'
import { ToastProvider } from '@/components/ui/Toast'

function AuthGuard({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Loader />
  if (!user)   return <Navigate to="/login" replace />
  return children
}

function GuestGuard({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Loader />
  if (user)    return <Navigate to="/" replace />
  return children
}

function Loader() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 28, height: 28,
        border: '2px solid rgba(232,184,75,0.2)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider />
      <Routes>
        <Route path="/login" element={
          <GuestGuard><LoginPage /></GuestGuard>
        } />
        <Route path="/" element={
          <AuthGuard><EditorPage /></AuthGuard>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
