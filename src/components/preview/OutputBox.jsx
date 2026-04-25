import { useState } from 'react'
import { useEditorStore } from '@/store/editorStore'
import styles from './OutputBox.module.css'

export function OutputBox() {
  const { output } = useEditorStore()
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = output
      ta.style.position = 'fixed'
      ta.style.opacity  = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionLabel}>Copy-Ready Text</span>
        <span className={styles.sectionHint}>Paste directly into LinkedIn</span>
      </div>

      <div className={styles.inner}>
        <div className={styles.box}>
          {output
            ? <span className={styles.text}>{output}</span>
            : <span className={styles.empty}>
                LinkedIn-safe Unicode text appears here after formatting.
                Bold and bullets survive the paste.
              </span>
          }
        </div>

        <button
          className={[styles.copyBtn, copied ? styles.copied : ''].join(' ')}
          onClick={handleCopy}
          disabled={!output}
        >
          {copied ? (
            <><CheckIcon /> Copied — open LinkedIn and paste</>
          ) : (
            <><CopyIcon /> Copy to clipboard</>
          )}
        </button>
      </div>
    </div>
  )
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M9 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
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
