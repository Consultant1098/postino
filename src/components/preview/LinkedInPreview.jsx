import { useEditorStore } from '@/store/editorStore'
import { getSeeMoreLine } from '@/lib/formatter'
import styles from './LinkedInPreview.module.css'

export function LinkedInPreview({ userInitial = 'U' }) {
  const { output } = useEditorStore()
  const showSeeMore = output && getSeeMoreLine(output) > -1

  return (
    <div className={styles.wrap}>
      <div className={styles.sectionHead}>
        <span className={styles.sectionLabel}>LinkedIn Preview</span>
        <span className={styles.sectionHint}>How it looks in the feed</span>
      </div>

      <div className={styles.card}>
        <div className={styles.head}>
          <div className={styles.avatar}>{userInitial}</div>
          <div className={styles.meta}>
            <div className={styles.name}>
              Your Name
              <span className={styles.degree}>· 1st</span>
            </div>
            <div className={styles.sub}>Your headline · LinkedIn Creator</div>
            <div className={styles.time}>Just now · 🌐</div>
          </div>
        </div>

        <div className={styles.body}>
          {output
            ? <span className={styles.text}>{output}</span>
            : <span className={styles.empty}>Your formatted post will appear here…</span>
          }
        </div>

        {showSeeMore && (
          <div className={styles.seeMore}>
            "…see more" fold appears here on mobile
          </div>
        )}

        <div className={styles.actions}>
          {[
            { icon: '👍', label: 'Like' },
            { icon: '💬', label: 'Comment' },
            { icon: '↺', label: 'Repost' },
            { icon: '✉', label: 'Send' },
          ].map((a) => (
            <div key={a.label} className={styles.action}>
              <span className={styles.actionIcon}>{a.icon}</span>
              <span>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
