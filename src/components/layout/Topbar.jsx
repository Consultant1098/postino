import { useState, useRef, useEffect } from 'react'
import { useSettingsStore } from '@/store/settingsStore'
import { useEditorStore }   from '@/store/editorStore'
import { PROVIDERS }         from '@/config/providers'
import styles from './Topbar.module.css'

export function Topbar({ user, onLogout }) {
  const { provider, model, drawerOpen, toggleDrawer } = useSettingsStore()
  const { loading } = useEditorStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  const shortModel = model.split('/').pop().split('-').slice(0, 3).join('-')
  const initial    = user?.displayName?.[0]?.toUpperCase()
    ?? user?.email?.[0]?.toUpperCase()
    ?? 'U'

  return (
    <header className={styles.topbar}>
      <div className={styles.brand}>
        <div className={styles.logoMark}>
          <svg width="13" height="15" viewBox="0 0 13 15" fill="none" aria-hidden>
            <path d="M2 2H7.5a3 3 0 0 1 0 6H2V2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            <line x1="2" y1="8" x2="2" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          </svg>
        </div>
        <span className={styles.brandName}>Postino</span>
        <span className={styles.betaTag}>Beta</span>
      </div>

      <div className={styles.center}>
        {loading && (
          <div className={styles.processingPill}>
            <span className={styles.processingDot} />
            Processing…
          </div>
        )}
      </div>

      <div className={styles.right}>
        {model && (
          <div className={styles.modelChip}>
            <span className={styles.modelDot} />
            <span className={styles.modelText}>{PROVIDERS[provider]?.label} · {shortModel}</span>
          </div>
        )}
        <button
          className={[styles.settingsBtn, drawerOpen ? styles.active : ''].join(' ')}
          onClick={toggleDrawer}
          aria-label="AI settings"
          aria-expanded={drawerOpen}
        >
          <SettingsIcon />
          <span>AI Config</span>
        </button>
        <div className={styles.avatarWrap} ref={menuRef}>
          <button
            className={[styles.avatar, menuOpen ? styles.avatarActive : ''].join(' ')}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Account menu"
            aria-expanded={menuOpen}
          >
            {initial}
          </button>
          {menuOpen && (
            <div className={styles.avatarMenu}>
              <div className={styles.avatarMenuUser}>
                <span className={styles.avatarMenuInitial}>{initial}</span>
                <div className={styles.avatarMenuInfo}>
                  {user?.displayName && <span className={styles.avatarMenuName}>{user.displayName}</span>}
                  <span className={styles.avatarMenuEmail}>{user?.email}</span>
                </div>
              </div>
              <div className={styles.avatarMenuDivider} />
              <button
                className={styles.avatarMenuSignOut}
                onClick={() => { setMenuOpen(false); onLogout() }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
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
