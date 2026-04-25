import { useEditorStore } from '@/store/editorStore'
import styles from './ModeSelector.module.css'

const MODES = [
  {
    id:        'format',
    label:     'Format',
    badge:     'Free',
    badgeType: 'free',
    info:      'Converts **bold**, *italic*, and - bullets to Unicode that sticks in LinkedIn. Instant, zero API cost.',
  },
  {
    id:        'polish',
    label:     'Polish',
    badge:     'AI',
    badgeType: 'ai',
    info:      'Sharpens your hook, fixes spacing, adds a CTA if missing. Preserves your voice.',
  },
  {
    id:        'rewrite',
    label:     'Full Rewrite',
    badge:     'AI',
    badgeType: 'ai',
    info:      'Complete restructure for scroll-stopping engagement. Hook, story arc, CTA — rebuilt from your ideas.',
  },
]

export function ModeSelector() {
  const { mode, setMode } = useEditorStore()
  const current = MODES.find((m) => m.id === mode)

  return (
    <div className={styles.wrap}>
      <div className={styles.segmented}>
        {MODES.map((m) => (
          <button
            key={m.id}
            className={[styles.seg, mode === m.id ? styles.active : ''].join(' ')}
            onClick={() => setMode(m.id)}
          >
            {m.label}
            <span className={[styles.badge, styles[m.badgeType]].join(' ')}>
              {m.badge}
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div className={styles.desc}>
          <span className={[styles.pill, styles[current.badgeType]].join(' ')}>
            {current.badge}
          </span>
          <span className={styles.descText}>{current.info}</span>
        </div>
      )}
    </div>
  )
}
