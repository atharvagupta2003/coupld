import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Sparkles } from 'lucide-react'
import { cupidHistory } from '../data/mockData'
import { alexPhotos } from '../data/mockData'

const ADAM_PHOTO = 'https://images.pexels.com/photos/37105839/pexels-photo-37105839.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
const EVE_PHOTO  = 'https://images.pexels.com/photos/16961133/pexels-photo-16961133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'

export default function CoachPage() {
  const navigate = useNavigate()
  const bottomRef = useRef<HTMLDivElement>(null)

  const coachId = localStorage.getItem('coachId') || 'adam'
  const isAdam  = coachId === 'adam'
  const coachPhoto = isAdam ? ADAM_PHOTO : EVE_PHOTO
  const coachName  = isAdam ? 'Adam' : 'Eve'

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 200)
  }, [])

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
        style={{
          background: 'rgba(28,11,58,0.97)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(184,160,212,0.12)',
        }}
      >
        <button onClick={() => navigate(-1)} className="text-white pl-8">
          <ChevronLeft size={22} />
        </button>

        {/* Coach avatar in header */}
        <div
          className="w-9 h-9 rounded-full overflow-hidden shrink-0"
          style={{ border: '2px solid rgba(107,181,196,0.5)', boxShadow: '0 0 12px rgba(107,181,196,0.3)' }}
        >
          <img src={coachPhoto} alt={coachName} className="w-full h-full object-cover object-top" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-white font-semibold text-sm">{coachName}</p>
            <Sparkles size={11} style={{ color: '#D4A843' }} />
          </div>
          <p className="text-brand-textSub text-xs">Your AI relationship coach</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3">
        <div
          className="self-center px-4 py-1.5 rounded-full text-xs text-brand-textSub mb-2"
          style={{ background: 'rgba(184,160,212,0.08)', border: '1px solid rgba(184,160,212,0.12)' }}
        >
          3 days ago
        </div>

        {cupidHistory.map((msg, i) => {
          const isCoach = msg.from === 'cupid'
          const isUser  = msg.from === 'user'

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              {isCoach && (
                <div
                  className="shrink-0 mb-1 w-7 h-7 rounded-full overflow-hidden"
                  style={{ border: '1.5px solid rgba(107,181,196,0.4)' }}
                >
                  <img src={coachPhoto} alt={coachName} className="w-full h-full object-cover object-top" />
                </div>
              )}
              {isUser && (
                <div className="shrink-0 mb-1 w-7 h-7 rounded-full overflow-hidden">
                  <img src={alexPhotos[0]} alt="You" className="w-full h-full object-cover" />
                </div>
              )}

              <div
                className="text-sm leading-relaxed"
                style={{
                  maxWidth: '78%',
                  padding: '10px 14px',
                  borderRadius: isCoach ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                  background: isCoach
                    ? 'linear-gradient(135deg, rgba(212,168,67,0.12), rgba(184,160,212,0.08))'
                    : '#2D1B4E',
                  border: isCoach ? '1px solid rgba(212,168,67,0.2)' : 'none',
                  color: 'white',
                }}
              >
                {msg.text}
                <p className="mt-1 opacity-40" style={{ fontSize: 10 }}>{msg.time}</p>
              </div>
            </motion.div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar — decorative / non-functional for prototype */}
      <div
        className="px-4 py-3 shrink-0 flex items-center gap-3"
        style={{ background: 'rgba(28,11,58,0.97)', borderTop: '1px solid rgba(184,160,212,0.1)' }}
      >
        <div
          className="flex-1 px-4 py-2.5 rounded-xl text-brand-textSub/50 text-sm"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,160,212,0.12)' }}
        >
          Ask {coachName} anything…
        </div>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(212,168,67,0.15)', border: '1px solid rgba(212,168,67,0.25)' }}
        >
          <Sparkles size={15} style={{ color: '#D4A843' }} />
        </div>
      </div>
    </motion.div>
  )
}
