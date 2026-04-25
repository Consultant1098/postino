import styles from './Toolbar.module.css'

const EMOJIS = ['✅','🔥','👉','💡','🚀','⚡','📌','🎯','💪','📊']

export function Toolbar({ onWrap, onInsert, onBullet, onBreak }) {
  return (
    <div className={styles.toolbar}>
      <button className={[styles.tb, styles.bold].join(' ')}   onClick={() => onWrap('**', '**')} title="Bold — **text**">B</button>
      <button className={[styles.tb, styles.italic].join(' ')} onClick={() => onWrap('*', '*')}   title="Italic — *text*">I</button>
      <span className={styles.sep} />
      <button className={styles.tb} onClick={onBullet}>• Bullet</button>
      <button className={styles.tb} onClick={onBreak}>↵ Break</button>
      <span className={styles.sep} />
      {EMOJIS.map((e) => (
        <button key={e} className={styles.tb} onClick={() => onInsert(e)}>{e}</button>
      ))}
    </div>
  )
}
