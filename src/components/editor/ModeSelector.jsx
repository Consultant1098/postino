import { useEditorStore } from '@/store/editorStore'
import styles from './ModeSelector.module.css'

const MODES = [
  { id: 'format',  label: 'Format',       pill: 'free', pillLabel: 'Free',  info: 'Converts **bold**, *italic*, and - bullets to Unicode that sticks in LinkedIn. Instant, zero API cost.' },
  { id: 'polish',  label: 'Polish',        pill: 'ai',   pillLabel: 'AI',    info: 'Sharpens your hook, fixes spacing, adds a CTA if missing. Preserves your voice.' },
  { id: 'rewrite', label: 'Full Rewrite',  pill: 'ai',   pillLabel: 'AI',    info: 'Complete restructure for scroll-stopping engagement. Hook, story arc, CTA — rebuilt from your ideas.' },
]

export function ModeSelector() {
  const { mode, setMode } = useEditorStore()
  const current = MODES.find((m) => m.id === mode)

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        {MODES.map((m) => (
          <button
            key={m.id}
            className={[styles.tab, mode === m.id ? styles.active : ''].join(' ')}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </div>
      {current && (
        <div className={styles.desc}>
          <span className={[styles.pill, styles[current.pill]].join(' ')}>{current.pillLabel}</span>
          {current.info}
        </div>
      )}
    </div>
  )
}
