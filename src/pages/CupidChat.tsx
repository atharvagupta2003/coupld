import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import { cupidHistory } from '../data/mockData'
import CupidAvatar from '../components/CupidAvatar'
import CupidCharacter from '../components/CupidCharacter'

interface Props {
  onClose: () => void
}

export default function CupidChat({ onClose }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 200)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />

      {/* Sheet */}
      <motion.div
        className="relative w-full max-w-[390px] rounded-t-3xl overflow-hidden flex flex-col"
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(0,0,0,0.08)',
          maxHeight: '88vh',
        }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-3 px-5 pt-2 pb-4 shrink-0"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}
        >
          <CupidCharacter size={48} />
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-gray-900 font-bold text-base">Cupid</p>
              <Sparkles size={13} style={{ color: '#D4A843' }} />
            </div>
            <p className="text-brand-textSub text-xs">Your personal dating coach</p>
          </div>
          <button onClick={onClose}>
            <X size={20} className="text-brand-textSub" />
          </button>
        </div>

        {/* Context banner */}
        <div
          className="mx-4 mt-3 shrink-0 rounded-xl p-3"
          style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.15)' }}
        >
          <p className="text-brand-lavender font-semibold uppercase tracking-widest text-xs mb-1">
            How Cupid helped
          </p>
          <p className="text-brand-textSub text-xs leading-relaxed">
            Cupid guided you from your first match to a confirmed dinner date with Isabelle — including a flower arrangement, venue selection, and booking.
          </p>
        </div>

        {/* Message history */}
        <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
          {cupidHistory.map((msg, i) => {
            const isUser = msg.from === 'user'
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`mb-3 flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
              >
                {!isUser && <CupidAvatar size={24} pulse={false} />}
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    background: isUser
                      ? '#0D9488'
                      : 'rgba(0,0,0,0.04)',
                    border: isUser ? 'none' : '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  <p className={`${isUser ? 'text-white' : 'text-gray-900'} text-sm leading-relaxed`}>{msg.text}</p>
                  <p className="text-brand-textSub mt-1" style={{ fontSize: 10 }}>{msg.time}</p>
                </div>
              </motion.div>
            )
          })}
          <div ref={bottomRef} />
        </div>

        {/* Bottom note */}
        <div
          className="px-5 py-4 shrink-0"
          style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}
        >
          <p className="text-brand-textSub text-xs text-center leading-relaxed">
            Cupid works silently in the background. Every suggestion is based on your profile, your match's signals, and what actually works.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
