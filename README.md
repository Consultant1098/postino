# Postino

LinkedIn post formatter — format, polish, and rewrite posts for maximum engagement.

## Tech Stack

- **React 18** + **Vite** — fast, modern frontend
- **React Router v6** — client-side routing
- **Zustand** — lightweight state management
- **Firebase Auth** — email/password + Google sign-in
- **Firebase Hosting** — deployment

## Project Structure

```
src/
├── config/          # Firebase, AI providers, system prompts
├── pages/           # LoginPage, EditorPage
├── components/
│   ├── auth/        # LoginForm
│   ├── layout/      # Topbar, SettingsDrawer
│   ├── editor/      # Editor, Toolbar, ModeSelector
│   ├── preview/     # LinkedInPreview, OutputBox
│   └── ui/          # Button, Toast (shared primitives)
├── hooks/           # useAuth, useAI, useFormatter, useToast
├── lib/
│   ├── formatter.js # Unicode conversion, text cleanup (pure functions)
│   └── ai/          # One file per provider: anthropic, openai, gemini, groq, mistral, together
├── store/           # Zustand: editorStore, settingsStore
└── styles/          # variables.css, globals.css
```

## Adding a New AI Provider

1. Create `src/lib/ai/newprovider.js` — export `callNewprovider({ model, apiKey, systemPrompt, userMessage })`
2. Register it in `src/lib/ai/index.js` — add to `CALLERS` map
3. Add config to `src/config/providers.js` — label, docsUrl, models array

That's it. Zero changes to UI components.

## Local Setup

```bash
# 1. Clone and install
npm install

# 2. Configure environment
cp .env.example .env
# Fill in your Firebase project credentials

# 3. Dev server
npm run dev
```

## Firebase Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Create project at https://console.firebase.google.com
# Then update .firebaserc with your project ID

# Enable Auth providers in Firebase Console:
# Authentication → Sign-in method → Email/Password + Google

# Deploy
npm run deploy
```

## Environment Variables

| Variable | Where to get it |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase Console → Project settings |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Console → Project settings |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Console → Project settings |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Console → Project settings |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console → Project settings |
| `VITE_FIREBASE_APP_ID` | Firebase Console → Project settings |

## Supported AI Providers

| Provider | Free Tier | Get Key |
|---|---|---|
| Anthropic | No | console.anthropic.com |
| OpenAI | No | platform.openai.com |
| Google Gemini | Yes | aistudio.google.com |
| Groq | Yes | console.groq.com |
| Mistral AI | No | console.mistral.ai |
| Together AI | No | api.together.xyz |

## Roadmap

- [ ] Post history (Firestore)
- [ ] See More fold simulator
- [ ] Virality score engine
- [ ] Hook generator (3 alternatives)
- [ ] Before/after diff view
- [ ] Tone transformer presets
- [ ] Chrome extension
