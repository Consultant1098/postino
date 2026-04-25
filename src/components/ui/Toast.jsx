import { useToastProvider } from '@/hooks/useToast'
import styles from './Toast.module.css'

export function ToastProvider() {
  const { toast } = useToastProvider()
  if (!toast) return null
  return (
    <div className={[styles.toast, toast.type ? styles[toast.type] : ''].join(' ')}>
      {toast.message}
    </div>
  )
}
