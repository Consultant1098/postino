import { useSettingsStore } from '@/store/settingsStore'
import { useEditorStore }   from '@/store/editorStore'
import { PROVIDERS }         from '@/config/providers'
import styles from './Topbar.module.css'

export function Topbar({ user, onLogout }) {
  const { provider, model, drawerOpen, toggleDrawer } = useSettingsStore()
  const { loading } = useEditorStore()

  const shortModel = model.split('/').pop().split('-').slice(0, 3).join('-')
  const initial    = user?.email?.[0]?.toUpperCase() ?? 'U'

  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        <div className={styles.logoRing}>
          <span className={styles.logoP}>P</span>
        </div>
        <span className={styles.brandName}>Postino</span>
        <span className={styles.betaTag}>Beta</span>
      </div>

      <div className={styles.right}>
        {model && (
          <span className={styles.modelChip}>
            {PROVIDERS[provider]?.label} · {shortModel}
          </span>
        )}
        <button
          className={[styles.iconBtn, drawerOpen ? styles.active : ''].join(' ')}
          onClick={toggleDrawer}
          aria-label="AI settings"
        >
          <SettingsIcon />
          AI Settings
        </button>
        <button className={styles.avatar} onClick={onLogout} title={`Signed in as ${user?.email}\nClick to sign out`}>
          {initial}
        </button>
      </div>
    </header>
  )
}

function SettingsIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
