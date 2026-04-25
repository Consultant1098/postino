import { useCallback } from 'react'
import { applyFormatting, cleanText } from '@/lib/formatter'
import { useEditorStore } from '@/store/editorStore'

export function useFormatter() {
  const { input, setOutput } = useEditorStore()

  const format = useCallback((rawText = input) => {
    const cleaned   = cleanText(rawText)
    const formatted = applyFormatting(cleaned)
    setOutput(formatted)
    return formatted
  }, [input, setOutput])

  const insertAtCursor = useCallback((textarea, snippet) => {
    const start = textarea.selectionStart
    const end   = textarea.selectionEnd
    const before = textarea.value.substring(0, start)
    const after  = textarea.value.substring(end)
    return { value: before + snippet + after, cursor: start + snippet.length }
  }, [])

  const wrapSelection = useCallback((textarea, before, after) => {
    const start = textarea.selectionStart
    const end   = textarea.selectionEnd
    const selected = textarea.value.substring(start, end) || 'text'
    const wrapped  = before + selected + after
    return {
      value: textarea.value.substring(0, start) + wrapped + textarea.value.substring(end),
      selectionStart: start + before.length,
      selectionEnd:   start + before.length + selected.length,
    }
  }, [])

  return { format, insertAtCursor, wrapSelection }
}
