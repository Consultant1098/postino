import { useState, useEffect } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, googleProvider } from '@/config/firebase'

export function useAuth() {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return unsub
  }, [])

  const clearError = () => setError(null)

  const loginWithEmail = async (email, password) => {
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(friendlyError(err.code))
    }
  }

  const signupWithEmail = async (email, password) => {
    setError(null)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError(friendlyError(err.code))
    }
  }

  const loginWithGoogle = async () => {
    setError(null)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(friendlyError(err.code))
      }
    }
  }

  const logout = () => signOut(auth)

  return { user, loading, error, clearError, loginWithEmail, signupWithEmail, loginWithGoogle, logout }
}

function friendlyError(code) {
  const MAP = {
    'auth/user-not-found':        'No account found with this email.',
    'auth/wrong-password':        'Incorrect password.',
    'auth/invalid-email':         'Please enter a valid email address.',
    'auth/email-already-in-use':  'An account with this email already exists.',
    'auth/weak-password':         'Password must be at least 6 characters.',
    'auth/too-many-requests':     'Too many attempts. Please try again later.',
    'auth/network-request-failed':'Network error. Check your connection.',
  }
  return MAP[code] ?? 'Something went wrong. Please try again.'
}
