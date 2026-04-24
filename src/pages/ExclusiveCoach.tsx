import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Sparkles, Heart, Send } from 'lucide-react'
import { profiles, alexPhotos } from '../data/mockData'
import CupidAvatar from '../components/CupidAvatar'
import CupidCharacter from '../components/CupidCharacter'

const isabelle = profiles[0]

type MsgFrom = 'cupid' | 'alex' | 'isabelle'

interface Msg {
  from: MsgFrom
  text: string
  time: string
}

const INITIAL_HISTORY: Msg[] = [
  {
    from: 'cupid',
    text: "Congratulations, both of you. You and Isabelle have taken a significant step — this is exactly what Coupld is built for. Billing has stopped. You're now in exclusive mode.",
    time: '2 days ago',
  },
  {
    from: 'isabelle',
    text: "I honestly didn't expect it to happen this quickly. But here we are.",
    time: '2 days ago',
  },
  {
    from: 'alex',
    text: "Me neither. Cupid, what changes now for us?",
    time: '2 days ago',
  },
  {
    from: 'cupid',
    text: "Your match lists are paused. I shift into relationship support mode — helping you two build something that lasts. Think of me as a coach who has read everything about both of you and wants to see this succeed.",
    time: '2 days ago',
  },
  {
    from: 'cupid',
    text: "First thought: the 3-month mark tends to be where patterns calcify. What you practice now — how you communicate, how you handle small friction — sets the shape of the relationship. Worth being intentional early.",
    time: '2 days ago',
  },
  {
    from: 'isabelle',
    text: "That's actually useful. I tend to go quiet when something bothers me rather than saying it.",
    time: 'Yesterday',
  },
  {
    from: 'cupid',
    text: "Isabelle, that pattern shows up in your profile data too. Alex — she's told you something important. The way you respond when she does open up will set the tone for whether she keeps doing it.",
    time: 'Yesterday',
  },
  {
    from: 'alex',
    text: "Understood. What should we do for our next date?",
    time: 'Yesterday',
  },
  {
    from: 'cupid',
    text: "You've done dinner. Now do something active together — a hike, pottery, axe throwing. Shared physical experience creates a different kind of bond than conversation across a table. Box Hill would be a full-circle moment given how you connected.",
    time: 'Yesterday',
  },
  {
    from: 'isabelle',
    text: "Box Hill — yes. I actually mentioned that in my first message to you.",
    time: 'Yesterday',
  },
  {
    from: 'alex',
    text: "Then it's settled. Saturday morning?",
    time: 'Yesterday',
  },
  {
    from: 'isabelle',
    text: "Saturday morning works perfectly.",
    time: 'Yesterday',
  },
  {
    from: 'cupid',
    text: "Good. One more thing: Isabelle's love language profile leans toward acts of service and quality time. Saying less and doing more will land better with her than over-communicating how you feel. Keep showing up — that's the signal she reads.",
    time: 'Today',
  },
]

const QUICK_PROMPTS = [
  'How do we handle our first disagreement?',
  'When should we meet each other\'s friends?',
  '1-month anniversary ideas',
  'Communication tips for us',
]

const AUTO_REPLIES: Record<string, Msg[]> = {
  "How do we handle our first disagreement?": [
    { from: 'cupid', text: "Start with listening, not solving. Isabelle's profile shows she processes emotionally before logically. If you jump to solutions too quickly, it can feel dismissive. Give the feeling room first, then find the fix together.", time: 'Just now' },
    { from: 'isabelle', text: "That's exactly it. I don't need it fixed immediately — I just need to feel heard first.", time: 'Just now' },
  ],
  "When should we meet each other's friends?": [
    { from: 'cupid', text: "Based on both profiles, I'd say 6–8 weeks in. Enough time that it feels natural, not so long that it feels like you're hiding each other.", time: 'Just now' },
    { from: 'isabelle', text: "I've actually already mentioned you to a couple of mine. They're curious.", time: 'Just now' },
  ],
  "1-month anniversary ideas": [
    { from: 'cupid', text: "Keep it meaningful over expensive. Something that references a shared moment — the Box Hill hike, the flowers, Brat. Isabelle isn't someone who needs grand gestures; she notices the thoughtful ones.", time: 'Just now' },
    { from: 'isabelle', text: "That's accurate. The wildflowers said more than roses ever could.", time: 'Just now' },
  ],
  "Communication tips for us": [
    { from: 'cupid', text: "Alex — you tend to intellectualise emotions. Isabelle — you tend to internalise them. You're both conflict-avoidant in different ways. The goal isn't to change that; it's to signal safety so the other person doesn't have to perform.", time: 'Just now' },
    { from: 'isabelle', text: "That's uncomfortably accurate.", time: 'Just now' },
    { from: 'alex', text: "Yeah. Noted on both counts.", time: 'Just now' },
  ],
}

export default function ExclusiveCoach() {
  const navigate = useNavigate()
  const bottomRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Msg[]>(INITIAL_HISTORY)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 200)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Msg = { from: 'alex', text: text.trim(), time: 'Just now' }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)
    const replies = AUTO_REPLIES[text.trim()] ?? [{ from: 'cupid' as MsgFrom, text: "Good question. Both of you should think about that together — I'll weigh in once you've shared your initial thoughts.", time: 'Just now' }]
    setTimeout(() => {
      setTyping(false)
      let delay = 0
      replies.forEach((reply, i) => {
        setTimeout(() => {
          setMessages(prev => [...prev, reply])
          if (i < replies.length - 1) setTyping(true)
          else setTyping(false)
        }, delay)
        delay += 1200
      })
    }, 1600)
  }

  const getAvatar = (from: MsgFrom) => {
    if (from === 'cupid') return <CupidAvatar size={26} />
    if (from === 'isabelle') return (
      <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden">
        <img src={isabelle.photos[0]} alt="Isabelle" className="w-full h-full object-cover" />
      </div>
    )
    return (
      <div className="shrink-0 w-7 h-7 rounded-full overflow-hidden">
        <img src={alexPhotos[0]} alt="Alex" className="w-full h-full object-cover" />
      </div>
    )
  }

  const isRight = (from: MsgFrom) => from === 'alex'

  const getBubbleStyle = (from: MsgFrom) => {
    if (from === 'cupid') return {
      background: 'linear-gradient(135deg, rgba(212,168,67,0.1), rgba(184,160,212,0.07))',
      border: '1px solid rgba(212,168,67,0.18)',
      borderRadius: '4px 16px 16px 16px',
    }
    if (from === 'isabelle') return {
      background: 'rgba(194,84,122,0.1)',
      border: '1px solid rgba(194,84,122,0.2)',
      borderRadius: '4px 16px 16px 16px',
    }
    return {
      background: '#2D1B4E',
      borderRadius: '16px 4px 16px 16px',
    }
  }

  return (
    <motion.div
      className="flex flex-col h-screen w-full bg-[#1C0B3A]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0"
        style={{ background: 'rgba(28,11,58,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,160,212,0.12)' }}
      >
        <button onClick={() => navigate(-1)} className="pl-8">
          <ChevronLeft size={22} className="text-white" />
        </button>
        <CupidCharacter size={34} />
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-white font-semibold text-sm">Cupid</p>
            <Sparkles size={11} style={{ color: '#D4A843' }} />
          </div>
          <p className="text-brand-textSub text-xs">Relationship coach · exclusive mode</p>
        </div>

        {/* Couple indicator */}
        <div className="flex items-center gap-1 shrink-0">
          <img src={alexPhotos[0]} alt="Alex" className="w-7 h-7 rounded-full object-cover" style={{ border: '2px solid rgba(184,160,212,0.4)' }} />
          <Heart size={10} style={{ color: '#C2547A' }} />
          <img src={isabelle.photos[0]} alt="Isabelle" className="w-7 h-7 rounded-full object-cover" style={{ border: '2px solid rgba(194,84,122,0.4)' }} />
        </div>
      </div>

      {/* Exclusive banner */}
      <div
        className="mx-4 mt-3 px-4 py-2 rounded-xl flex items-center gap-2.5 shrink-0"
        style={{ background: 'rgba(232,96,122,0.1)', border: '1px solid rgba(232,96,122,0.3)' }}
      >
        <Heart size={13} style={{ color: '#E8607A' }} />
        <p className="text-sm font-semibold" style={{ color: '#E8607A' }}>Alex &amp; Isabelle — Exclusive since Saturday</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: '#2D1B4E', border: '1px solid rgba(184,160,212,0.4)' }} />
          <span className="text-brand-textSub" style={{ fontSize: 10 }}>Alex (you)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(194,84,122,0.4)' }} />
          <span className="text-brand-textSub" style={{ fontSize: 10 }}>Isabelle</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(212,168,67,0.4)' }} />
          <span className="text-brand-textSub" style={{ fontSize: 10 }}>Cupid (coach)</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-2.5">
        <div
          className="self-center px-4 py-1.5 rounded-full text-xs text-brand-textSub mb-1"
          style={{ background: 'rgba(184,160,212,0.08)', border: '1px solid rgba(184,160,212,0.12)' }}
        >
          2 days ago
        </div>

        {messages.map((msg, i) => {
          const right = isRight(msg.from)
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.015, 0.2) }}
              className={`flex items-end gap-2 ${right ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {getAvatar(msg.from)}
              <div
                className="text-sm leading-relaxed"
                style={{
                  maxWidth: '76%',
                  padding: '9px 13px',
                  color: 'white',
                  ...getBubbleStyle(msg.from),
                }}
              >
                {!right && (
                  <p className="text-xs font-semibold mb-0.5 opacity-70" style={{ color: msg.from === 'isabelle' ? '#E8A0B4' : '#D4A843' }}>
                    {msg.from === 'isabelle' ? 'Isabelle' : 'Cupid'}
                  </p>
                )}
                {msg.text}
                <p className="mt-1 opacity-40" style={{ fontSize: 10 }}>{msg.time}</p>
              </div>
            </motion.div>
          )
        })}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <CupidAvatar size={26} />
              <div
                className="flex items-center gap-1"
                style={{ padding: '10px 14px', borderRadius: '4px 16px 16px 16px', background: 'rgba(184,160,212,0.1)', border: '1px solid rgba(184,160,212,0.15)' }}
              >
                {[0, 1, 2].map(i => (
                  <motion.span
                    key={i}
                    className="block w-1.5 h-1.5 rounded-full bg-brand-lavender"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, delay: i * 0.25, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      <div className="px-4 pb-2 shrink-0">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {QUICK_PROMPTS.map(prompt => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(184,160,212,0.09)', border: '1px solid rgba(184,160,212,0.22)', color: '#B8A0D4', whiteSpace: 'nowrap' }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div
        className="px-4 py-3 shrink-0 flex items-center gap-3"
        style={{ background: 'rgba(28,11,58,0.97)', borderTop: '1px solid rgba(184,160,212,0.1)' }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
          placeholder="Ask Cupid, or message Isabelle…"
          className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm outline-none placeholder:text-brand-textSub/50"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,160,212,0.12)' }}
        />
        <button
          onClick={() => sendMessage(input)}
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all"
          style={{
            background: input.trim() ? 'rgba(212,168,67,0.2)' : 'rgba(212,168,67,0.08)',
            border: `1px solid rgba(212,168,67,${input.trim() ? '0.4' : '0.15'})`,
          }}
        >
          <Send size={15} style={{ color: input.trim() ? '#D4A843' : '#9B8FB0' }} />
        </button>
      </div>
    </motion.div>
  )
}
