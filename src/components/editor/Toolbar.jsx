import styles from './Toolbar.module.css'

const EMOJIS = ['✅','🔥','👉','💡','🚀','⚡','📌','🎯','💪','📊']

export function Toolbar({ onWrap, onInsert, onBullet, onBreak }) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.group}>
        <button
          className={[styles.tb, styles.bold].join(' ')}
          onClick={() => onWrap('**', '**')}
          title="Bold — **text**"
        >
          B
        </button>
        <button
          className={[styles.tb, styles.italic].join(' ')}
          onClick={() => onWrap('*', '*')}
          title="Italic — *text*"
        >
          I
        </button>
      </div>

      <span className={styles.sep} />

      <div className={styles.group}>
        <button className={styles.tb} onClick={onBullet} title="Insert bullet">
          <BulletIcon />
          <span>Bullet</span>
        </button>
        <button className={styles.tb} onClick={onBreak} title="Insert line break">
          <BreakIcon />
          <span>Break</span>
        </button>
      </div>

      <span className={styles.sep} />

      <div className={styles.emojiGroup}>
        {EMOJIS.map((e) => (
          <button
            key={e}
            className={[styles.tb, styles.emoji].join(' ')}
            onClick={() => onInsert(e)}
            title={`Insert ${e}`}
          >
            {e}
          </button>
        ))}
      </div>
    </div>
  )
}

function BulletIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <circle cx="2" cy="4" r="1.2" fill="currentColor"/>
      <circle cx="2" cy="8" r="1.2" fill="currentColor"/>
      <line x1="5.5" y1="4" x2="12" y2="4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="5.5" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function BreakIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M1 3h11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M1 6.5h7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M9.5 5.5v3L12 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 10h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}
