import { useRef } from 'react'
import { useEditorStore }  from '@/store/editorStore'
import { useFormatter }    from '@/hooks/useFormatter'
import { useAI }           from '@/hooks/useAI'
import { ModeSelector }    from './ModeSelector'
import { Toolbar }         from './Toolbar'
import styles from './Editor.module.css'

const MAX_CHARS = 3000

export function Editor() {
  const taRef = useRef(null)
  const { input, mode, loading, setInput } = useEditorStore()
  const { insertAtCursor, wrapSelection }  = useFormatter()
  const { run }                            = useAI()

  const charCount = input.length
  const overLimit = charCount > MAX_CHARS
  const nearLimit = charCount > MAX_CHARS * 0.85

  // ── Toolbar actions ──────────────────────────────────────────
  function handleWrap(before, after) {
    const ta = taRef.current
    if (!ta) return
    const result = wrapSelection(ta, before, after)
    setInput(result.value)
    requestAnimationFrame(() => {
      ta.focus()
      ta.setSelectionRange(result.selectionStart, result.selectionEnd)
    })
  }

  function handleInsert(snippet) {
    const ta = taRef.current
    if (!ta) return
    const result = insertAtCursor(ta, snippet)
    setInput(result.value)
    requestAnimationFrame(() => {
      ta.focus()
      ta.setSelectionRange(result.cursor, result.cursor)
    })
  }

  function handleBullet() {
    const ta  = taRef.current
    if (!ta) return
    const pos = ta.selectionStart
    const ls  = ta.value.lastIndexOf('\n', pos - 1) + 1
    const next = ta.value.substring(0, ls) + '- ' + ta.value.substring(ls)
    setInput(next)
    requestAnimationFrame(() => {
      ta.focus()
      ta.setSelectionRange(pos + 2, pos + 2)
    })
  }

  function handleBreak() {
    const ta  = taRef.current
    if (!ta) return
    const pos = ta.selectionStart
    const next = ta.value.substring(0, pos) + '\n' + ta.value.substring(pos)
    setInput(next)
    requestAnimationFrame(() => {
      ta.focus()
      ta.setSelectionRange(pos + 1, pos + 1)
    })
  }

  // ── Process button label ─────────────────────────────────────
  const btnLabels = { format: 'Format Post', polish: 'Polish with AI', rewrite: 'Full Rewrite' }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <span className={styles.panelTitle}>Your content</span>
      </div>

      <ModeSelector />

      <Toolbar
        onWrap={handleWrap}
        onInsert={handleInsert}
        onBullet={handleBullet}
        onBreak={handleBreak}
      />

      <textarea
        ref={taRef}
        className={styles.ta}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={PLACEHOLDER}
        spellCheck
        maxLength={MAX_CHARS + 500}
      />

      <div className={styles.foot}>
        <span className={[
          styles.cc,
          overLimit ? styles.over : nearLimit ? styles.warn : '',
        ].filter(Boolean).join(' ')}>
          {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
        </span>

        <button
          className={[styles.procBtn, loading ? styles.loading : ''].join(' ')}
          onClick={run}
          disabled={loading || overLimit}
        >
          {loading
            ? <><span className={styles.spinner} /> Processing…</>
            : btnLabels[mode]
          }
        </button>
      </div>
    </div>
  )
}

const PLACEHOLDER = `Paste your content here — from ChatGPT, Notion, Word, anywhere.

Use **bold** for emphasis, *italic* for tone, and - for bullets.

Example:
**3 things I wish I knew before my first product launch:**

Nobody cares about your product. They care about their problem.

- Ship before you're ready
- Talk to 10 users before building anything  
- Your first version will embarrass you — that's correct

What would you add?`
