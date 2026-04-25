export const PROVIDERS = {
  anthropic: {
    label: 'Anthropic',
    docsUrl: 'https://console.anthropic.com/settings/keys',
    models: [
      { id: 'claude-sonnet-4-6',          label: 'Sonnet 4.6',   note: 'Recommended' },
      { id: 'claude-haiku-4-5-20251001',  label: 'Haiku 4.5',    note: 'Fastest' },
      { id: 'claude-opus-4-6',            label: 'Opus 4.6',      note: 'Most capable' },
    ],
  },
  openai: {
    label: 'OpenAI',
    docsUrl: 'https://platform.openai.com/api-keys',
    models: [
      { id: 'gpt-4o',       label: 'GPT-4o',       note: 'Recommended' },
      { id: 'gpt-4o-mini',  label: 'GPT-4o Mini',  note: 'Fast & cheap' },
      { id: 'gpt-4.1',      label: 'GPT-4.1',       note: '' },
    ],
  },
  gemini: {
    label: 'Google Gemini',
    docsUrl: 'https://aistudio.google.com/app/apikey',
    freeNote: 'Free tier available',
    models: [
      { id: 'gemini-2.0-flash',  label: 'Gemini 2.0 Flash',  note: 'Free tier' },
      { id: 'gemini-1.5-flash',  label: 'Gemini 1.5 Flash',  note: 'Free tier' },
      { id: 'gemini-1.5-pro',    label: 'Gemini 1.5 Pro',    note: '' },
    ],
  },
  groq: {
    label: 'Groq',
    docsUrl: 'https://console.groq.com/keys',
    freeNote: 'Free tier available',
    models: [
      { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B',  note: 'Free' },
      { id: 'llama-3.1-8b-instant',    label: 'Llama 3.1 8B',    note: 'Free, fastest' },
      { id: 'mixtral-8x7b-32768',      label: 'Mixtral 8x7B',    note: 'Free' },
    ],
  },
  mistral: {
    label: 'Mistral AI',
    docsUrl: 'https://console.mistral.ai/api-keys',
    models: [
      { id: 'mistral-large-latest',  label: 'Mistral Large',  note: 'Best quality' },
      { id: 'mistral-small-latest',  label: 'Mistral Small',  note: 'Fast' },
      { id: 'open-mixtral-8x7b',     label: 'Mixtral 8x7B',   note: 'Open source' },
    ],
  },
  together: {
    label: 'Together AI',
    docsUrl: 'https://api.together.xyz/settings/api-keys',
    models: [
      { id: 'meta-llama/Llama-3-70b-chat-hf',           label: 'Llama 3 70B',    note: '' },
      { id: 'mistralai/Mixtral-8x7B-Instruct-v0.1',     label: 'Mixtral 8x7B',   note: '' },
      { id: 'google/gemma-2-27b-it',                     label: 'Gemma 2 27B',    note: '' },
    ],
  },
}

export const PROVIDER_IDS = Object.keys(PROVIDERS)
