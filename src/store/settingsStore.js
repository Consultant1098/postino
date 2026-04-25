import { create } from 'zustand'
import { PROVIDERS } from '@/config/providers'

const KEY_PREFIX = 'po_key_'

function loadKey(provider) {
  return localStorage.getItem(KEY_PREFIX + provider) ?? ''
}

function saveKey(provider, key) {
  if (key) localStorage.setItem(KEY_PREFIX + provider, key)
  else      localStorage.removeItem(KEY_PREFIX + provider)
}

const DEFAULT_PROVIDER = 'anthropic'
const DEFAULT_MODEL    = PROVIDERS[DEFAULT_PROVIDER].models[0].id

export const useSettingsStore = create((set, get) => ({
  provider:  DEFAULT_PROVIDER,
  model:     DEFAULT_MODEL,
  apiKey:    loadKey(DEFAULT_PROVIDER),
  drawerOpen: false,

  setProvider: (provider) => {
    const model  = PROVIDERS[provider].models[0].id
    const apiKey = loadKey(provider)
    set({ provider, model, apiKey })
  },

  setModel: (model) => set({ model }),

  setApiKey: (key) => {
    const { provider } = get()
    saveKey(provider, key)
    set({ apiKey: key })
  },

  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  closeDrawer:  () => set({ drawerOpen: false }),

  getActiveKey: () => {
    const { provider, apiKey } = get()
    return apiKey || loadKey(provider)
  },

  hasKey: () => {
    const { provider } = get()
    return !!loadKey(provider)
  },
}))
