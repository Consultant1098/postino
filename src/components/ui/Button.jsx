import styles from './Button.module.css'

export function Button({ children, variant = 'primary', size = 'md', disabled, loading, onClick, className = '', ...props }) {
  return (
    <button
      className={[styles.btn, styles[variant], styles[size], className].filter(Boolean).join(' ')}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.spinner} />}
      {children}
    </button>
  )
}
