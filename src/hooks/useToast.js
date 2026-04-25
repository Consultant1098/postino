import { useState, useCallback, useRef } from 'react'

// Singleton pattern — shared across the app via module-level state
let _setToastFn = null

export function useToastProvider() {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  _setToastFn = useCallback((message, type = '') => {
    clearTimeout(timerRef.current)
    setToast({ message, type })
    timerRef.current = setTimeout(() => setToast(null), 3500)
  }, [])

  return { toast }
}

export function useToast() {
  return {
    showToast: (message, type = '') => {
      if (_setToastFn) _setToastFn(message, type)
    },
  }
}
