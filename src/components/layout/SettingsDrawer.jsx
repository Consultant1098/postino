import { useState, useEffect } from 'react'
import { useSettingsStore } from '@/store/settingsStore'
import { PROVIDERS }         from '@/config/providers'
import styles from './SettingsDrawer.module.css'

export function SettingsDrawer() {
  const { provider, model, apiKey, drawerOpen, setProvider, setModel, setApiKey, closeDrawer } = useSettingsStore()
  const [localKey, setLocalKey] = useState(apiKey)
  const [saved,    setSaved]    = useState(false)

  useEffect(() => { setLocalKey(apiKey) }, [apiKey, provider])

  const providerConfig = PROVIDERS[provider]

  function handleSave() {
    setApiKey(localKey.trim())
    setSaved(true)
    setTimeout(() => { setSaved(false); closeDrawer() }, 1000)
  }

  return (
    <>
      {drawerOpen && (
        <div
          className={styles.overlay}
          onClick={closeDrawer}
          aria-hidden
        />
      )}
      <aside
        className={[styles.panel, drawerOpen ? styles.open : ''].join(' ')}
        aria-label="AI Configuration"
        aria-hidden={!drawerOpen}
      >
        <div className={styles.panelHead}>
          <div>
            <div className={styles.panelTitle}>AI Configuration</div>
            <div className={styles.panelSub}>Keys stay in your browser — never sent to our servers</div>
          </div>
          <button className={styles.closeBtn} onClick={closeDrawer} aria-label="Close settings">
            <CloseIcon />
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Provider</div>
            <select
              className={styles.select}
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            >
              {Object.entries(PROVIDERS).map(([id, p]) => (
                <option key={id} value={id}>
                  {p.label}{p.freeNote ? ' · Free tier' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.section}>
            <div className={styles.sectionLabel}>Model</div>
            <select
              className={styles.select}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              {providerConfig.models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}{m.note ? ` · ${m.note}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.section}>
            <div className={styles.keyLabelRow}>
              <div className={styles.sectionLabel}>API Key</div>
              <a
                className={styles.getKey}
                href={providerConfig.docsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get key ↗
              </a>
            </div>
            <input
              className={styles.keyInput}
              type="password"
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
              placeholder={`Paste your ${providerConfig.label} key…`}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          {providerConfig.freeNote && (
            <div className={styles.freeNote}>
              <FreeIcon />
              {providerConfig.freeNote}
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            className={[styles.saveBtn, saved ? styles.saved : ''].join(' ')}
            onClick={handleSave}
          >
            {saved ? (
              <><CheckIcon /> Saved</>
            ) : (
              'Save key'
            )}
          </button>
        </div>
      </aside>
    </>
  )
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  )
}

function FreeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 6.5L4.5 9L10 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
