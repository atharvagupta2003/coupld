import { useState, useCallback } from 'react'

const XI_KEY = import.meta.env.VITE_ELEVENLABS_KEY as string | undefined ?? 'sk_e3bbcb243c709ca90ac4edc31d8c99ab0a6fb520978881b9'

export const COACH_VOICES = {
  adam: 'pNInz6obpgDQGcFmaJgB',
  eve: 'EXAVITQu4vr4xnSDxMaL',
} as const

// Web Speech API voice names to approximate the coaches
const FALLBACK_VOICE_NAMES = {
  adam: ['Daniel', 'Google UK English Male', 'Alex', 'en-GB'],
  eve: ['Samantha', 'Google UK English Female', 'Victoria', 'Karen'],
}

export type CoachId = keyof typeof COACH_VOICES

let currentAudio: HTMLAudioElement | null = null
let currentUtterance: SpeechSynthesisUtterance | null = null

function speakWithBrowser(text: string, coachId: CoachId): Promise<void> {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return }
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    currentUtterance = utterance

    const voices = window.speechSynthesis.getVoices()
    const preferred = FALLBACK_VOICE_NAMES[coachId]
    let picked = voices.find((v) => preferred.some((name) => v.name.includes(name)))
    if (!picked) picked = voices.find((v) => v.lang.startsWith('en'))
    if (picked) utterance.voice = picked

    utterance.rate = coachId === 'adam' ? 0.92 : 0.95
    utterance.pitch = coachId === 'adam' ? 0.85 : 1.1
    utterance.volume = 1

    utterance.onend = () => { currentUtterance = null; resolve() }
    utterance.onerror = () => { currentUtterance = null; resolve() }

    window.speechSynthesis.speak(utterance)
  })
}

export async function speakText(text: string, voiceId: string): Promise<void> {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio = null
  }
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': XI_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      model_id: 'eleven_turbo_v2_5',
      voice_settings: {
        stability: 0.35,
        similarity_boost: 0.85,
        style: 0.55,
        use_speaker_boost: true,
      },
    }),
  })
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}`)
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const audio = new Audio(url)
  currentAudio = audio
  return new Promise((resolve) => {
    audio.onended = () => { URL.revokeObjectURL(url); currentAudio = null; resolve() }
    audio.onerror = () => { URL.revokeObjectURL(url); currentAudio = null; resolve() }
    audio.play().catch(() => resolve())
  })
}

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const [authError, setAuthError] = useState(false)

  const say = useCallback(async (text: string, voiceId: string) => {
    setSpeaking(true)
    try {
      await speakText(text, voiceId)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      if (msg.includes('401') || msg.includes('403')) {
        setAuthError(true)
        // ElevenLabs unavailable — fall back to browser TTS
        const coachId = (Object.entries(COACH_VOICES).find(([, v]) => v === voiceId)?.[0] ?? 'adam') as CoachId
        await speakWithBrowser(text, coachId)
      } else {
        console.warn('TTS failed, continuing silently:', e)
      }
    } finally {
      setSpeaking(false)
    }
  }, [])

  const stop = useCallback(() => {
    if (currentAudio) { currentAudio.pause(); currentAudio = null }
    if (currentUtterance) { window.speechSynthesis.cancel(); currentUtterance = null }
    setSpeaking(false)
  }, [])

  return { speaking, say, stop, authError }
}
