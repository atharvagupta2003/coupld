import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Volume2, VolumeX, Plus, X, Send } from 'lucide-react'
import SkipButton from '../components/SkipButton'
import AdamCharacter from '../components/AdamCharacter'
import EveCharacter from '../components/EveCharacter'
import { useSpeech, COACH_VOICES, type CoachId } from '../hooks/useElevenLabs'
import { alexPhotos } from '../data/mockData'

interface ChatMessage {
  id: number
  from: 'coach' | 'user'
  text: string
}

interface ConversationEntry {
  coachText: string
  voiceText: string
  chips: string[]
  responses?: Record<string, { text: string; voice: string }>
}

const CONVERSATION: ConversationEntry[] = [
  {
    coachText: "Good to meet you. I'm here to help you build a profile that actually reflects who you are — not just what sounds good.\n\nThis takes about five minutes, and it's what makes your matches genuinely different from anywhere else. Let's get into it.",
    voiceText: "Good to meet you. I'm here to help you build a profile that actually reflects who you are. This takes about five minutes. Let's get into it.",
    chips: ["Let's go", 'How does this work?', 'Take your time'],
    responses: {
      "Let's go":            { text: "Love that energy.", voice: "Love that energy." },
      'How does this work?': { text: "Simple — I ask, you answer honestly. Your answers shape who you match with, so real always beats impressive.", voice: "Simple. I ask, you answer honestly. Real always beats impressive." },
      'Take your time':      { text: "No pressure at all. There are no right answers here — just yours.", voice: "No pressure at all. There are no right answers here, just yours." },
      _default:              { text: "Got it. Let's start.", voice: "Got it. Let's start." },
    },
  },
  {
    coachText: "When your plans change unexpectedly, how does that usually land with you?",
    voiceText: "When your plans change unexpectedly, how does that usually land with you?",
    chips: ['Excited by the change', 'I adapt quickly', 'Prefer sticking to the plan', 'I need time to readjust'],
    responses: {
      'Excited by the change':       { text: "That's a good trait — adaptability in a partner is genuinely rare.", voice: "That's a good trait. Adaptability in a partner is genuinely rare." },
      'I adapt quickly':             { text: "Flexible and grounded. That shows up in relationships too.", voice: "Flexible and grounded. That shows up in relationships too." },
      'Prefer sticking to the plan': { text: "Nothing wrong with that. You know what you want — that's clarity.", voice: "Nothing wrong with that. You know what you want, that's clarity." },
      'I need time to readjust':     { text: "Most people don't admit that. Self-awareness about it is actually a strength.", voice: "Most people don't admit that. Self-awareness about it is actually a strength." },
      _default:                      { text: "Honest answer. That tells me something real.", voice: "Honest answer. That tells me something real." },
    },
  },
  {
    coachText: "After a long social event with people you don't know well, you usually feel...",
    voiceText: "After a long social event with people you don't know well, you usually feel...",
    chips: ['Energised — love meeting people', 'Fine but ready for quiet', 'Drained — need alone time', 'Exhausted'],
    responses: {
      'Energised — love meeting people': { text: "Social energy suits you. Someone who matches that makes a real difference.", voice: "Social energy suits you. Someone who matches that makes a real difference." },
      'Fine but ready for quiet':        { text: "Balanced — you can engage but you also know when you've had enough. That's healthy.", voice: "Balanced. You can engage but you also know when you've had enough. That's healthy." },
      'Drained — need alone time':       { text: "The right match will understand that and give you space without making it weird.", voice: "The right match will understand that and give you space without making it weird." },
      'Exhausted':                       { text: "Some people just find it a lot. Knowing that about yourself matters more than people think.", voice: "Some people just find it a lot. Knowing that about yourself matters more than people think." },
      _default:                          { text: "Good to know. That shapes a lot about compatibility.", voice: "Good to know. That shapes a lot about compatibility." },
    },
  },
  {
    coachText: "When someone you're dating goes quiet for a while, what goes through your mind?",
    voiceText: "When someone you're dating goes quiet for a while, what goes through your mind?",
    chips: ["Assume they're busy", 'Notice but stay calm', 'Check in once, casually', 'Hard to focus on other things'],
    responses: {
      "Assume they're busy":          { text: "Secure and trusting — that's a genuinely attractive quality in a partner.", voice: "Secure and trusting. That's a genuinely attractive quality in a partner." },
      'Notice but stay calm':         { text: "You notice, but you don't spiral. That's emotional maturity right there.", voice: "You notice, but you don't spiral. That's emotional maturity right there." },
      'Check in once, casually':      { text: "One check-in, no drama. That's healthy communication — more people should do that.", voice: "One check-in, no drama. That's healthy communication. More people should do that." },
      'Hard to focus on other things':{ text: "Anxious attachment is more common than people admit. Understanding it is already the first step.", voice: "Anxious attachment is more common than people admit. Understanding it is already the first step." },
      _default:                       { text: "That's an honest answer. Relationship anxiety is real and it's worth knowing.", voice: "That's an honest answer. Relationship anxiety is real and it's worth knowing." },
    },
  },
  {
    coachText: "When you imagine your life ten years from now, what matters most?",
    voiceText: "When you imagine your life ten years from now, what matters most?",
    chips: ['A stable home life', 'Professional achievement', 'Deep relationships', 'Financial freedom'],
    responses: {
      'A stable home life':       { text: "Roots matter to you. That's a clear signal — and someone who shares that priority is important.", voice: "Roots matter to you. That's a clear signal, and someone who shares that priority is important." },
      'Professional achievement': { text: "Driven. Makes sense — and you need someone who genuinely respects that ambition, not just tolerates it.", voice: "Driven. You need someone who genuinely respects that ambition, not just tolerates it." },
      'Deep relationships':       { text: "Connection over status. That's rarer than it sounds, honestly.", voice: "Connection over status. That's rarer than it sounds, honestly." },
      'Financial freedom':        { text: "Independence and security. Smart priority — and worth being upfront about in a relationship.", voice: "Independence and security. Smart priority, and worth being upfront about in a relationship." },
      _default:                   { text: "Clear on what you want. That's a good sign.", voice: "Clear on what you want. That's a good sign." },
    },
  },
  {
    coachText: "How do you most naturally show someone you care about them?",
    voiceText: "How do you most naturally show someone you care about them?",
    chips: ['Telling them directly', 'Doing things for them', 'Quality time together', 'Physical closeness'],
    responses: {
      'Telling them directly':  { text: "Words of affirmation. Clear, direct — no guesswork needed. That's actually rare.", voice: "Words of affirmation. Clear and direct. No guesswork needed. That's actually rare." },
      'Doing things for them':  { text: "Acts of service. You show up through action — people who receive love that way will feel it deeply.", voice: "Acts of service. You show up through action. People who receive love that way will feel it deeply." },
      'Quality time together':  { text: "Presence over presents. A lot of people underestimate how much that means.", voice: "Presence over presents. A lot of people underestimate how much that means." },
      'Physical closeness':     { text: "Touch is how you connect — that's completely natural and it matters to get right in a match.", voice: "Touch is how you connect. That's completely natural, and it matters to get right in a match." },
      _default:                 { text: "Love languages matter more than people realise. Good to know yours.", voice: "Love languages matter more than people realise. Good to know yours." },
    },
  },
  {
    coachText: "Last one before photos — and I want you to be straight with me on this.\n\nWhat are you actually here for right now?",
    voiceText: "Last one before photos. What are you actually here for right now? Be straight with me.",
    chips: ['Something serious', 'Casual but meaningful', 'Honestly not sure yet', 'Open to anything', 'Mostly physical'],
    responses: {
      'Something serious':      { text: "Got it. I'll make sure the people you match with are looking for the same thing — no wasted time.", voice: "Got it. I'll make sure the people you match with are looking for the same thing. No wasted time." },
      'Casual but meaningful':  { text: "Connection without the pressure — totally valid. I'll dial in matches who are on that wavelength.", voice: "Connection without the pressure. Totally valid. I'll find matches who are on that wavelength." },
      'Honestly not sure yet':  { text: "That's probably the most honest answer in the room. Keeping an open mind isn't a bad thing at all.", voice: "That's probably the most honest answer in the room. Keeping an open mind isn't a bad thing at all." },
      'Open to anything':       { text: "I'll keep your options wide. When it's the right person, you'll know.", voice: "I'll keep your options wide. When it's the right person, you'll know." },
      'Mostly physical':        { text: "Straightforward — I respect that. I'll factor it in, and I'll make sure expectations are aligned on both sides.", voice: "Straightforward. I respect that. I'll factor it in and make sure expectations are aligned on both sides." },
      _default:                 { text: "Noted. I'll make sure your matches reflect that.", voice: "Noted. I'll make sure your matches reflect that." },
    },
  },
  {
    coachText: "Almost done. Add a few photos — not posed headshots, just you being yourself.\n\nProfiles with three or more photos get significantly more connections.",
    voiceText: "Almost done. Add a few photos. Not posed headshots, just you being yourself.",
    chips: [],
  },
]

const PHOTO_FEEDBACK =
  "That's a solid shot. One thing — candid moments tend to perform significantly better than posed ones in our matching data. Totally your call, but worth considering a more natural lead photo."

export default function Onboarding() {
  const navigate = useNavigate()
  const coachId = (localStorage.getItem('coachId') || 'adam') as CoachId
  const voiceId = COACH_VOICES[coachId]
  const { speaking, say, stop, authError } = useSpeech()
  const [muted, setMuted] = useState(false)
  const [voiceError, setVoiceError] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [step, setStep] = useState(0)
  const [chips, setChips] = useState<string[]>([])
  const [showTyping, setShowTyping] = useState(false)
  const [showPhotos, setShowPhotos] = useState(false)
  const [uploadedPhotos, setUploadedPhotos] = useState<(string | null)[]>([null, null, null])
  const [photoFeedbackShown, setPhotoFeedbackShown] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [typeInput, setTypeInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const msgId = useRef(0)
  const initialized = useRef(false)

  const addMsg = (from: 'coach' | 'user', text: string) => {
    msgId.current++
    setMessages((prev) => [...prev, { id: msgId.current, from, text }])
  }

  const speakIfUnmuted = useCallback(
    (text: string): Promise<void> => {
      if (!muted) {
        return say(text, voiceId).catch(() => setVoiceError(true)) as Promise<void>
      }
      return Promise.resolve()
    },
    [muted, say, voiceId]
  )

  const showCoachMessage = useCallback(
    (idx: number) => {
      setShowTyping(true)
      setChips([])
      const entry = CONVERSATION[idx]
      setTimeout(() => {
        setShowTyping(false)
        addMsg('coach', entry.coachText)
        speakIfUnmuted(entry.voiceText)
        if (idx === CONVERSATION.length - 1) {
          setShowPhotos(true)
        } else {
          setChips(entry.chips)
        }
      }, 700)
    },
    [speakIfUnmuted]
  )

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    showCoachMessage(0)
  }, [showCoachMessage])

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 60)
  }, [messages, showTyping, showPhotos])

  const handleChip = async (chip: string) => {
    setChips([])
    addMsg('user', chip)

    const entry = CONVERSATION[step]
    const response = entry.responses?.[chip] ?? entry.responses?.['_default']

    if (response) {
      // Show typing indicator
      setShowTyping(true)
      await new Promise<void>(r => setTimeout(r, 700))
      setShowTyping(false)

      // Show reaction text and speak it — await so we don't interrupt
      addMsg('coach', response.text)
      await speakIfUnmuted(response.voice)

      // Short breath after speech ends, then show next question
      await new Promise<void>(r => setTimeout(r, 350))

      const nextStep = step + 1
      setStep(nextStep)
      showCoachMessage(nextStep)
    } else {
      const nextStep = step + 1
      setStep(nextStep)
      setTimeout(() => showCoachMessage(nextStep), 500)
    }
  }

  const handleTypeSubmit = () => {
    const val = typeInput.trim()
    if (!val) return
    setTypeInput('')
    handleChip(val)
  }

  const handlePhotoUpload = (idx: number) => {
    if (uploadedPhotos[idx]) return
    setTimeout(() => {
      setUploadedPhotos((prev) => {
        const next = [...prev]
        next[idx] = alexPhotos[idx % alexPhotos.length]
        return next
      })
      if (!photoFeedbackShown) {
        setPhotoFeedbackShown(true)
        setTimeout(() => {
          setShowPhotos(false)
          addMsg('coach', PHOTO_FEEDBACK)
          speakIfUnmuted(PHOTO_FEEDBACK)
          setTimeout(() => {
            setChips(["Let's try another", 'Keep it — looks good'])
          }, 400)
        }, 1200)
      }
    }, 350)
  }

  const handlePhotoResponse = (chip: string) => {
    setChips([])
    addMsg('user', chip)
    setTimeout(() => {
      addMsg('coach', "Perfect. Give me a moment to build your profile.")
      speakIfUnmuted("Perfect. Give me a moment while I build your profile.")
      setTimeout(() => setTransitioning(true), 1200)
    }, 600)
  }

  const removePhoto = (idx: number) => {
    setUploadedPhotos((prev) => {
      const next = [...prev]
      next[idx] = null
      return next
    })
  }

  if (transitioning) {
    return <TransitionState coachId={coachId} onDone={() => navigate('/profile', { state: { fromOnboarding: true } })} />
  }

  const CoachFigure = coachId === 'adam' ? AdamCharacter : EveCharacter
  const coachName = coachId === 'adam' ? 'Adam' : 'Eve'

  const isPhotoStep = step === CONVERSATION.length - 1 || photoFeedbackShown

  return (
    <motion.div
      className="flex flex-col h-screen w-full bg-[#1C0B3A]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SkipButton />

      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0 z-10"
        style={{
          background: 'rgba(28,11,58,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(184,160,212,0.1)',
        }}
      >
        <button onClick={() => navigate('/choose-coach')} className="text-white">
          <ChevronLeft size={22} />
        </button>
        <div className="flex items-center gap-3 flex-1">
          <CoachFigure size={36} speaking={speaking} />
          <div>
            <p className="text-white font-semibold text-sm leading-none">{coachName}</p>
            <p className="text-xs mt-0.5" style={{ color: authError ? '#C2547A' : '#9B8FB0' }}>
              {authError ? 'Voice unavailable — API key invalid' : speaking ? 'Speaking...' : 'Your Coach'}
            </p>
          </div>
        </div>
        <button
          onClick={() => { setMuted((m) => { if (!m) stop(); return !m }) }}
          className="text-brand-textSub"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-36 scrollbar-hide">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.from === 'coach' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.from === 'coach' && (
                <div className="mr-2 mt-1 shrink-0">
                  <CoachFigure size={24} />
                </div>
              )}
              <div
                className="text-white text-sm leading-relaxed whitespace-pre-line"
                style={{
                  maxWidth: '78%',
                  padding: '12px 16px',
                  borderRadius: msg.from === 'coach' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                  background: msg.from === 'coach' ? 'rgba(184,160,212,0.10)' : '#2D1B4E',
                  border: msg.from === 'coach' ? '1px solid rgba(184,160,212,0.18)' : 'none',
                }}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {showTyping && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-1 items-center mb-3 ml-9"
            style={{
              padding: '12px 16px',
              borderRadius: '4px 16px 16px 16px',
              background: 'rgba(184,160,212,0.10)',
              border: '1px solid rgba(184,160,212,0.18)',
              width: 64,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block w-1.5 h-1.5 rounded-full bg-brand-lavender"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 0.9, delay: i * 0.3, repeat: Infinity }}
              />
            ))}
          </motion.div>
        )}

        {showPhotos && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 mb-3 ml-9"
          >
            <div className="flex gap-2">
              {uploadedPhotos.map((photo, idx) => (
                <button
                  key={idx}
                  onClick={() => (photo ? removePhoto(idx) : handlePhotoUpload(idx))}
                  className="relative rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                  style={{
                    width: 96,
                    height: 116,
                    background: 'rgba(184,160,212,0.07)',
                    border: '1.5px dashed rgba(184,160,212,0.28)',
                  }}
                >
                  {photo ? (
                    <>
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                      <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
                        <X size={10} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(184,160,212,0.15)' }}
                      >
                        <Plus size={16} className="text-brand-lavender" />
                      </div>
                      <span className="text-brand-textSub" style={{ fontSize: 10 }}>Add photo</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Bottom bar */}
      <div
        className="fixed bottom-0 w-full max-w-[390px] z-20 px-4 pb-6 pt-3"
        style={{
          background: 'linear-gradient(0deg, #1C0B3A 70%, transparent)',
        }}
      >
        {/* Chips */}
        {chips.length > 0 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => (isPhotoStep ? handlePhotoResponse(chip) : handleChip(chip))}
                className="shrink-0 px-4 py-2.5 rounded-full text-sm font-medium text-white transition-all active:scale-95"
                style={{
                  border: '1px solid rgba(184,160,212,0.4)',
                  background: 'rgba(184,160,212,0.08)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Optional type input — shows during question steps */}
        {chips.length > 0 && !isPhotoStep && (
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,160,212,0.15)' }}
          >
            <input
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTypeSubmit()}
              placeholder="Or type your own answer..."
              className="flex-1 text-white text-sm bg-transparent outline-none placeholder:text-brand-textSub/40"
            />
            <button onClick={handleTypeSubmit} disabled={!typeInput.trim()}>
              <Send size={16} style={{ color: typeInput.trim() ? '#B8A0D4' : '#4A3660' }} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function TransitionState({ coachId, onDone }: { coachId: CoachId; onDone: () => void }) {
  const lines = ['Reading your answers...', 'Mapping your dimensions...', 'Shortlisting your matches...', 'Your profile is ready.']
  const [lineIdx, setLineIdx] = useState(0)
  const CoachFigure = coachId === 'adam' ? AdamCharacter : EveCharacter

  useEffect(() => {
    const timers = [
      setTimeout(() => setLineIdx(1), 1400),
      setTimeout(() => setLineIdx(2), 2800),
      setTimeout(() => setLineIdx(3), 4000),
      setTimeout(onDone, 5200),
    ]
    return () => timers.forEach(clearTimeout)
  }, [onDone])

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-[#1C0B3A] gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
    >
      <CoachFigure size={80} />
      <AnimatePresence mode="wait">
        <motion.p
          key={lineIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-brand-lavender text-lg font-medium"
        >
          {lines[lineIdx]}
        </motion.p>
      </AnimatePresence>
      <div className="flex gap-1.5 mt-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-brand-lavender"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  )
}
