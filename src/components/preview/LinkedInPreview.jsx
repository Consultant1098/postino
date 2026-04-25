import { useEditorStore } from '@/store/editorStore'
import { getSeeMoreLine } from '@/lib/formatter'
import styles from './LinkedInPreview.module.css'

export function LinkedInPreview({ userInitial = 'U' }) {
  const { output } = useEditorStore()
  const showSeeMore = output && getSeeMoreLine(output) > -1

  return (
    <div className={styles.wrap}>
      <div className={styles.sectionLabel}>LinkedIn preview</div>
      <div className={styles.card}>
        <div className={styles.head}>
          <div className={styles.avatar}>{userInitial}</div>
          <div>
            <div className={styles.name}>Your Name <span className={styles.degree}>· 1st</span></div>
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
            — "…see more" fold appears here on mobile
          </div>
        )}

        <div className={styles.actions}>
          {['👍 Like', '💬 Comment', '↺ Repost', '✉ Send'].map((a) => (
            <div key={a} className={styles.action}>{a}</div>
          ))}
        </div>
      </div>
    </div>
  )
}
