import { useCallback } from 'react'
import { callAI }           from '@/lib/ai'
import { applyFormatting, cleanText } from '@/lib/formatter'
import { PROMPTS }          from '@/config/prompts'
import { useEditorStore }   from '@/store/editorStore'
import { useSettingsStore } from '@/store/settingsStore'
import { useToast }         from './useToast'

export function useAI() {
  const { input, mode, setOutput, setLoading } = useEditorStore()
  const { provider, model, getActiveKey }       = useSettingsStore()
  const { showToast }                           = useToast()

  const run = useCallback(async () => {
    const text = input.trim()
    if (!text) { showToast('Paste some content first.', 'err'); return }

    if (mode === 'format') {
      setOutput(applyFormatting(cleanText(text)))
      return
    }

    const key = getActiveKey()
    if (!key) {
      showToast('Add your API key in AI Settings.', 'err')
      useSettingsStore.getState().toggleDrawer()
      return
    }

    setLoading(true)
    try {
      const raw = await callAI({
        provider,
        model,
        apiKey:       key,
        systemPrompt: PROMPTS[mode],
        userMessage:  text,
      })
      const formatted = applyFormatting(cleanText(raw))
      setOutput(formatted)
      showToast('Done — copy and paste into LinkedIn.', 'ok')
    } catch (err) {
      showToast(err.message, 'err')
    } finally {
      setLoading(false)
    }
  }, [input, mode, provider, model, getActiveKey, setOutput, setLoading, showToast])

  return { run }
}
