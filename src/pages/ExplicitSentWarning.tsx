import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ShieldAlert, AlertTriangle, X, CheckCircle, Send } from 'lucide-react'

const MOCK_MESSAGES = [
  { from: 'them', text: "That hike photo you sent looked amazing. Where was that?", time: '2:14 PM' },
  { from: 'user', text: "Box Hill! The views on the way down are incredible.", time: '2:18 PM' },
  { from: 'them', text: "We should go sometime. I've been meaning to get back out there.", time: '2:20 PM' },
]

export default function ExplicitSentWarning() {
  const navigate = useNavigate()
  const [stage, setStage] = useState<'chat' | 'blocked' | 'acknowledged'>('chat')
  const [showModal, setShowModal] = useState(false)

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
        style={{ background: 'rgba(28,11,58,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(184,160,212,0.1)' }}
      >
        <button onClick={() => navigate(-1)} className="pl-8">
          <ChevronLeft size={22} className="text-white" />
        </button>
        <img
          src="https://images.pexels.com/photos/7437171/pexels-photo-7437171.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200"
          alt="Isabelle"
          className="w-9 h-9 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Isabelle</p>
          <p className="text-brand-textSub" style={{ fontSize: 11 }}>Active recently</p>
        </div>
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
              transition={{ delay: i * 0.08 }}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
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
                <p className="text-white text-sm leading-relaxed">{msg.text}</p>
                <p className="text-brand-textSub mt-1" style={{ fontSize: 10 }}>{msg.time}</p>
              </div>
            </motion.div>
          )
        })}

        {/* Blocked message attempt */}
        <AnimatePresence>
          {(stage === 'blocked' || stage === 'acknowledged') && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end"
            >
              <div
                className="relative"
                style={{
                  maxWidth: '78%',
                  padding: '10px 14px',
                  borderRadius: '16px 4px 16px 16px',
                  background: 'rgba(194,84,122,0.08)',
                  border: '1px solid rgba(194,84,122,0.3)',
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(194,84,122,0.15)', border: '1px dashed rgba(194,84,122,0.4)' }}
                  >
                    <AlertTriangle size={20} style={{ color: '#C2547A' }} />
                  </div>
                </div>
                <p className="text-xs font-semibold" style={{ color: '#C2547A' }}>Content blocked</p>
                <p className="text-brand-textSub mt-0.5" style={{ fontSize: 10 }}>2:33 PM</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Warning modal overlay */}
      <AnimatePresence>
        {stage === 'blocked' && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed inset-x-4 z-40 rounded-3xl overflow-y-auto"
              style={{ top: '5%', maxHeight: '88vh', maxWidth: 358, margin: '0 auto' }}
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div style={{ background: '#1E0D3C', border: '1px solid rgba(194,84,122,0.35)' }}>
                {/* Red header */}
                <div
                  className="px-5 pt-6 pb-4 flex flex-col items-center text-center"
                  style={{ background: 'linear-gradient(180deg, rgba(194,84,122,0.15) 0%, transparent 100%)' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10, delay: 0.1 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(194,84,122,0.15)', border: '1px solid rgba(194,84,122,0.4)' }}
                  >
                    <ShieldAlert size={32} style={{ color: '#C2547A' }} />
                  </motion.div>
                  <p className="text-white font-bold text-xl mb-2">Content Policy Warning</p>
                  <p className="text-brand-textSub text-sm leading-relaxed">
                    This is your <span className="text-white font-semibold">first warning</span>. Coupld detected content that may violate our Safe Space policy.
                  </p>
                </div>

                <div className="px-5 pb-2">
                  {/* Warning detail */}
                  <div
                    className="rounded-2xl p-4 mb-4"
                    style={{ background: 'rgba(194,84,122,0.07)', border: '1px solid rgba(194,84,122,0.2)' }}
                  >
                    <p className="text-white font-semibold text-sm mb-1">What happened</p>
                    <p className="text-brand-textSub text-xs leading-relaxed">
                      The image you attempted to send was flagged as potentially explicit. The message was blocked before delivery. Isabelle did not receive it.
                    </p>
                  </div>

                  {/* Escalation warning */}
                  <div className="flex flex-col gap-2 mb-5">
                    {[
                      { num: '1st', label: 'Warning (current)', active: true },
                      { num: '2nd', label: 'Temporary messaging restriction', active: false },
                      { num: '3rd', label: 'Account review + potential ban', active: false },
                    ].map(step => (
                      <div
                        key={step.num}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl"
                        style={{
                          background: step.active ? 'rgba(194,84,122,0.1)' : 'rgba(255,255,255,0.03)',
                          border: step.active ? '1px solid rgba(194,84,122,0.35)' : '1px solid transparent',
                        }}
                      >
                        <span
                          className="font-bold text-xs w-8 text-center shrink-0"
                          style={{ color: step.active ? '#C2547A' : '#9B8FB0' }}
                        >
                          {step.num}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: step.active ? 'white' : '#9B8FB0' }}
                        >
                          {step.label}
                        </span>
                        {step.active && <AlertTriangle size={12} style={{ color: '#C2547A' }} className="ml-auto shrink-0" />}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setStage('acknowledged')}
                    className="w-full py-3.5 rounded-xl font-bold text-sm mb-3"
                    style={{ background: 'rgba(184,160,212,0.12)', border: '1px solid rgba(184,160,212,0.3)', color: 'white' }}
                  >
                    I understand — dismiss
                  </button>
                  <button
                    className="w-full py-2 text-brand-textSub text-xs mb-4"
                  >
                    Appeal this decision
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Acknowledged state notice */}
      <AnimatePresence>
        {stage === 'acknowledged' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 mb-2 px-4 py-2.5 rounded-xl flex items-center gap-2 shrink-0"
            style={{ background: 'rgba(194,84,122,0.07)', border: '1px solid rgba(194,84,122,0.25)' }}
          >
            <ShieldAlert size={13} style={{ color: '#C2547A' }} />
            <p className="text-xs" style={{ color: '#C2547A' }}>1 warning on your account · Message was not delivered</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0"
        style={{ background: 'rgba(28,11,58,0.97)', borderTop: '1px solid rgba(184,160,212,0.1)' }}
      >
        {/* Simulated attachment button that triggers the warning */}
        <button
          onClick={() => stage === 'chat' && setShowModal(true)}
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(184,160,212,0.18)' }}
        >
          <span className="text-brand-textSub text-lg">+</span>
        </button>
        <div
          className="flex-1 px-4 py-2.5 rounded-xl text-brand-textSub/50 text-sm"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,160,212,0.12)' }}
        >
          Message Isabelle…
        </div>
        <Send size={20} style={{ color: '#9B8FB0' }} className="shrink-0" />
      </div>

      {/* Trigger modal — simulate sending explicit image */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div className="fixed inset-0 z-20 bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} />
            <motion.div
              className="fixed bottom-0 left-0 right-0 mx-auto max-w-[390px] z-30 rounded-t-3xl p-5"
              style={{ background: '#1C0B3A', border: '1px solid rgba(184,160,212,0.15)' }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26 }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-semibold text-sm">Send photo</p>
                <button onClick={() => setShowModal(false)}><X size={18} className="text-brand-textSub" /></button>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div
                    key={n}
                    onClick={() => { if (n === 3) { setShowModal(false); setStage('blocked') } }}
                    className="rounded-xl overflow-hidden cursor-pointer transition-all active:scale-95"
                    style={{ height: 80, background: n === 3 ? 'rgba(194,84,122,0.2)' : 'rgba(255,255,255,0.05)', border: n === 3 ? '1.5px dashed rgba(194,84,122,0.5)' : '1px solid rgba(184,160,212,0.12)' }}
                  >
                    {n === 3 && (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                        <AlertTriangle size={18} style={{ color: '#C2547A' }} />
                        <span style={{ fontSize: 9, color: '#C2547A', fontWeight: 600 }}>EXPLICIT</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-brand-textSub text-xs text-center">Tap the flagged photo to see the safety workflow</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
