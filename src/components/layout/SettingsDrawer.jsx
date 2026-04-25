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
    setTimeout(() => { setSaved(false); closeDrawer() }, 900)
  }

  return (
    <div className={[styles.drawer, drawerOpen ? styles.open : ''].join(' ')} aria-hidden={!drawerOpen}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.title}>AI Configuration</span>
          <span className={styles.subtitle}>Your key stays in your browser — never sent to our servers</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.field}>
            <label className={styles.label}>Provider</label>
            <select
              className={styles.select}
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            >
              {Object.entries(PROVIDERS).map(([id, p]) => (
                <option key={id} value={id}>
                  {p.label}{p.freeNote ? ' — Free tier available' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Model</label>
            <select
              className={styles.select}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            >
              {providerConfig.models.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}{m.note ? ` — ${m.note}` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              API Key
              <a className={styles.getKey} href={providerConfig.docsUrl} target="_blank" rel="noreferrer">
                Get key ↗
              </a>
            </label>
            <input
              className={styles.keyInput}
              type="password"
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
              placeholder={`Paste your ${providerConfig.label} API key…`}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>&nbsp;</label>
            <button className={[styles.saveBtn, saved ? styles.saved : ''].join(' ')} onClick={handleSave}>
              {saved ? '✓ Saved' : 'Save key'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
