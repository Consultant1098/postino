import { useAuth }          from '@/hooks/useAuth'
import { Topbar }           from '@/components/layout/Topbar'
import { SettingsDrawer }   from '@/components/layout/SettingsDrawer'
import { Editor }           from '@/components/editor/Editor'
import { LinkedInPreview }  from '@/components/preview/LinkedInPreview'
import { OutputBox }        from '@/components/preview/OutputBox'
import styles from './EditorPage.module.css'

export function EditorPage() {
  const { user, logout } = useAuth()

  const initial = user?.displayName?.[0]?.toUpperCase()
    ?? user?.email?.[0]?.toUpperCase()
    ?? 'U'

  return (
    <div className={styles.page}>
      <Topbar user={user} onLogout={logout} />
      <SettingsDrawer />

      <div className={styles.workspace}>
        <div className={styles.leftCol}>
          <Editor />
        </div>

        <div className={styles.rightCol}>
          <LinkedInPreview userInitial={initial} />
          <OutputBox />
        </div>
      </div>
    </div>
  )
}
