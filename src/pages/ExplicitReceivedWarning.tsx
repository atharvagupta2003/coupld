import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ShieldAlert, Eye, EyeOff, Flag, X, AlertTriangle } from 'lucide-react'

const MOCK_MESSAGES = [
  { from: 'them', text: "Hey, I think we really connected last night.", time: '11:42 AM' },
  { from: 'user', text: "Agreed — it was a great evening.", time: '11:50 AM' },
  { from: 'them', text: "I wanted to send you something…", time: '11:53 AM' },
]

export default function ExplicitReceivedWarning() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<'hidden' | 'confirm' | 'revealed' | 'reported'>('hidden')

  return (
    <motion.div
      className="flex flex-col h-screen w-full bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 shrink-0"
        style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}
      >
        <button onClick={() => navigate(-1)} className="pl-8">
          <ChevronLeft size={22} className="text-gray-900" />
        </button>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.1)' }}
        >
          <span className="text-gray-900 font-bold text-sm">M</span>
        </div>
        <div className="flex-1">
          <p className="text-gray-900 font-semibold text-sm">Marcus</p>
          <p className="text-brand-textSub" style={{ fontSize: 11 }}>Matched 5 days ago</p>
        </div>
        {stage !== 'reported' && (
          <button
            onClick={() => setStage('reported')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(194,84,122,0.1)', border: '1px solid rgba(194,84,122,0.3)', color: '#C2547A' }}
          >
            <Flag size={11} />
            Report
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5">
        {MOCK_MESSAGES.map((msg, i) => {
          const isUser = msg.from === 'user'
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isUser ? 16 : -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                style={{
                  maxWidth: '78%',
                  padding: '10px 14px',
                  borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                  background: isUser ? '#0D9488' : 'rgba(0,0,0,0.04)',
                  border: isUser ? 'none' : '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <p className={`${isUser ? 'text-white' : 'text-gray-900'} text-sm leading-relaxed`}>{msg.text}</p>
                <p className="text-brand-textSub mt-1" style={{ fontSize: 10 }}>{msg.time}</p>
              </div>
            </motion.div>
          )
        })}

        {/* The hidden explicit message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-2"
        >
          {/* Warning banner */}
          <div
            className="self-start rounded-2xl overflow-hidden"
            style={{ maxWidth: '88%', border: '1px solid rgba(194,84,122,0.35)' }}
          >
            <div
              className="px-4 py-3"
              style={{ background: 'rgba(194,84,122,0.1)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <ShieldAlert size={15} style={{ color: '#C2547A' }} />
                <p className="font-semibold text-sm" style={{ color: '#C2547A' }}>Content hidden</p>
              </div>
              <p className="text-brand-textSub text-xs leading-relaxed">
                Marcus sent a photo that may contain explicit content. Coupld has hidden it automatically to protect you.
              </p>
            </div>

            {/* Blurred content preview */}
            <div
              className="relative flex items-center justify-center"
              style={{ height: 140, background: 'rgba(194,84,122,0.05)' }}
            >
              {/* Blurred placeholder */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(194,84,122,0.2) 0%, rgba(240,240,250,0.9) 100%)',
                  filter: stage === 'revealed' ? 'none' : 'blur(0px)',
                }}
              />
              {stage !== 'revealed' && (
                <div className="relative flex flex-col items-center gap-2">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(194,84,122,0.15)', border: '1.5px dashed rgba(194,84,122,0.5)' }}
                  >
                    <EyeOff size={24} style={{ color: '#C2547A' }} />
                  </div>
                  <p className="text-xs font-semibold" style={{ color: '#C2547A' }}>Photo hidden · 11:55 AM</p>
                </div>
              )}
              {stage === 'revealed' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {/* In reality this would be the actual image - we show a violation notice */}
                  <div
                    className="mx-4 rounded-xl p-4 text-center"
                    style={{ background: 'rgba(194,84,122,0.12)', border: '1px solid rgba(194,84,122,0.3)' }}
                  >
                    <ShieldAlert size={28} style={{ color: '#C2547A' }} className="mx-auto mb-2" />
                    <p className="text-gray-900 font-semibold text-sm mb-1">Policy Violation</p>
                    <p className="text-gray-500 text-xs">This content violates Coupld's community standards. Marcus has received a warning.</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Action buttons */}
            {stage === 'hidden' && (
              <div
                className="flex gap-2 px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.9)' }}
              >
                <button
                  onClick={() => setStage('reported')}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
                  style={{ background: 'rgba(194,84,122,0.1)', border: '1px solid rgba(194,84,122,0.3)', color: '#C2547A' }}
                >
                  Report & block
                </button>
                <button
                  onClick={() => setStage('confirm')}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
                  style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.1)', color: '#6B7280' }}
                >
                  View anyway
                </button>
              </div>
            )}

            {stage === 'revealed' && (
              <div
                className="flex gap-2 px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.9)' }}
              >
                <button
                  onClick={() => setStage('reported')}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold"
                  style={{ background: 'rgba(194,84,122,0.12)', border: '1px solid rgba(194,84,122,0.3)', color: '#C2547A' }}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Flag size={12} />
                    Report Marcus
                  </span>
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Reported state */}
        <AnimatePresence>
          {stage === 'reported' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="self-center px-4 py-2 rounded-full text-xs flex items-center gap-1.5"
              style={{ background: 'rgba(120,196,160,0.1)', border: '1px solid rgba(120,196,160,0.3)', color: '#78C4A0' }}
            >
              ✓ Reported — Coupld team will review within 24 hours
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cupid note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="rounded-2xl p-4 mt-1"
          style={{ background: 'rgba(13,148,136,0.05)', border: '1px solid rgba(13,148,136,0.15)' }}
        >
          <p className="text-brand-lavender font-semibold uppercase tracking-widest mb-1.5" style={{ fontSize: 9 }}>From Cupid</p>
          <p className="text-gray-900 text-xs leading-relaxed">
            You should never have to see something you don't want to. Coupld hides flagged content automatically. If you're uncomfortable with this match, you can remove them from your list at any time.
          </p>
        </motion.div>
      </div>

      {/* Confirm modal */}
      <AnimatePresence>
        {stage === 'confirm' && (
          <>
            <motion.div className="fixed inset-0 z-30 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setStage('hidden')} />
            <motion.div
              className="fixed inset-x-4 z-40 rounded-3xl overflow-hidden"
              style={{ top: '50%', transform: 'translateY(-50%)', maxWidth: 358, margin: '0 auto' }}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="p-6" style={{ background: '#FFFFFF', border: '1px solid rgba(194,84,122,0.3)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={18} style={{ color: '#D97706' }} />
                    <p className="text-gray-900 font-bold text-base">Are you sure?</p>
                  </div>
                  <button onClick={() => setStage('hidden')}><X size={18} className="text-gray-400" /></button>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  This content was hidden for your protection. Viewing it doesn't affect your account, but we encourage reporting behaviour like this.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStage('hidden')}
                    className="flex-1 py-3 rounded-xl font-semibold text-sm"
                    style={{ background: 'rgba(0,0,0,0.04)', color: '#6B7280', border: '1px solid rgba(0,0,0,0.08)' }}
                  >
                    Go back
                  </button>
                  <button
                    onClick={() => setStage('revealed')}
                    className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5"
                    style={{ background: 'rgba(194,84,122,0.12)', border: '1px solid rgba(194,84,122,0.35)', color: '#C2547A' }}
                  >
                    <Eye size={14} />
                    View anyway
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0"
        style={{ background: 'rgba(255,255,255,0.97)', borderTop: '1px solid rgba(0,0,0,0.08)' }}
      >
        <div
          className="flex-1 px-4 py-2.5 rounded-xl text-gray-400 text-sm"
          style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          Message Marcus…
        </div>
      </div>
    </motion.div>
  )
}
