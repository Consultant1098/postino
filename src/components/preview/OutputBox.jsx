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
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback for browsers without clipboard API
      const ta = document.createElement('textarea')
      ta.value = output
      ta.style.position = 'fixed'
      ta.style.opacity  = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.label}>Copy-ready output</div>

      <div className={styles.box}>
        {output
          ? <span className={styles.text}>{output}</span>
          : <span className={styles.empty}>
              LinkedIn-safe Unicode text appears here after formatting.<br />
              Paste it directly — bold and bullets survive.
            </span>
        }
      </div>

      <button
        className={[styles.copyBtn, copied ? styles.copied : ''].join(' ')}
        onClick={handleCopy}
        disabled={!output}
      >
        {copied ? '✓ Copied — open LinkedIn and paste' : 'Copy to clipboard — paste directly into LinkedIn'}
      </button>
    </div>
  )
}
