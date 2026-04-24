import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { ChevronLeft, MoreVertical, Mic, Send, Calendar, ChevronDown, Sparkles } from 'lucide-react'
import { chatThreads, venues, type Message } from '../data/mockData'
import CupidAvatar from '../components/CupidAvatar'
import CupidCharacter from '../components/CupidCharacter'

// The live messages that stream in after booking is confirmed
const LIVE_AFTER_BOOKING: Message[] = [
  {
    from: 'cupid',
    text: 'Table booked. Brat, Shoreditch — Saturday 7:30 PM, two guests, under Alex. Confirmation sent to both of you. Have a wonderful evening.',
    time: 'Just now',
  },
  { from: 'them', text: "Just got the confirmation. Brat is one of my favourites actually.", time: 'Just now' },
  { from: 'user', text: "Of course it is. See you Saturday.", time: 'Just now' },
  { from: 'them', text: "Looking forward to it.", time: 'Just now' },
]

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-1 mb-3"
      style={{
        padding: '10px 14px',
        borderRadius: '4px 16px 16px 16px',
        background: 'rgba(184,160,212,0.10)',
        border: '1px solid rgba(184,160,212,0.15)',
        width: 56,
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-brand-lavender"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 0.8, delay: i * 0.25, repeat: Infinity }}
        />
      ))}
    </motion.div>
  )
}

function CupidCoachBubble({ msg }: { msg: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', damping: 22, stiffness: 180 }}
      className="my-4 mx-1"
    >
      <div
        className="rounded-2xl p-4"
        style={{
          background: 'linear-gradient(135deg, rgba(184,160,212,0.10), rgba(212,168,67,0.07))',
          border: '1px solid rgba(184,160,212,0.28)',
        }}
      >
        <div className="flex items-center gap-2 mb-3">
          <CupidAvatar size={28} pulse={false} />
          <p className="text-brand-lavender font-semibold uppercase tracking-widest" style={{ fontSize: 10 }}>
            Cupid · Your Coach
          </p>
          <Sparkles size={12} className="ml-auto" style={{ color: '#D4A843' }} />
        </div>
        <p className="text-white text-sm leading-relaxed">{msg.text}</p>
        <p className="text-brand-textSub mt-2" style={{ fontSize: 10 }}>{msg.time}</p>
      </div>
    </motion.div>
  )
}

function MessageBubble({ msg }: { msg: Message }) {
  if (msg.from === 'cupid') return <CupidCoachBubble msg={msg} />
  const isUser = msg.from === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 16 : -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', damping: 22 }}
      className={`mb-2.5 flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        style={{
          maxWidth: '78%',
          padding: '10px 14px',
          borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
          background: isUser ? '#2D1B4E' : 'rgba(184,160,212,0.10)',
          border: isUser ? 'none' : '1px solid rgba(184,160,212,0.15)',
        }}
      >
        {msg.photo && (
          <img src={msg.photo} alt="" className="rounded-xl mb-2 w-full object-cover" style={{ maxHeight: 220 }} />
        )}
        <p className="text-white text-sm leading-relaxed">{msg.text}</p>
        <p className="text-brand-textSub mt-1" style={{ fontSize: 10 }}>{msg.time}</p>
      </div>
    </motion.div>
  )
}

export default function Messages() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const initialThread = params.get('thread')

  const [activeThread, setActiveThread] = useState<string | null>(initialThread)
  const [showDatePlan, setShowDatePlan] = useState(false)
  const [msgInput, setMsgInput] = useState('')
  const [showCupidPop, setShowCupidPop] = useState(false)

  // Live message streaming state
  const [liveMessages, setLiveMessages] = useState<Message[]>([])
  const [showTyping, setShowTyping] = useState(false)
  const [bookingDone, setBookingDone] = useState(false)
  const [inputUnlocked, setInputUnlocked] = useState(false)
  const [userMessages, setUserMessages] = useState<Message[]>([])

  const bottomRef = useRef<HTMLDivElement>(null)
  const streamingRef = useRef(false)

  const thread = chatThreads.find((t) => t.matchId === activeThread)

  const scrollToBottom = useCallback(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 80)
  }, [])

  useEffect(() => {
    if (thread) scrollToBottom()
  }, [activeThread, thread, scrollToBottom])

  useEffect(() => {
    scrollToBottom()
  }, [liveMessages, showTyping, userMessages, scrollToBottom])

  // Cupid pop-in when opening Isabelle's thread
  useEffect(() => {
    if (activeThread === '1') {
      setTimeout(() => setShowCupidPop(true), 700)
      setTimeout(() => setShowCupidPop(false), 3400)
    }
  }, [activeThread])

  // Stream the post-booking live messages one by one
  const streamLiveMessages = useCallback(async () => {
    if (streamingRef.current) return
    streamingRef.current = true
    setShowDatePlan(false)

    const delays = [
      // 0: cupid booking card — appears immediately
      { msg: LIVE_AFTER_BOOKING[0], preDelay: 400, typing: false },
      // 1: Isabelle types then responds
      { msg: LIVE_AFTER_BOOKING[1], preDelay: 1800, typing: true, typingDuration: 1400 },
      // 2: user message (auto, simulated)
      { msg: LIVE_AFTER_BOOKING[2], preDelay: 1200, typing: false },
      // 3: Isabelle final reply
      { msg: LIVE_AFTER_BOOKING[3], preDelay: 1400, typing: true, typingDuration: 1200 },
    ]

    for (const step of delays) {
      await new Promise((r) => setTimeout(r, step.preDelay))
      if (step.typing) {
        setShowTyping(true)
        await new Promise((r) => setTimeout(r, step.typingDuration))
        setShowTyping(false)
      }
      setLiveMessages((prev) => [...prev, step.msg])
    }

    setInputUnlocked(true)
  }, [])

  const handleBooking = () => {
    if (bookingDone) return
    setBookingDone(true)
    streamLiveMessages()
  }

  const sendMessage = () => {
    if (!msgInput.trim()) return
    setUserMessages((prev) => [
      ...prev,
      { from: 'user', text: msgInput.trim(), time: 'Just now' },
    ])
    setMsgInput('')
  }

  const allMessages = [...(thread?.messages ?? []), ...liveMessages, ...userMessages]

  if (thread) {
    return (
      <motion.div
        className="flex flex-col h-screen w-full bg-[#1C0B3A]"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Top bar */}
        <div
          className="flex items-center gap-3 px-4 py-3 shrink-0 z-10"
          style={{ background: 'rgba(28,11,58,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,160,212,0.1)' }}
        >
          <button onClick={() => { setActiveThread(null); setLiveMessages([]); setBookingDone(false); setInputUnlocked(false); streamingRef.current = false }}>
            <ChevronLeft size={22} className="text-white" />
          </button>
          <img src={thread.matchPhoto} alt="" className="w-9 h-9 rounded-full object-cover" />
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">{thread.matchName}, 29</p>
            <p className="text-brand-textSub" style={{ fontSize: 11 }}>Active recently</p>
          </div>
          <MoreVertical size={20} className="text-brand-textSub" />
        </div>

        {/* Coach suggestion banner */}
        <div
          className="mx-4 mt-2 rounded-xl p-3 shrink-0"
          style={{ background: 'rgba(184,160,212,0.06)', borderLeft: '2px solid #B8A0D4' }}
        >
          <div className="flex items-center gap-2 mb-1">
            <CupidAvatar size={20} pulse={false} />
            <p className="text-brand-lavender font-semibold uppercase tracking-widest" style={{ fontSize: 9 }}>
              From Your Coach
            </p>
          </div>
          <p className="text-white text-xs leading-relaxed">{thread.coachSuggestion}</p>
          <div className="flex gap-4 mt-1.5">
            <button className="font-semibold text-xs" style={{ color: '#D4A843' }}>Use this</button>
            <button className="text-brand-textSub text-xs">Dismiss</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 pb-2 scrollbar-hide">
          {allMessages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}

          <AnimatePresence>
            {showTyping && <TypingIndicator />}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>

        {/* Date planning widget — hide after booking done */}
        {!bookingDone && (
          <div className="px-4 mb-2 shrink-0">
            <button
              onClick={() => setShowDatePlan(!showDatePlan)}
              className="w-full flex items-center justify-between p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,160,212,0.15)' }}
            >
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-brand-lavender" />
                <span className="text-white text-sm font-medium">Plan a date with {thread.matchName}</span>
              </div>
              <motion.div animate={{ rotate: showDatePlan ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={15} className="text-brand-textSub" />
              </motion.div>
            </button>

            <AnimatePresence>
              {showDatePlan && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(184,160,212,0.15)' }}>
                    <img src={venues[0].photo} alt={venues[0].name} className="w-full object-cover" style={{ height: 110 }} />
                    <div className="p-3 bg-[#1C0B3A]">
                      <p className="text-white font-semibold text-sm">{venues[0].name}</p>
                      <p className="text-brand-textSub text-xs mb-2">{venues[0].type}</p>
                      <div className="flex gap-2 mb-2">
                        <span className="px-3 py-1.5 rounded-full text-white text-xs" style={{ border: '1px solid rgba(184,160,212,0.3)' }}>Saturday eve</span>
                        <span className="px-3 py-1.5 rounded-full text-white text-xs" style={{ border: '1px solid rgba(184,160,212,0.3)' }}>7:30 PM</span>
                      </div>
                      <button
                        onClick={handleBooking}
                        className="w-full py-2.5 rounded-xl font-bold text-sm active:scale-95 transition-transform"
                        style={{ background: '#D4A843', color: '#1C0B3A' }}
                      >
                        Suggest to {thread.matchName}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Booking confirmed badge (replaces widget after booking) */}
        {bookingDone && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-2 px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0"
            style={{ background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.25)' }}
          >
            <Calendar size={14} style={{ color: '#D4A843' }} />
            <p className="text-sm font-medium" style={{ color: '#D4A843' }}>
              Date confirmed — Brat, Saturday 7:30 PM
            </p>
          </motion.div>
        )}

        {/* Input bar */}
        <div
          className="flex items-center gap-2 px-4 py-3 shrink-0"
          style={{ background: 'rgba(28,11,58,0.95)', borderTop: '1px solid rgba(184,160,212,0.1)', backdropFilter: 'blur(12px)' }}
        >
          <input
            value={msgInput}
            onChange={(e) => setMsgInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder={inputUnlocked ? `Message ${thread.matchName}...` : 'Message...'}
            disabled={!inputUnlocked && bookingDone}
            className="flex-1 rounded-xl px-4 py-2.5 text-white text-sm outline-none placeholder:text-brand-textSub/50 disabled:opacity-40"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(184,160,212,0.15)' }}
          />
          <Mic size={20} className="text-brand-textSub shrink-0" />
          <button onClick={sendMessage}>
            <Send size={20} className="shrink-0" style={{ color: msgInput.trim() ? '#D4A843' : '#9B8FB0' }} />
          </button>
        </div>

        {/* Animated Cupid popup when entering Isabelle's chat */}
        <AnimatePresence>
          {showCupidPop && (
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.88 }}
              transition={{ type: 'spring', damping: 20, stiffness: 180 }}
              className="fixed z-50 px-4"
              style={{ bottom: 96, left: '50%', transform: 'translateX(-50%)', width: 320 }}
            >
              <div
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{
                  background: 'linear-gradient(135deg, #2D1B4E, #1C0B3A)',
                  border: '1px solid rgba(184,160,212,0.3)',
                  boxShadow: '0 8px 40px rgba(184,160,212,0.18)',
                }}
              >
                <CupidCharacter size={44} />
                <div className="flex-1">
                  <p className="text-brand-lavender font-semibold text-xs uppercase tracking-widest mb-0.5">Cupid</p>
                  <p className="text-white text-sm leading-snug">
                    Use the date planner below to book something with Isabelle.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  // Chat list
  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-[#1C0B3A] pb-24"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="sticky top-0 flex items-center justify-between px-5 py-4 z-10"
        style={{ background: 'rgba(28,11,58,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,160,212,0.08)' }}
      >
        <h1 className="text-white font-bold text-xl">Messages</h1>
      </div>

      <div className="flex flex-col mt-2">
        {chatThreads.map((t) => (
          <button
            key={t.matchId}
            onClick={() => { setActiveThread(t.matchId); setLiveMessages([]); setBookingDone(false); setInputUnlocked(false); streamingRef.current = false }}
            className="flex items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-white/5"
            style={{ borderBottom: '1px solid rgba(184,160,212,0.08)' }}
          >
            <div className="relative shrink-0">
              <img src={t.matchPhoto} alt="" className="w-12 h-12 rounded-full object-cover" />
              {t.unread && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-brand-lavender border-2 border-[#1C0B3A]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">{t.matchName}</p>
              <p className="text-brand-textSub text-xs truncate mt-0.5">{t.lastMessage}</p>
            </div>
            <span className="text-brand-textSub text-xs shrink-0">{t.lastTime}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
