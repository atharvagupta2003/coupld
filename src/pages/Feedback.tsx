import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const OPTIONS = [
  { id: 'great', label: 'It went really well' },
  { id: 'okay', label: 'Okay, nothing special' },
  { id: 'notfit', label: 'Not a great fit' },
  { id: 'again', label: 'I want to see them again' },
  { id: 'exclusive', label: 'We decided to be exclusive', gold: true },
]

export default function Feedback() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)
  const [note, setNote] = useState('')

  const handleSubmit = () => {
    if (selected === 'exclusive') navigate('/exclusive')
    else navigate('/home')
  }

  return (
    <motion.div
      className="flex flex-col w-full min-h-screen bg-[#1C0B3A] px-5 pt-14 pb-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-white font-bold text-2xl">How did it go?</h1>
      <p className="text-brand-textSub text-sm mt-1 mb-6">With Isabelle — Saturday evening</p>

      <div className="flex flex-col gap-2 mb-5">
        {OPTIONS.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className="text-left p-4 rounded-2xl transition-all"
            style={{
              background: selected === opt.id ? 'rgba(212,168,67,0.06)' : 'rgba(255,255,255,0.04)',
              border: selected === opt.id
                ? '1px solid #D4A843'
                : opt.gold
                ? '1px solid rgba(212,168,67,0.4)'
                : '1px solid rgba(184,160,212,0.15)',
            }}
            animate={{ scale: selected === opt.id ? 1 : 0.98 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <span className="text-white font-medium text-sm">{opt.label}</span>
          </motion.button>
        ))}
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={4}
        placeholder="Tell your coach what happened. This helps with future matches."
        className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none resize-none placeholder:text-brand-textSub/50 mb-5"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(184,160,212,0.15)' }}
      />

      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-1">
        {[
          { label: 'Plan another date', color: 'rgba(184,160,212,0.12)', border: 'rgba(184,160,212,0.3)' },
          { label: 'Try someone new', color: 'rgba(255,255,255,0.04)', border: 'rgba(184,160,212,0.15)' },
          { label: 'We are exclusive', color: 'rgba(212,168,67,0.08)', border: '#D4A843', tag: 'STOP BILLING' },
        ].map((card) => (
          <div
            key={card.label}
            className="shrink-0 rounded-2xl p-4 w-44"
            style={{ background: card.color, border: `1px solid ${card.border}` }}
          >
            {card.tag && (
              <p className="text-brand-lavender font-semibold uppercase tracking-widest text-xs mb-1">
                {card.tag}
              </p>
            )}
            <p className="text-white font-semibold text-sm">{card.label}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-4 rounded-xl font-bold text-[#1C0B3A]"
        style={{ background: '#D4A843' }}
      >
        Submit
      </button>
    </motion.div>
  )
}
