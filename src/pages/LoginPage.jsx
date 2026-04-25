import { useAuth }      from '@/hooks/useAuth'
import { LoginForm }   from '@/components/auth/LoginForm'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { loading, error, loginWithEmail, signupWithEmail, loginWithGoogle } = useAuth()

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <div className={styles.logoRing}>
            <span className={styles.logoP}>P</span>
          </div>
          <span className={styles.logoName}>Postino</span>
        </div>

        <div className={styles.tagline}>
          <h1 className={styles.headline}>
            The last LinkedIn<br />
            formatter you'll<br />
            ever <em>need.</em>
          </h1>
          <p className={styles.body}>
            Paste from anywhere. Format, polish, or fully rewrite — using any AI model you choose.
            Your content lands exactly as intended.
          </p>
        </div>

        <div className={styles.features}>
          {FEATURES.map((f) => (
            <div key={f.label} className={styles.feature}>
              <span className={styles.featureIcon}>{f.icon}</span>
              <span className={styles.featureLabel}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <LoginForm
          onLogin={loginWithEmail}
          onSignup={signupWithEmail}
          onGoogleLogin={loginWithGoogle}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}

const FEATURES = [
  { icon: '⚡', label: 'Unicode bold & italic that sticks' },
  { icon: '👁', label: 'Live LinkedIn preview before you post' },
  { icon: '🤖', label: '6 AI providers — including free tiers' },
  { icon: '🔒', label: 'Your API keys stay in your browser' },
]
