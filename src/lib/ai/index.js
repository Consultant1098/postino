import { callAnthropic } from './anthropic'
import { callOpenAI }    from './openai'
import { callGemini }    from './gemini'
import { callGroq }      from './groq'
import { callMistral }   from './mistral'
import { callTogether }  from './together'

const CALLERS = {
  anthropic: callAnthropic,
  openai:    callOpenAI,
  gemini:    callGemini,
  groq:      callGroq,
  mistral:   callMistral,
  together:  callTogether,
}

/**
 * @param {string} provider
 * @param {string} model
 * @param {string} apiKey
 * @param {string} systemPrompt
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
export async function callAI({ provider, model, apiKey, systemPrompt, userMessage }) {
  const caller = CALLERS[provider]
  if (!caller) throw new Error(`Unknown provider: ${provider}`)
  return caller({ model, apiKey, systemPrompt, userMessage })
}
