import { create } from 'zustand'

export const useEditorStore = create((set) => ({
  input:    '',
  output:   '',
  mode:     'format',   // 'format' | 'polish' | 'rewrite'
  loading:  false,

  setInput:   (input)   => set({ input }),
  setOutput:  (output)  => set({ output }),
  setMode:    (mode)    => set({ mode }),
  setLoading: (loading) => set({ loading }),
  clearOutput: ()       => set({ output: '' }),
}))
