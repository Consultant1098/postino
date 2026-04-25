import { useAuth }      from '@/hooks/useAuth'
import { LoginForm }   from '@/components/auth/LoginForm'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { loading, error, loginWithEmail, signupWithEmail, loginWithGoogle } = useAuth()

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <LogoMark />
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
              <div className={styles.featureIcon}>{f.icon}</div>
              <div className={styles.featureText}>
                <span className={styles.featureLabel}>{f.label}</span>
                <span className={styles.featureDesc}>{f.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.showcase}>
          <div className={styles.showcaseCard}>
            <div className={styles.showcaseHead}>
              <div className={styles.showcaseAvatar}>SC</div>
              <div>
                <div className={styles.showcaseName}>Sarah Chen <span className={styles.showcaseDeg}>· 1st</span></div>
                <div className={styles.showcaseRole}>Head of Product · Series B</div>
              </div>
            </div>
            <p className={styles.showcaseText}>
              {'𝗜 𝗷𝘂𝘀𝘁 𝗿𝗲𝗮𝗰𝗵𝗲𝗱 𝟱𝟬𝗸 𝗳𝗼𝗹𝗹𝗼𝘄𝗲𝗿𝘀.\n\nHere\'s what actually worked:\n\n• Posting consistently for 90 days\n• Writing hooks that stop the scroll\n• Keeping it human — not corporate'}
            </p>
            <div className={styles.showcaseBadge}>
              <CheckIcon />
              Formatted with Postino
            </div>
          </div>
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
  {
    icon: <BoldIcon />,
    label: 'Unicode formatting that sticks',
    desc: 'Bold, italic, bullets that survive LinkedIn\'s paste filter',
  },
  {
    icon: <PreviewIcon />,
    label: 'Live LinkedIn preview',
    desc: 'See exactly how your post looks before you publish',
  },
  {
    icon: <AIIcon />,
    label: '6 AI providers, including free',
    desc: 'Anthropic, OpenAI, Gemini, Groq, Mistral, Together AI',
  },
  {
    icon: <LockIcon />,
    label: 'Your keys stay in your browser',
    desc: 'Zero backend — API keys never touch our servers',
  },
]

function LogoMark() {
  return (
    <div className={styles.logoMark}>
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
        <path d="M2.5 2.5H8a3.5 3.5 0 0 1 0 7H2.5V2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <line x1="2.5" y1="9.5" x2="2.5" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

function BoldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M4 3h5a2.5 2.5 0 0 1 0 5H4V3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M4 8h5.5a2.75 2.75 0 0 1 0 5.5H4V8Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  )
}

function PreviewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="1.5" y="2.5" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="8" cy="7.5" r="2" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="4.5" y1="14" x2="11.5" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function AIIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 2L9.5 6H14L10.5 8.5L12 12.5L8 10L4 12.5L5.5 8.5L2 6H6.5L8 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="3" y="7" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="8" cy="10.5" r="1" fill="currentColor"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
